import datetime
from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Service, Technician, Appointment, Category, TechnicianAvailability, TimeBlock
from .serializers import ServiceSerializer, TechnicianSerializer, AppointmentSerializer, CategorySerializer, TimeBlockSerializer
from django.utils import timezone # <-- MAKE SURE THIS IS IMPORTED

# --- Public Views (for menu and tech list) ---

class CategoryViewSet(viewsets.ModelViewSet):
    """
    Public endpoint to get all categories and their services.
    Sorted by 'list_order' (set in models.py).
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    http_method_names = ['get'] # Read-only

class ServiceViewSet(viewsets.ModelViewSet):
    """
    Public endpoint to get all services.
    """
    queryset = Service.objects.all().order_by('category__list_order', 'name')
    serializer_class = ServiceSerializer
    permission_classes = [AllowAny]
    http_method_names = ['get'] # Read-only

class TechnicianViewSet(viewsets.ModelViewSet):
    """
    Public endpoint to get all technicians.
    """
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer
    permission_classes = [AllowAny]
    http_method_names = ['get'] # Read-only

# --- Availability Check View ---

class AvailabilityCheckView(APIView):
    """
    Public POST endpoint to check for available time slots.
    """
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        print("\n--- NEW AVAILABILITY CHECK ---") # DEBUG
        try:
            technician_id = request.data.get('technician_id')
            service_ids = request.data.get('service_ids')
            date_str = request.data.get('date')

            if not all([technician_id, service_ids, date_str]):
                print(f"Debug: Missing required fields.")
                return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)
            
            print(f"Debug: Checking for Tech ID: {technician_id} on Date: {date_str}")

            date_obj = datetime.datetime.strptime(date_str, '%Y-%m-%d').date()
            day_of_week = date_obj.weekday() # 0 = Monday

            # 1. Calculate total duration
            total_duration = 0
            for s_id in service_ids:
                total_duration += Service.objects.get(id=s_id).duration_minutes
            print(f"Debug: Total duration: {total_duration} minutes")

            
            # 2. Find technician's working hours
            availability = TechnicianAvailability.objects.get(
                technician_id=technician_id, 
                day_of_week=day_of_week
            )
            work_start_time = availability.start_time
            work_end_time = availability.end_time
            print(f"Debug: Tech works from {work_start_time} to {work_end_time}")

            # --- GATHER ALL BUSY SLOTS ---
            busy_slots = []
            
            # 3. Get busy slots from existing appointments
            # --- FIX: We must query the *local day* in the database's time zone (UTC) ---
            # Create timezone-aware start and end datetimes for the *local day*
            local_tz = timezone.get_current_timezone()
            day_start = timezone.make_aware(datetime.datetime.combine(date_obj, datetime.time.min), timezone=local_tz)
            day_end = timezone.make_aware(datetime.datetime.combine(date_obj, datetime.time.max), timezone=local_tz)

            existing_appts = Appointment.objects.filter(
                technician_id=technician_id,
                start_time__gte=day_start, # Greater than or equal to start of day
                start_time__lte=day_end    # Less than or equal to end of day
            )
            print(f"Debug: Found {existing_appts.count()} existing appts.")

            for appt in existing_appts:
                # Convert UTC time from DB to local time
                local_start_time = timezone.localtime(appt.start_time).time()
                local_end_time = timezone.localtime(appt.end_time).time()
                busy_slots.append({
                    'start': local_start_time,
                    'end': local_end_time
                })

            # 4. Get busy slots from TimeBlocks (sick days, etc.)
            time_blocks = TimeBlock.objects.filter(
                technician_id=technician_id,
                date=date_obj # date field is naive, so this is fine
            )
            print(f"Debug: Found {time_blocks.count()} time blocks.")

            for block in time_blocks:
                busy_slots.append({'start': block.start_time, 'end': block.end_time})
            
            print(f"Debug: Total busy slots: {busy_slots}")

            # 5. Generate potential time slots
            available_slots = []
            slot_interval = 30 # Check every 30 minutes
            current_slot_start_dt = timezone.make_aware(datetime.datetime.combine(date_obj, work_start_time))
            work_end_dt = timezone.make_aware(datetime.datetime.combine(date_obj, work_end_time))

            while current_slot_start_dt < work_end_dt:
                slot_start_time = current_slot_start_dt.time()
                
                potential_end_dt = current_slot_start_dt + datetime.timedelta(minutes=total_duration)
                potential_end_time = potential_end_dt.time()

                if potential_end_dt > work_end_dt:
                    print(f"Debug: Slot {slot_start_time} fails (goes past {work_end_dt.time()})")
                    break # Slot goes past end of workday

                is_available = True
                for busy in busy_slots:
                    # Check for overlap
                    if (slot_start_time < busy['end'] and potential_end_time > busy['start']):
                        is_available = False
                        print(f"Debug: Slot {slot_start_time} fails (conflicts with {busy['start']}-{busy['end']})")
                        break
                
                if is_available:
                    print(f"Debug: Slot {slot_start_time} is AVAILABLE.")
                    available_slots.append(slot_start_time.strftime('%H:%M'))

                current_slot_start_dt += datetime.timedelta(minutes=slot_interval)

            print("--- CHECK COMPLETE ---")
            return Response(available_slots, status=status.HTTP_200_OK)

        except TechnicianAvailability.DoesNotExist:
            print(f"Debug: Tech does not work on this day (weekday {day_of_week}).")
            print("--- CHECK COMPLETE ---")
            return Response([], status=status.HTTP_200_OK) # Tech doesn't work this day
        except Exception as e:
            print(f"Error in availability check: {e}")
            print("--- CHECK COMPLETE ---")
            return Response({"error": "Could not check availability"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# --- Technician Time Block ViewSet ---

class TimeBlockViewSet(viewsets.ModelViewSet):
    """
    This endpoint allows technicians to manage their own time off.
    """
    serializer_class = TimeBlockSerializer
    permission_classes = [IsAuthenticated] # Must be logged in

    def get_queryset(self):
        """
        Technicians can ONLY see their own time blocks.
        """
        user = self.request.user
        if hasattr(user, 'technician'):
            return TimeBlock.objects.filter(technician=user.technician)
        return TimeBlock.objects.none() # Return nothing for other users

    def perform_create(self, serializer):
        """
        When a new block is created, automatically assign it
        to the logged-in technician.
        """
        technician = self.request.user.technician
        serializer.save(technician=technician)


# --- Appointment Booking & Dashboard View ---
class AppointmentViewSet(viewsets.ModelViewSet):
    """
    Handles creating appointments (public) and
    listing appointments (private for technicians).
    """
    serializer_class = AppointmentSerializer
    queryset = Appointment.objects.all()

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated] # Secure all other methods
        return super().get_permissions()

    def get_queryset(self):
        """
        This is for the technician dashboard.
        It's secured by get_permissions().
        """
        user = self.request.user
        if hasattr(user, 'technician'):
            return Appointment.objects.filter(technician=user.technician).order_by('start_time')
        return Appointment.objects.none() # Admins, etc. see nothing

    def perform_create(self, serializer):
        """
        Runs when a new appointment is booked (by guest or admin).
        Calculates end_time and sends emails.
        """
        # 1. Save the appointment
        appointment = serializer.save()

        # 2. Calculate total duration and end_time
        total_duration = 0
        all_services_names = []
        for service in appointment.services.all():
            total_duration += service.duration_minutes
            all_services_names.append(service.name)
        
        appointment.end_time = appointment.start_time + datetime.timedelta(minutes=total_duration)
        appointment.save()

        # 3. Get data for emails
        technician = appointment.technician
        service_list_str = ", ".join(all_services_names)
        start_time_formatted = appointment.start_time.strftime('%A, %B %d at %I:%M %p')
        customer_email = serializer.validated_data.get('customer_email')
        customer_name = serializer.validated_data.get('customer_first_name')

        # 4. Send Notification to THE BUSINESS
        try:
            subject = f'New Booking: {service_list_str} w/ {technician.name}'
            body = (
                f"A new appointment has been booked:\n\n"
                f"Customer: {customer_name} {serializer.validated_data.get('customer_last_name')}\n"
                f"Email: {customer_email}\n"
                f"Technician: {technician.name}\n"
                f"Services: {service_list_str}\n"
                f"When: {start_time_formatted}\n"
            )
            send_mail(
                subject, body, settings.DEFAULT_FROM_EMAIL,
                [settings.BUSINESS_EMAIL], fail_silently=False,
            )
        except Exception as e:
            print(f"Error sending business email: {e}")
        
        # 5. Send Confirmation to the CUSTOMER
        try:
            send_mail(
                'Appointment Confirmed!',
                f"Hi {customer_name}, your appointment with {technician.name} for {service_list_str} "
                f"is confirmed for {start_time_formatted}.",
                settings.DEFAULT_FROM_EMAIL,
                [customer_email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"Error sending customer email: {e}")
