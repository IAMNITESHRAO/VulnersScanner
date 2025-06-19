import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from '@mui/material';

const data = [
  { ip: '192.168.1.1', port: '8080', status: 'Active' },
  { ip: '10.0.0.2', port: '3000', status: 'Inactive' },
  { ip: '172.16.5.4', port: '5000', status: 'Active' }
];

export default function ProjectTest() {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, margin: 'auto', mt: 5 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>IP</strong></TableCell>
            <TableCell><strong>Port</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.ip}</TableCell>
              <TableCell>{row.port}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
