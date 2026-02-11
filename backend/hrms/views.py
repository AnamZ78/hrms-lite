from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError, NotFound
from django.core.exceptions import ObjectDoesNotExist
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Employee, Attendance
from .serializers import EmployeeSerializer, AttendanceSerializer
from rest_framework.permissions import AllowAny

@method_decorator(csrf_exempt, name='dispatch')
class EmployeeViewSet(viewsets.ModelViewSet):
    queryset = Employee.objects.all()
    permission_classes = [AllowAny]
    serializer_class = EmployeeSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError as e:
            return Response(e.detail, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred while creating the employee.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except ValidationError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'detail': 'Employee not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred while updating the employee.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ObjectDoesNotExist:
            return Response({'detail': 'Employee not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred while deleting the employee.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @action(detail=True, methods=['get'])
    def attendances(self, request, pk=None):
        try:
            employee = self.get_object()
            attendances = employee.attendances.all()
            serializer = AttendanceSerializer(attendances, many=True)
            return Response(serializer.data)
        except ObjectDoesNotExist:
            return Response({'detail': 'Employee not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred while fetching attendances.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@method_decorator(csrf_exempt, name='dispatch')
class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    permission_classes = [AllowAny]
    serializer_class = AttendanceSerializer

    def create(self, request, *args, **kwargs):
        try:
            return super().create(request, *args, **kwargs)
        except ValidationError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred while marking attendance.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def update(self, request, *args, **kwargs):
        try:
            return super().update(request, *args, **kwargs)
        except ValidationError as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except ObjectDoesNotExist:
            return Response({'detail': 'Attendance record not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred while updating attendance.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def destroy(self, request, *args, **kwargs):
        try:
            return super().destroy(request, *args, **kwargs)
        except ObjectDoesNotExist:
            return Response({'detail': 'Attendance record not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'detail': 'An unexpected error occurred while deleting attendance.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def get_queryset(self):
        queryset = Attendance.objects.all()
        employee_id = self.request.query_params.get('employee_id', None)
        if employee_id is not None:
            queryset = queryset.filter(employee__employee_id=employee_id)
        date_from = self.request.query_params.get('date_from', None)
        if date_from is not None:
            queryset = queryset.filter(date__gte=date_from)
        date_to = self.request.query_params.get('date_to', None)
        if date_to is not None:
            queryset = queryset.filter(date__lte=date_to)
        return queryset
