import os
import django
from datetime import date

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from hrms.models import Employee, Attendance

# Create employees
emp1 = Employee.objects.create(employee_id='EMP001', full_name='John Doe', email='john@example.com', department='IT')
emp2 = Employee.objects.create(employee_id='EMP002', full_name='Jane Smith', email='jane@example.com', department='HR')

# Create attendances
Attendance.objects.create(employee=emp1, date=date(2023, 10, 1), status='Present')
Attendance.objects.create(employee=emp1, date=date(2023, 10, 2), status='Absent')
Attendance.objects.create(employee=emp1, date=date(2023, 10, 3), status='Present')
Attendance.objects.create(employee=emp2, date=date(2023, 10, 1), status='Present')
Attendance.objects.create(employee=emp2, date=date(2023, 10, 2), status='Present')

print("Data populated successfully")
