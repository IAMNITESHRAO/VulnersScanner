'use client';

import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { IconArrowBack } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { deleteAllSemgrepReportAPI, deleteAllSnykReportAPI, deleteSemgrepReportAPI, getSemgrepScanResultAPI } from '@/axios/apis';
import SnykFileTable from '../components/FileTable';
import FileTable from '../components/FileTable';

const Semgrep = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [scanData, setScanData] = useState([]);

  const handleBackClick = () => router.back();

  const handleFileClick = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const response = await axios.get(
        `http://100.72.238.95:8091/api/semgrep/downloadReportById`,
        {
          params: { id },
          responseType: 'blob',
          headers: {
            Authorization: `Bearer ${token}`, // try 'Token' or raw if Bearer doesn't work
          },
        }
      );

      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'report';

      if (contentDisposition && contentDisposition.includes('filename=')) {
        fileName = contentDisposition
          .split('filename=')[1]
          .replace(/['"]/g, '')
          .trim();
      }

      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('File download failed:', error);
      alert('Failed to download the file. Please try again.');
    }
  };


  const handleDelete = async (ids) => {
  const idArray = Array.isArray(ids) ? ids : [ids];

  try {
      const res = await deleteAllSemgrepReportAPI(idArray);
    if (res.status === 200) {
      setScanData(prev => prev.filter(r => !idArray.includes(r.id)));
    } else {
      throw new Error('Delete failed');
    }
    } catch (err) {
    console.error('Delete failed', err);
    throw err;                    // bubble up so FileTable can toast
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSemgrepScanResultAPI();
        if (response && Array.isArray(response.data)) {
          const formatted = response.data.map((item) => ({
            id: item.id,
            fileName: item.originalFileName || 'N/A',
            fileType: item.format || 'N/A',
            dateTime: item.scanTimestamp ? new Date(item.scanTimestamp).toLocaleString() : 'N/A',
            status: item.status || 'N/A',
            reportPath: item.reportPath || '',
          }));
          setScanData(formatted);
        } else {
          setScanData([]);
        }
      } catch (error) {
        console.error('Failed to fetch scan results:', error);
        setScanData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Initial load

    const interval = setInterval(fetchData, 5000); // Auto refresh every 5s

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <Box sx={{ p: 0 }}>
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<IconArrowBack />}
          onClick={handleBackClick}
          sx={{
            fontSize: '.7rem',
            lineHeight: '1.5',
            borderRadius: '4px',
            backgroundColor: '#1976d2',
            padding: '6px 12px',
            color: '#ffffff',
            '& .MuiButton-startIcon': {
              color: '#ff784e',
            },
            '&:hover': {
              backgroundColor: '#ff784e',
              color: '#ffffff',
              '& .MuiButton-startIcon': {
                color: '#1976d2',
              },
            },
          }}
        >
          Back to Reports
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <FileTable
          title="Semgrep Reports"
          tableData={scanData}
          onFileClick={handleFileClick}
          onDelete={handleDelete} 
        />
      )}
    </Box>
  );
};

export default Semgrep;
