from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from hrms.views import EmployeeViewSet, AttendanceViewSet

router = DefaultRouter()
router.register(r'employees', EmployeeViewSet)
router.register(r'attendances', AttendanceViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
