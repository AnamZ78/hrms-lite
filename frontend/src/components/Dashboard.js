import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

const Dashboard = () => {
  const [summary, setSummary] = useState({
    totalEmployees: 0,
    totalAttendances: 0,
    totalPresent: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const [employeesRes, attendancesRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/employees/`),
          axios.get(`${API_BASE_URL}/attendances/`),
        ]);
        const totalEmployees = employeesRes.data.length;
        const attendances = attendancesRes.data;
        const totalAttendances = attendances.length;
        const totalPresent = attendances.filter(a => a.status === 'Present').length;
        setSummary({ totalEmployees, totalAttendances, totalPresent });
      } catch (err) {
        setError('Failed to fetch summary data');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  return (
    <Paper sx={{ p: 2, mb: 4 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
        Dashboard Summary
      </Typography>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && (
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: 40, bgcolor: '#e3f2fd' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Employees
                </Typography>
                <Typography variant="h4">
                  {summary.totalEmployees}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: 40, bgcolor: '#f3e5f5' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Attendances
                </Typography>
                <Typography variant="h4">
                  {summary.totalAttendances}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: 40, bgcolor: '#e8f5e8' }}>
              <CardContent>
                <Typography variant="h6" color="textSecondary">
                  Total Present Days
                </Typography>
                <Typography variant="h4">
                  {summary.totalPresent}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};

export default Dashboard;
