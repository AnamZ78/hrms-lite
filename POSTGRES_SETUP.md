# PostgreSQL Setup Guide for Windows

## Step 1: Install PostgreSQL (If Not Already Installed)

### Download PostgreSQL
- Visit: https://www.postgresql.org/download/windows/
- Click "Download the installer"
- Download PostgreSQL 16.x (or latest version)

### Run the installer
**Installation Steps:**
- **Select Components**: Keep all default selections (PostgreSQL Server, pgAdmin 4, Command Line Tools)
- **Data Directory**: Keep default
- **Password**: Set a password for the postgres superuser (remember this!)
- **Port**: Keep default 5432
- **Locale**: Keep default
- Click "Next" and finish installation

## Step 2: Create Database for HRMS

You have already configured your .env file with:

```
DATABASE_URL=postgresql://prakhar:12345678@localhost:5432/hrms_db
```

Now you need to create the database and user. Choose ONE method below:

### Option A: Using pgAdmin (GUI - Easier)

**Open pgAdmin 4** (installed with PostgreSQL)

**Connect to Server:**
- Right-click "PostgreSQL 16" → Connect
- Enter your postgres password

**Create Database User (prakhar):**
- Right-click "Login/Group Roles" → Create → Login/Group Role
- **General Tab**: Name = prakhar
- **Definition Tab**: Password = 12345678
- **Privileges Tab**: Check "Can login?" and "Superuser"
- Click "Save"

**Create Database:**
- Right-click "Databases" → Create → Database
- **Database**: hrms_db
- **Owner**: Select prakhar
- Click "Save"

✅ **Done!** Skip to Step 3.

### Option B: Using Command Line (psql)

**Open Command Prompt** (as Administrator)

**Connect to PostgreSQL:**
```
psql -U postgres
```
Enter your postgres password when prompted.

**Run these SQL commands:**
```
CREATE USER prakhar WITH PASSWORD '12345678';
ALTER USER prakhar WITH SUPERUSER;
CREATE DATABASE hrms_db OWNER prakhar;
\q
```

✅ **Done!**

## Step 3: Verify Database Connection

**Navigate to backend directory:**
```
cd C:\Users\Anam Zahid\Desktop\hrms-lite\backend
```

**Activate virtual environment** (if not already):
```
venv\Scripts\activate
```

**Test connection by starting the backend:**
```
python manage.py runserver
```

**Check for success:**
- You should see: Starting development server at http://127.0.0.1:8000/
- No database connection errors
## Troubleshooting

**Error: "FATAL: password authentication failed for user 'prakhar'"**
- Solution: Recreate the user with correct password OR update .env with correct credentials

**Error: "FATAL: database 'hrms_db' does not exist"**
- Solution: Create the database using pgAdmin or psql (see Step 2)

**Error: "connection refused"**
- Solution: Make sure PostgreSQL service is running
  - Press Win + R, type `services.msc`
  - Find "postgresql-x64-16" service
  - Right-click → Start (if not running)

**Error: "psql: command not found"**
- Solution: Add PostgreSQL to PATH:
  - Copy path: `C:\Program Files\PostgreSQL\16\bin`
  - Add to System Environment Variables → Path
  - Restart Command Prompt

## Next Steps

Once database is set up and verified:

- **Start backend**: `python manage.py runserver`
- **Start frontend**: `npm start` (in frontend directory)
- **Test application** at http://localhost:3000

✨ **Your PostgreSQL database is ready for HRMS Lite!** ✨
