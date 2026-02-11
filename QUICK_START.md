# HRMS Lite - Quick Start Commands

## 🎯 What You Need to Do
Follow these steps in order to set up PostgreSQL, test locally, and deploy your application.

## Step 1: Set Up PostgreSQL Database

### Option A: Using pgAdmin (Easier)
- Open pgAdmin 4
- Create user `postgres` with password `12345678`
- Create database `hrms_db` with owner `postgres`

### Option B: Using Command Line
```
psql -U postgres
```
Then run:
```
CREATE USER postgres WITH PASSWORD '12345678';
ALTER USER postgres WITH SUPERUSER;
CREATE DATABASE hrms_db OWNER postgres;
\q
```

📖 Detailed guide: POSTGRES_SETUP.md

## Step 2: Start Backend Locally
```
cd C:\Users\Anam Zahid\Desktop\hrms-lite\backend
python manage.py runserver
```
✅ Backend runs on: http://localhost:8000

## Step 3: Start Frontend Locally
Open new terminal:
```
cd C:\Users\Anam Zahid\Desktop\hrms-lite\frontend
npm start
```
✅ Frontend runs on: http://localhost:3000

## Step 4: Test Application Locally
- Visit http://localhost:3000
- Add employees
- Mark attendance
- View dashboard

## Step 5: Deploy to Cloud
📖 Follow deployment guide: DEPLOYMENT_GUIDE.md

### Summary:
- Create Render account → Deploy PostgreSQL database
- Push code to GitHub
- Deploy backend on Render
- Deploy frontend on Vercel
- Test live application

## Step 6: Submit Assignment
📖 Follow submission guide: SUBMISSION_GUIDE.md

You'll need:
- ✅ Live frontend URL
- ✅ Live backend URL
- ✅ GitHub repository URL
- ✅ All features tested

## 📚 All Documentation
| Guide | Purpose |
|-------|---------|
| README.md | Project overview |
| POSTGRES_SETUP.md | PostgreSQL installation |
| SETUP_COMMANDS.md | Local setup commands |
| DEPLOYMENT_GUIDE.md | Cloud deployment |
| SUBMISSION_GUIDE.md | Assignment submission |
| QUICK_START.md | This file |

🚀 Ready to build and deploy your HRMS Lite! 🚀
