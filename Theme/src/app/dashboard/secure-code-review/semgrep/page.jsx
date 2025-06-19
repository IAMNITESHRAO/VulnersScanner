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
import { useRouter } from "next/navigation";
import { getSemgrepScanResultAPI, semgrepScanZipFileAPI } from "@/axios/apis";

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "16px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
  border: "1px solid #eee",
}));

export default function SemgrepScanComponent() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [zipFileName, setZipFileName] = useState("");
  const [reportFormat, setReportFormat] = useState("json");
  const [scanType, setScanType] = useState("default");
  const [statusText, setStatusText] = useState("Awaiting scan...");
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleBrowseClick = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".zip")) {
      setSelectedFile(file);
      setZipFileName(file.name);
    } else {
      alert("Please upload a ZIP file.");
      e.target.value = null;
      setSelectedFile(null);
      setZipFileName("");
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setZipFileName("");
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleRunScan = async () => {
  if (!selectedFile) {
    alert("Please select a ZIP file first.");
    return;
  }

  setLoading(true);
  setStatusText("Scanning in progress...");
  setScanResult(null);

  const formData = new FormData();
  formData.append("file", selectedFile);
  formData.append("format", reportFormat); // ✅ moved from URL to body
  formData.append("scanType", scanType);   // ✅ moved from URL to body

  try {
    const uploadResponse = await semgrepScanZipFileAPI(formData);
    console.log("Semgrep Upload Response:", uploadResponse);

    setTimeout(async () => {
      try {
        const result = await getSemgrepScanResultAPI();
        console.log("Semgrep Scan Result:", result);
        setScanResult(result?.data || {});
        setStatusText("Scan completed");
      } catch (error) {
        console.error("Error fetching scan result:", error);
        setScanResult("Error fetching scan result.");
        setStatusText("Scan failed");
      } finally {
        setLoading(false);
        if (fileInputRef.current) fileInputRef.current.value = null;
      }
    }, 1000);
  } catch (error) {
    console.error("Semgrep scan failed:", error);
    setStatusText("Scan failed");
    setScanResult("Error occurred during scanning.");
    setLoading(false);
  }
};

  return (
    <>
      <PageContainer title="Semgrep" description="Semgrep scan upload and results">
        <Breadcrumb title="Semgrep" subtitle="Say goodbye to false positives" />
      </PageContainer>

      <Box sx={{ maxWidth: 650, mx: "auto", mt: 4 }}>
        <StyledPaper>
          <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
            Semgrep Scan
          </Typography>

          <Stack spacing={2}>
            <OutlinedInput
              value={zipFileName}
              placeholder="Select ZIP file..."
              fullWidth
              readOnly
              endAdornment={
                <InputAdornment position="end">
                  {zipFileName && (
                    <IconButton onClick={handleRemoveFile} edge="end">
                      <ClearIcon />
                    </IconButton>
                  )}
                  <Button
                    variant="contained"
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
                value={reportFormat}
                onChange={(e) => setReportFormat(e.target.value)}
              >
                <FormControlLabel value="json" control={<Radio />} label="JSON" />
                <FormControlLabel value="text" control={<Radio />} label="Text" />
                <FormControlLabel value="sarif" control={<Radio />} label="SARIF" />
                <FormControlLabel value="html" control={<Radio />} label="HTML" />
              </RadioGroup>
            </Box>

            <Box>
              <FormLabel component="legend" sx={{ fontWeight: 600, mb: 1 }}>
                Select Scan Type
              </FormLabel>
              <RadioGroup
                row
                value={scanType}
                onChange={(e) => setScanType(e.target.value)}
              >
                <FormControlLabel value="default" control={<Radio />} label="Default" />
                <FormControlLabel value="owasp" control={<Radio />} label="OWASP Top 10" />
                <FormControlLabel value="security" control={<Radio />} label="Security Audit" />
                <FormControlLabel value="best" control={<Radio />} label="Best Practices" />
                <FormControlLabel value="secrets" control={<Radio />} label="Secrets" />
              </RadioGroup>
            </Box>

            <Button
              variant="contained"
              onClick={handleRunScan}
              disabled={loading}
              sx={{
                bgcolor: "#ff784e",
                "&:hover": { bgcolor: "#fb5c2c" },
                textTransform: "none",
              }}
            >
              {loading ? "Running..." : "Run Semgrep Scan"}
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
                      const link = document.createElement("a");
                      link.href = url;
                      link.download = `semgrep-report.${fmt}`;
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
              <Button
                variant="contained"
                sx={{
                  fontSize: '.7rem',
                  lineHeight: '1.5',
                  borderRadius: '4px',
                  backgroundColor: '#1976d2',
                  padding: '6px 10px',
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
                onClick={() =>
                  router.push("/dashboard/secure-code-review/reports/semgrep")
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
