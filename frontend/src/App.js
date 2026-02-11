import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Container, Typography, AppBar, Toolbar, Button, Box, Paper } from '@mui/material';
import { People, Add } from '@mui/icons-material';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import AttendanceForm from './components/AttendanceForm';
import AttendanceView from './components/AttendanceView';
import Dashboard from './components/Dashboard';
import './App.css';

const API_BASE_URL = 'http://localhost:8000/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2c3e50',
    },
    secondary: {
      main: '#2c3e50',
    },
  },
});

function App() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [view, setView] = useState('employees'); // 'employees', 'addEmployee', 'attendance', 'attendanceView'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (view === 'employees') {
      fetchEmployees();
    }
  }, [view]);

  const fetchEmployees = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/`);
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/employees/`, employeeData);
      setView('employees');
      fetchEmployees();
      return Promise.resolve();
    } catch (err) {
      let errorMessage = 'Failed to add employee';
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.detail) {
          errorMessage = err.response.data.detail;
        } else {
          // Handle field-specific errors
          const fieldErrors = Object.values(err.response.data).flat();
          if (fieldErrors.length > 0) {
            errorMessage = fieldErrors[0];
          }
        }
      }
      setError(errorMessage);
      return Promise.reject(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/employees/${id}/`);
      fetchEmployees();
    } catch (err) {
      setError('Failed to delete employee');
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (attendanceData) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post(`${API_BASE_URL}/attendances/`, attendanceData);
      setView('attendanceView');
    } catch (err) {
      setError('Failed to mark attendance please select the correct date.');
    } finally {
      setLoading(false);
    }
  };

  const renderView = () => {
    switch (view) {
      case 'employees':
        return (
          <>
            <Dashboard />
            <EmployeeList
              employees={employees}
              onAdd={() => setView('addEmployee')}
              onDelete={deleteEmployee}
              onViewAttendance={(employee) => {
                setSelectedEmployee(employee);
                setView('attendanceView');
              }}
              onMarkAttendance={(employee) => {
                setSelectedEmployee(employee);
                setView('attendance');
              }}
            />
          </>
        );
      case 'addEmployee':
        return <AddEmployee onAdd={addEmployee} onCancel={() => setView('employees')} error={error} />;
      case 'attendance':
        return (
          <AttendanceForm
            employee={selectedEmployee}
            onMark={markAttendance}
            onCancel={() => setView('employees')}
          />
        );
      case 'attendanceView':
        return (
          <AttendanceView
            employee={selectedEmployee}
            onBack={() => setView('employees')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            HRMS Lite
          </Typography>
          <Button color="inherit" startIcon={<Add />} onClick={() => { setError(null); setView('addEmployee'); }} sx={{ mr: 2 }}>
            Add Employee
          </Button>
          <Button color="inherit" startIcon={<People />} onClick={() => setView('employees')}>
            View Employees
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          {loading && (
            <Typography variant="body1" sx={{ textAlign: 'center', my: 2 }}>
              Loading...
            </Typography>
          )}
          {error && (
            <Paper sx={{ p: 2, mb: 2, bgcolor: 'error.light', color: 'error.contrastText' }}>
              <Typography variant="body1">{error}</Typography>
            </Paper>
          )}
          {renderView()}
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;