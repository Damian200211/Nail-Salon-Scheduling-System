from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Service, Technician, Customer, Appointment, Category

admin.site.register(Category)
admin.site.register(Service)
admin.site.register(Technician)
admin.site.register(Customer)
admin.site.register(Appointment)