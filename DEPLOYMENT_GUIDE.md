# HRMS Lite - Deployment Guide

## 📋 Overview

This guide will help you deploy your HRMS Lite application to the cloud, making it accessible via live URLs for submission.

**Recommended Stack:**
- **Backend + Database**: Render (Free tier)
- **Frontend**: Vercel (Free tier)

**Total Time**: ~30-40 minutes

---

## Part 1: Deploy Backend to Render

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started" → Sign up with GitHub (recommended)
3. Authorize Render to access your repositories

### Step 2: Create PostgreSQL Database

1. **From Render Dashboard**, click "New +" → "PostgreSQL"
2. **Configure database**:
   - **Name**: `hrms-database`
   - **Database**: `hrms_db`
   - **User**: (auto-generated)
   - **Region**: Choose closest to you
   - **Instance Type**: Free
3. Click "Create Database"
4. **Wait 2-3 minutes** for database to be ready
5. **Copy the Internal Database URL**:
   - Click on your database → Scroll to "Connections"
   - Copy the **Internal Database URL** (starts with `postgresql://`)
   - Example: `postgresql://hrms_database_user:xxxx@dpg-xxxx/hrms_db`
   - Note: Use the Internal Database URL for your deployment

### Step 3: Push Code to GitHub

If you haven't already:

1. **Initialize Git** (in project root):
```bash
cd C:\Users\Anam Zahid\Desktop\hrms-lite
git init
git add .
git commit -m "Initial commit - HRMS Lite"
```

2. **Create GitHub repository**:
   - Go to https://github.com/new
   - Name: `hrms-lite`
   - Click "Create repository"

3. **Push code**:
```bash
git remote add origin https://github.com/YOUR_USERNAME/hrms-lite.git
git branch -M main
git push -u origin main
```

### Step 4: Deploy Backend on Render

1. **From Render Dashboard**, click "New +" → "Web Service"
2. **Connect GitHub** → Select `hrms-lite` repository
3. **Configure service**:
   - **Name**: `hrms-backend`
   - **Region**: Same as database
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
   - **Instance Type**: Free

4. **Add Environment Variables**:
   Click "Advanced" → "Add Environment Variable":

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | (paste Internal Database URL from Step 2) |
   | `SECRET_KEY` | (generate a random secret key) |
   | `DEBUG` | `False` |
   | `ALLOWED_HOSTS` | `*` (we'll update this later) |
   | `CORS_ALLOWED_ORIGINS` | `*` (we'll update this later) |

5. Click "Create Web Service"
6. **Wait 3-5 minutes** for deployment
7. **Copy your backend URL**:
   - Example: `https://hrms-backend-xxxx.onrender.com`

### Step 5: Verify Backend

1. Visit: `https://hrms-backend-xxxx.onrender.com/admin/`

2. You should see Django admin login (you can log in with superuser if created)
3. Test the `/api/employees/` endpoint (should return empty array `[]`)

✅ **Backend is live!**

---

## Part 2: Deploy Frontend to Vercel

### Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up" → Continue with GitHub
3. Authorize Vercel

### Step 2: Update Frontend Environment Variable

1. **On your local machine**, edit `frontend/.env`:
```bash
REACT_APP_API_URL=https://hrms-backend-xxxx.onrender.com
```
Replace `xxxx` with your actual Render backend URL.

2. **Commit and push**:
```bash
git add frontend/.env
git commit -m "Update API URL for production"
git push
```

### Step 3: Deploy Frontend on Vercel

1. **From Vercel Dashboard**, click "Add New..." → "Project"
2. **Import Git Repository** → Select `hrms-lite`
3. **Configure Project**:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

4. **Environment Variables**:
   Click "Environment Variables":

   | Name | Value |
   |------|-------|
   | `REACT_APP_API_URL` | `https://hrms-backend-xxxx.onrender.com` |

5. Click "Deploy"
6. **Wait 2-3 minutes** for deployment
7. **Copy your frontend URL**:
   - Example: `https://hrms-lite-xxxx.vercel.app`

### Step 4: Update CORS Origins

1. **Go back to Render** → Your backend service
2. **Environment** → Edit `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://hrms-lite-xxxx.vercel.app
   ```
3. Click "Save Changes"
4. Service will auto-redeploy (~2 minutes)

### Step 5: Verify Frontend

1. Visit your Vercel URL: `https://hrms-lite-xxxx.vercel.app`
2. Test the application:
   - Add an employee
   - Mark attendance
   - Check dashboard

✅ **Frontend is live!**

---

## Part 3: Post-Deployment Testing

### Complete Functionality Test

1. **Employees Page**:
   - Add 2-3 employees
   - Search for employees
   - Delete an employee
   - Verify duplicate ID validation

2. **Attendance Page**:
   - Mark attendance for today
   - View attendance records
   - Filter by date
   - Verify duplicate attendance prevention

3. **Dashboard**:
   - Verify employee count
   - Check today's attendance stats

### Performance Check

- Backend first load may be slow (~30 seconds) due to Render's free tier cold start
- Subsequent requests should be fast
- Frontend should load instantly

---

## 📝 Your Live URLs

**Save these for submission:**

```
Backend API: https://hrms-backend-xxxx.onrender.com
Frontend: https://hrms-lite-xxxx.vercel.app
GitHub Repo: https://github.com/YOUR_USERNAME/hrms-lite
```

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs: Dashboard → hrms-backend → Logs
- Verify DATABASE_URL is set correctly
- Make sure build succeeded

**"502 Bad Gateway"**
- Service is starting (cold start) - wait 30 seconds and refresh
- Check if PORT environment variable is being used correctly

### Frontend Issues

**"Failed to fetch" / CORS errors**
- Verify CORS_ALLOWED_ORIGINS in Render matches your Vercel URL exactly
- Make sure REACT_APP_API_URL is set correctly in Vercel
- Redeploy frontend after backend CORS update

**"Network Error"**
- Check if backend URL is correct in environment variables
- Verify backend is running (visit /admin/ endpoint)

### Database Issues

**"Connection refused"**
- Use **Internal Database URL** not External
- Verify DATABASE_URL is copied correctly
- Check database status in Render

---

## 🚀 Alternative Platforms

### Railway (Alternative to Render)

**Pros**: Faster builds, better free tier
**Cons**: Requires credit card

1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy PostgreSQL
4. New → GitHub Repo → Select backend
5. Add DATABASE_URL from PostgreSQL service
6. Set start command: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`

### Netlify (Alternative to Vercel)

**Similar to Vercel:**

1. Go to https://netlify.com
2. Add new site → Import from Git
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add REACT_APP_API_URL environment variable

---

## ✅ Deployment Checklist

- [ ] PostgreSQL database created on Render
- [ ] Backend deployed on Render
- [ ] Backend API accessible
- [ ] Code pushed to GitHub
- [ ] Frontend deployed on Vercel
- [ ] Frontend loads successfully
- [ ] CORS configured correctly
- [ ] Complete functionality tested
- [ ] All URLs documented

---

**🎉 Your HRMS Lite is now live and ready for submission! 🎉**
