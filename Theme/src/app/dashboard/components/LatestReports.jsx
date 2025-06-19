'use client';
import React from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

const reportsData = [
  { name: ' Vulnerability Report', type: 'Snyk', date: '2025-06-03 (10:45 AM)' },
  { name: ' Port Scan', type: 'Nmap', date: '2025-06-02 (04:10 PM)' },
  { name: ' Static Scan', type: 'Semgrep', date: '2025-06-01 (12:25 PM)' },
];

const LatestReports = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* Header Section - Height Reduced */}
      <Paper
        elevation={1}
        sx={{
          px: 2,
          py: 1, // Reduced vertical padding
          backgroundColor: '#1976d2',
          color: '#fff',
          borderRadius: '8px 8px 0 0',
        }}
      >
        <Typography
          variant="subtitle2"
          fontWeight="bold"
          sx={{ fontSize: '0.8rem' }} // Slightly smaller
        >
          Latest Reports
        </Typography>
      </Paper>

      {/* Table Section */}
      <Paper
        elevation={1}
        sx={{
          p: 2,
          borderRadius: '0 0 8px 8px',
          bgcolor: '#f5f5f5',
        }}
      >
        <TableContainer>
          <Table size="small">
            <TableBody>
              {reportsData.map((report, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontSize: '0.75rem', fontWeight: 400 }}>{report.name}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', fontWeight: 300 }}>{report.type}</TableCell>
                  <TableCell sx={{ fontSize: '0.75rem', fontWeight: 300 }}>{report.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default LatestReports;
