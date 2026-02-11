# HRMS Lite - Human Resource Management System

A modern, full-stack web application for managing employee records and tracking daily attendance. Built with React, Django, and PostgreSQL.

## 🌟 Features

### Employee Management
- ✅ Add new employees with validation
- ✅ View all employees in a tabular form
- ✅ Delete employee records
- ✅ Duplicate employee ID and email prevention

### Attendance Management
- ✅ Mark daily attendance (Present/Absent)
- ✅ View attendance records in table format
- ✅ Filter attendance by date
- ✅ Prevent duplicate attendance for the same date
- ✅ Automatic date validation

### Dashboard
- ✅ Real-time statistics overview
- ✅ Total employees count
- ✅ Today's attendance summary
- ✅ Present counts

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Material-UI** - Component library
- **CSS3** - Custom styling

### Backend
- **Django 5.2** - Python web framework
- **Django REST Framework** - API framework
- **PostgreSQL** - Relational database
- **Gunicorn** - WSGI server for production

## 📋 Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **PostgreSQL** 12+

## 🚀 Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd hrms-lite
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (copy from .env.example if available)
# Update DATABASE_URL with your PostgreSQL credentials
# Example: DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite

# Run migrations
python manage.py migrate

# Run the server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/api`
The backend live API will be available at `https://hrms-lite-1a2b.onrender.com/api`


### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm start
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
hrms-lite/
├── backend/
│   ├── config/
│   │   ├── settings.py          # Django settings
│   │   ├── urls.py              # Main URL configuration
│   │   ├── wsgi.py              # WSGI configuration
│   │   └── asgi.py              # ASGI configuration
│   ├── hrms/
│   │   ├── models.py            # Database models
│   │   ├── views.py             # API views
│   │   ├── serializers.py       # DRF serializers
│   │   ├── admin.py             # Django admin
│   │   └── migrations/          # Database migrations
│   ├── manage.py
│   ├── requirements.txt
│   └── populate.py              # Data population script
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddEmployee.js
│   │   │   ├── EmployeeList.js
│   │   │   ├── AttendanceForm.js
│   │   │   ├── AttendanceView.js
│   │   │   └── Dashboard.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── .env                         # Environment variables
├── .gitignore                   # Git ignore rules
└── README.md
```

## 🔌 API Endpoints

### Employees
- `GET /api/employees/` - Get all employees
- `POST /api/employees/` - Create new employee
- `DELETE /api/employees/{id}/` - Delete employee

### Attendance
- `GET /api/attendance/` - Get all attendance records
- `POST /api/attendance/` - Mark attendance
- `GET /api/attendance/{employee_id}/` - Get employee attendance

## 🎨 UI Features

- 🌙 Material-UI theme
- ✨ Responsive design
- 📱 Mobile-friendly
- 🎯 Intuitive navigation
- 💫 Loading states and error handling
- 🔍 Search and filter functionality

## 🚢 Deployment

### Backend Deployment (Render/Heroku)

1. Create a PostgreSQL database on your hosting platform
2. Set environment variables:
   - `DATABASE_URL` - Your PostgreSQL connection string
   - `SECRET_KEY` - Django secret key
   - `DEBUG` - False for production
   - `ALLOWED_HOSTS` - Your domain
3. Deploy the `backend` directory
4. Set start command: `gunicorn config.wsgi`

### Frontend Deployment (Vercel/Netlify)

1. Set environment variable:
   - `REACT_APP_API_URL` - Your deployed backend URL
2. Deploy the `frontend` directory
3. Build command: `npm run build`
4. Output directory: `build`

## 🔒 Validation & Error Handling

### Backend Validations
- ✅ Email format validation
- ✅ Duplicate employee ID check
- ✅ Duplicate email check
- ✅ Employee existence check for attendance
- ✅ Duplicate attendance prevention
- ✅ Date range validation

### Frontend Validations
- ✅ Required field validation
- ✅ Email format validation
- ✅ Date picker with max date (today)
- ✅ Form state management
- ✅ Error message display

## 📝 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required)
- Attendance can only be marked for dates up to today
- One attendance record per employee per day
- Employee deletion cascades to attendance records

### Limitations
- No user authentication/authorization
- No attendance editing (only create and view)
- No employee editing (only add and delete)
- No payroll or leave management
- No file uploads or document management
- No email notifications

## 🧪 Testing the Application

### Test Employee Creation
1. Navigate to Employees page
2. Fill in the form with:
   - Employee ID: EMP001
   - Name: John Doe
   - Email: john@example.com
   - Department: Engineering
3. Click "Add Employee"
4. Verify employee appears in the list

### Test Attendance Marking
1. Navigate to Attendance page
2. Select an employee from dropdown
3. Select today's date
4. Choose Present or Absent
5. Click "Mark Attendance"
6. Verify attendance appears in records

### Test Validations
1. Try adding duplicate employee ID → Should show error
2. Try marking attendance twice for same date → Should show error
3. Try invalid email format → Should show validation error

## 👨‍💻 Development

### Commands Summary

**Backend:**
```bash
python manage.py runserver          # Development server
gunicorn config.wsgi                # Production server
python manage.py makemigrations     # Create migrations
python manage.py migrate            # Apply migrations
```

**Frontend:**
```bash
npm start      # Development server
npm run build  # Production build
```

## 📄 License

This project is created as a coding assignment and is free to use.

## 🤝 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ using React + Django + PostgreSQL**
