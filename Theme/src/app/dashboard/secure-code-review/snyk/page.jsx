'use client';

import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Paper,
  InputAdornment,
  OutlinedInput,
  Stack,
  IconButton,
} from "@mui/material";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ClearIcon from '@mui/icons-material/Clear';
import DownloadIcon from '@mui/icons-material/Download';
import { styled } from "@mui/system";
import PageContainer from "@/app/components/container/PageContainer";
import Breadcrumb from "../../layout/shared/breadcrumb/Breadcrumb";
import { getSnykScanResultAPI, snykScanZipFileAPI } from "@/axios/apis";
import { useRouter } from "next/navigation";

const InfoBox = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f4f6f8",
  padding: theme.spacing(2),
  border: "1px solid #ddd",
  borderRadius: "10px",
  marginBottom: theme.spacing(3),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "1px solid #eee",
}));

export default function SnykScanComponent() {
  const router = useRouter();
  const [folderPath, setFolderPath] = useState("");
  const [format, setFormat] = useState("json");
  const [selectedFile, setSelectedFile] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [statusText, setStatusText] = useState("Awaiting scan...");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith(".zip")) {
        setSelectedFile(file);
        setFolderPath(file.name);
      } else {
        alert("Please upload a ZIP file.");
        e.target.value = null;
        setFolderPath("");
        setSelectedFile(null);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setFolderPath("");
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset input to allow same file re-upload
    }
  };

  const handleRunScan = async () => {
    if (!selectedFile) {
      alert("Please select a ZIP file first.");
      return;
    }

    setLoading(true);
    setScanResult(null);
    setStatusText("Scanning in progress...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await snykScanZipFileAPI(formData, format);
      console.log("Scan API Response:", response);

      setTimeout(async () => {
        try {
          const result = await getSnykScanResultAPI();
          console.log("Scan Result:", result);
          setScanResult(result?.data || {});
          setStatusText("Scan completed");
        } catch (error) {
          setStatusText("Scan failed");
          setScanResult("Error fetching scan result.");
        } finally {
          setLoading(false);
          if (fileInputRef.current) fileInputRef.current.value = null;
        }
      }, 1000);
    } catch (error) {
      console.error("Scan failed", error);
      setStatusText("Scan failed");
      setScanResult("Error occurred while scanning.");
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (scanResult?.downloadLinks?.[format]) {
      const link = document.createElement('a');
      link.href = scanResult.downloadLinks[format];
      link.download = `scan-report.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("Download link not available for selected format.");
    }
  };

  return (
    <>
      <PageContainer title="Snyk" description="this is semgrep">
        <Breadcrumb title="Snyk" subtitle="Avoid Vulnerabilities with Snyk Security Tool" />
      </PageContainer>

      <Box sx={{ maxWidth: 600, mx: "auto", mt: 4 }}>
        <StyledPaper>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
            Snyk Scan
          </Typography>

          <Stack spacing={2}>
            <OutlinedInput
              value={folderPath}
              placeholder="Select ZIP file..."
              fullWidth
              readOnly
              endAdornment={
                <InputAdornment position="end">
                  {folderPath && (
                    <IconButton onClick={handleRemoveFile} edge="end">
                      <ClearIcon />
                    </IconButton>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBrowseClick}
                    sx={{
                      textTransform: "none",
                      bgcolor: "#ff784e",
                      ml: 1,
                      "&:hover": { bgcolor: "#fb5c2c" },
                    }}
                    startIcon={<FolderOpenIcon />}
                  >
                    Browse
                  </Button>
                  <input
                    type="file"
                    accept=".zip"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </InputAdornment>
              }
            />

            <Box>
              <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
                Select Report Format
              </FormLabel>
              <RadioGroup
                row
                name="reportFormat"
                value={format}
                onChange={(e) => setFormat(e.target.value)}
              >
                <FormControlLabel value="json" control={<Radio />} label="JSON" />
                <FormControlLabel value="text" control={<Radio />} label="Text" />
                <FormControlLabel value="sarif" control={<Radio />} label="SARIF" />
                <FormControlLabel value="html" control={<Radio />} label="HTML" />
              </RadioGroup>
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={handleRunScan}
              sx={{
                bgcolor: "#ff784e",
                "&:hover": { bgcolor: "#fb5c2c" },
                textTransform: "none",
              }}
              disabled={loading}
            >
              {loading ? "Running..." : "Run Snyk Scan"}
            </Button>

            <Typography variant="body2" color="textSecondary">
              {statusText}
            </Typography>

            {scanResult?.downloadLinks && (
              <Box mt={2}>
                <Typography variant="subtitle1">Download Report:</Typography>
                {Object.entries(scanResult.downloadLinks).map(([fmt, url]) => (
                  <Button
                    key={fmt}
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    sx={{ m: 1 }}
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `scan-report.${fmt}`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                  >
                    {fmt.toUpperCase()}
                  </Button>
                ))}
              </Box>
            )}

            {statusText === "Scan completed" && scanResult && typeof scanResult === "object" && (
              //               <Button
              //   variant="contained"
              //   color="secondary"
              //   sx={{
              //     mt: 2,
              //     px: 2,
              //     py: 0.5,
              //     fontSize: "0.75rem",
              //     bgcolor: "#1976d2",
              //     "&:hover": { bgcolor: "#115293" },
              //     textTransform: "none",
              //     minWidth: "auto", // optional: agar aap width control karna chahte ho
              //   }}
              //   onClick={() =>
              //     router.push("/dashboard/secure-code-review/reports/snyk")
              //   }
              // >
              //   Go to Reports
              // </Button>

              <Button
                variant="contained"
                sx={{
                  fontSize: '.7rem',
                  lineHeight: '1.5',
                  borderRadius: '4px',
                  backgroundColor: '#1976d2',
                  padding: '6px 10px',
                  color: '#ffffff', // text white
                  '& .MuiButton-startIcon': {
                    color: '#ff784e', // icon orange in normal state
                  },
                  '&:hover': {
                    backgroundColor: '#ff784e', // orange bg on hover
                    color: '#ffffff',           // text blue on hover
                    '& .MuiButton-startIcon': {
                      color: '#1976d2',         // icon white on hover
                    },
                  },
                }}
                onClick={() =>
                  router.push("/dashboard/secure-code-review/reports/snyk")
                }
              >
                Go to Reports
              </Button>

            )}
          </Stack>
        </StyledPaper>
      </Box>
    </>
  );
}
