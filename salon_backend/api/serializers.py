from rest_framework import serializers
from .models import Service, Technician, Appointment, Category

class CategorySerializer(serializers.ModelSerializer):
    services = serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'name', 'list_order', 'services']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'name', 'duration_minutes', 'price', 'category']

class TechnicianSerializer(serializers.ModelSerializer):
    class Meta:
        model = Technician
        fields = ['id', 'name']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = [
            'id', 'technician', 'services', 'start_time', 
            'customer_first_name', 'customer_last_name', 'customer_email'
        ]