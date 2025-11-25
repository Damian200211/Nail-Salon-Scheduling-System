from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'technicians', views.TechnicianViewSet)
router.register(r'appointments', views.AppointmentViewSet)
router.register(r'timeblocks', views.TimeBlockViewSet, basename='timeblock')

urlpatterns = [
    path('availability/', views.AvailabilityCheckView.as_view(), name='availability-check'),
    path('', include(router.urls)),
]
