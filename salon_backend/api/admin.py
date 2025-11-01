from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Service, Technician, Appointment, Category, TechnicianAvailability

admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Technician)
admin.site.register(Appointment)
admin.site.register(TechnicianAvailability)