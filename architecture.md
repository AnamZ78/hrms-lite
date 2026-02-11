# HRMS Backend - Django MVC Architecture

## Overview
The HRMS backend is built using Django and Django REST Framework (DRF), following the Model-View-Template (MVT) pattern adapted for REST APIs. It leverages DRF's ViewSets, Serializers, and Routers for clean API development.

## Architecture Layers

### 1. Models (Data Layer)
**Location:** hrms/models.py

Defines database entities using Django ORM:

- **Employee** - Employee information (employee_id, full_name, email, department)
- **Attendance** - Attendance records (employee, date, status)

**Responsibilities:**
- Database schema definition
- Entity relationships (ForeignKey for Attendance to Employee)
- Field constraints (unique fields, choices)
- Model methods (__str__ for string representation)

### 2. Serializers (Data Validation & Transformation)
**Location:** hrms/serializers.py

Handles data serialization and validation using DRF Serializers:

- **EmployeeSerializer** - Serializes Employee model, validates unique employee_id and email
- **AttendanceSerializer** - Serializes Attendance model, validates no duplicate attendance per employee per date, includes employee_name read-only field

**Responsibilities:**
- Input validation
- Data transformation between JSON and model instances
- Custom validation logic

### 3. Views (Business Logic & HTTP Layer)
**Location:** hrms/views.py

Contains DRF ViewSets that handle HTTP requests and business logic:

- **EmployeeViewSet** - Handles CRUD operations for employees
- **AttendanceViewSet** - Handles CRUD operations for attendance records

**Responsibilities:**
- HTTP request/response handling
- Business logic (error handling, custom actions)
- Query filtering (e.g., by employee_id, date ranges)
- Exception handling with appropriate HTTP status codes

### 4. URLs (Routing)
**Location:** config/urls.py

Defines URL patterns and routes requests to ViewSets using DRF Routers:

- Registers EmployeeViewSet at `/api/employees/`
- Registers AttendanceViewSet at `/api/attendances/`
- Includes admin URLs and API routes

**Responsibilities:**
- URL routing
- Router configuration for automatic URL generation

### 5. Settings (Configuration)
**Location:** config/settings.py

Django configuration including:

- Database settings (PostgreSQL with fallback to SQLite)
- Installed apps (DRF, CORS headers, hrms app)
- Middleware (CORS, authentication, sessions)
- CORS settings for frontend integration
- Security settings (DEBUG, ALLOWED_HOSTS)

## Request Flow
```
HTTP Request
    ↓
URL Router (config/urls.py)
    ↓
ViewSet (hrms/views.py)
    ↓
Serializer (hrms/serializers.py)
    ↓
Model (hrms/models.py)
    ↓
Database
```

### Example: Creating an Employee
1. POST request to `/api/employees/` with JSON data
2. URL router directs to EmployeeViewSet.create()
3. Serializer validates data (unique employee_id, email)
4. ViewSet calls serializer.save() to create Employee instance
5. Model saves to database
6. Response serialized back to JSON

## Benefits of This Architecture
✅ **Rapid Development**
- DRF provides powerful abstractions for REST APIs
- ViewSets reduce boilerplate code
- Automatic API documentation generation

✅ **Separation of Concerns**
- Models handle data
- Serializers handle validation/transformation
- Views handle HTTP logic
- URLs handle routing

✅ **Built-in Features**
- Authentication and permissions
- Pagination and filtering
- Error handling
- Admin interface

✅ **Testability**
- Each component can be tested independently
- DRF test client for API testing
- Model tests for data logic

✅ **Maintainability**
- Clear structure following Django conventions
- Easy to extend with new features
- Well-documented patterns

## File Structure
```
backend/
├── manage.py                 # Django management script
├── requirements.txt          # Python dependencies
├── config/                   # Django project settings
│   ├── __init__.py
│   ├── settings.py           # Main settings
│   ├── urls.py               # URL routing
│   ├── wsgi.py               # WSGI config
│   └── asgi.py               # ASGI config
└── hrms/                     # Main app
    ├── __init__.py
    ├── admin.py              # Admin interface
    ├── apps.py               # App config
    ├── models.py             # Database models
    ├── serializers.py        # DRF serializers
    ├── views.py              # DRF ViewSets
    ├── migrations/           # Database migrations
    └── tests.py              # Unit tests
```

## Design Patterns Used

### 1. Model-View-Controller (MVC) Pattern
- **Model**: Django models for data
- **View**: DRF ViewSets for HTTP handling
- **Controller**: URL routing and middleware

### 2. Repository Pattern (via Django ORM)
- Django's ORM provides repository-like interface
- QuerySets act as collections
- Manager methods for custom queries

### 3. Serializer Pattern
- DRF Serializers for data transformation
- Validation and serialization in one place

### 4. Factory Pattern (via ViewSets)
- ViewSets automatically create views for CRUD operations

## Best Practices Followed

### Django REST Framework Best Practices
- Use ViewSets for standard CRUD operations
- Custom serializers for complex validation
- Proper HTTP status codes
- Error handling with try/except

### Django Best Practices
- App-based structure
- Migration files for schema changes
- Environment-based settings
- CORS configuration for frontend

### Security
- CSRF protection (can be disabled for APIs)
- Input validation via serializers
- Proper error messages without data leakage

## Adding New Features

### Step 1: Update Models
Add new fields or models in hrms/models.py

### Step 2: Create/Update Serializers
Add serializer in hrms/serializers.py for new models

### Step 3: Update Views
Add or modify ViewSet methods in hrms/views.py

### Step 4: Update URLs
Register new routes in config/urls.py if needed

### Step 5: Run Migrations
Use `python manage.py makemigrations` and `migrate`

This Django-based architecture provides a solid foundation for scalable REST APIs! 🚀
