from django.db import models
from django.contrib.auth.models import User
import datetime

# Category for services
class Category(models.Model):
    name = models.CharField(max_length=100)
    list_order = models.IntegerField(default=0) # For manual sorting

    class Meta:
        ordering = ['list_order'] # Default sort
        verbose_name_plural = "Categories" # Fixes "Categorys" in admin

    def __str__(self):
        return self.name

# Individual services
class Service(models.Model):
    category = models.ForeignKey(Category, related_name='services', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    
    def __str__(self): 
        return self.name

# Technician (employee) model linked to a login
class Technician(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    def __str__(self): return self.name

# Business hours for each technician
class TechnicianAvailability(models.Model):
    DAY_CHOICES = [
        (0, 'Monday'),
        (1, 'Tuesday'),
        (2, 'Wednesday'),
        (3, 'Thursday'),
        (4, 'Friday'),
        (5, 'Saturday'),
        (6, 'Sunday'),
    ]
    
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    day_of_week = models.IntegerField(choices=DAY_CHOICES)
    start_time = models.TimeField()
    end_time = models.TimeField()
    
    class Meta:
        unique_together = ('technician', 'day_of_week')
        verbose_name_plural = "Technician Availabilities"

    def __str__(self):
        return f"{self.technician.name}'s schedule for {self.get_day_of_week_display()}"

# Appointment model (100% guest checkout)
class Appointment(models.Model):
    # Guest customer info
    # This is the temporary fix
    customer_first_name = models.CharField(max_length=100, null=True, blank=True)
    customer_last_name = models.CharField(max_length=100, null=True, blank=True)
    customer_email = models.EmailField(null=True, blank=True)
    
    # Internal info
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    services = models.ManyToManyField(Service) # Can book multiple services
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True) # Calculated after creation
    status = models.CharField(max_length=20, default='Confirmed')

    def __str__(self):
        return f"Appt for {self.customer_first_name} {self.customer_last_name}"




 