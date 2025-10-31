from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Service, Technician, Appointment
from .serializers import ServiceSerializer, TechnicianSerializer, AppointmentSerializer
from django.core.mail import send_mail
from django.conf import settings

# Create your views here.


class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticated] # Only logged in users can see this

class TechnicianViewSet(viewsets.ModelViewSet):
    queryset = Technician.objects.all()
    serializer_class = TechnicianSerializer
    permission_classes = [IsAuthenticated]

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated] # PROTECT ENDPOINT

    def get_queryset(self):
        # logic that filters appointments. 
        # a technician only sees thier own appointments
        # a cutomer only seees their own 

        user = self.request.user

        if hasattr(user, 'technician'):
            # this is a technician
            return Appointment.objects.filter(technician=user.tech).order_by('start_time')
        
        if hasattr(user, 'customer'):
            # this is a cutomer
            return Appointment.objects.filter(customer=user.customer).order_by('start_time')
        
        return Appointment.objects.all() # so admin can see all appintments 
    
    def perform_create(self, serializer):
        # this logic runs after a new appoinment is saved 
        # because it handels the email notifications

        # saves the appoinment
        appointment = serializer.save()

        # gets data for the emails 
        technician = appointment.technician
        customer = appointment.customer

        try:
            # send email to technician 
            send_mail(
                'New Appointment!',
                f"Hi {technician.name}, you have a new booking for {appointment.service.name} "
                f"on {appointment.start_time.strftime('%A, %B %d at %I:%M %p')}.",
                settings.DEFAULT_FROM_EMAIL,
                [technician.user.email], # sends to the technician's user email
                fail_silently=False
            )

            # Send email to Customer
            send_mail(
                'Appointment Confirmed!',
                f"Hi {customer.user.username}, your appointment with {technician.name} is confirmed "
                f"for {appointment.start_time.strftime('%A, %B %d at %I:%M %p')}.",
                settings.DEFAULT_FROM_EMAIL,
                [customer.user.email], # Sends to the customer's user email
                fail_silently=False,
            )

        except Exception as e:
            # makes it not crash if email fails, just log it
            print(f"Error sending email: {e}")




