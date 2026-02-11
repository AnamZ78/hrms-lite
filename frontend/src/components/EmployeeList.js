import React from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Chip,
} from '@mui/material';
import { Delete, CheckCircle, Visibility } from '@mui/icons-material';

const EmployeeList = ({ employees, onAdd, onDelete, onViewAttendance, onMarkAttendance }) => {
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h2">
          Employees
        </Typography>
      </Box>
      {employees.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            No employees found.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Start by adding your first employee.
          </Typography>
        </Paper>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Department</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>{employee.employee_id}</TableCell>
                  <TableCell>{employee.full_name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>
                    <Chip label={employee.department} color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      startIcon={<CheckCircle />}
                      onClick={() => onMarkAttendance(employee)}
                      sx={{ mr: 1 }}
                    >
                      Mark Attendance
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => onViewAttendance(employee)}
                      sx={{ mr: 1 }}
                    >
                      View Attendance
                    </Button>
                    <Button
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => onDelete(employee.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default EmployeeList;
