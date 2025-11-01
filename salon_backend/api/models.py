from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    # This will help order the services
    list_order = models.IntegerField(default=0) 
    class Meta:
        ordering = ['list_order'] # Default sort by our new field
    def __str__(self): return self.name
 
class Service(models.Model):
    # Add null=True, blank=True
    category = models.ForeignKey(Category, related_name='services', on_delete=models.CASCADE, null=True, blank=True)
    name = models.CharField(max_length=100)
    duration_minutes = models.IntegerField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    def __str__(self): return self.name

class Technician(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    def __str__(self): return self.name

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=20)
    def __str__(self): return self.user.username

class Appointment(models.Model):
    cutomer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=100, default='Confirmed')

    def __str__(self):
        return f"{self.service.name} with {self.technician.name}"


 