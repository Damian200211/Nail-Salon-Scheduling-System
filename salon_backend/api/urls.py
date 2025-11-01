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
    path('', include(router.urls)),
]
