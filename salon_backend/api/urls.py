from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'services', views.ServiceViewSet)
router.register(r'technicians', views.TechnicianViewSet)
router.register(r'appointments', views.AppointmentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
