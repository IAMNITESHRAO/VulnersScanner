import React from "react";
import { Box, Typography, Button } from "@mui/material";

export default function ReportSidebar({ open, onClose }) {
  const sections = [
    { id: 'document-details', label: 'Document Details' },
    { id: 'document-history', label: 'Document History' },
    { id: 'disclaimer', label: 'Disclaimer' },
    { id: 'content', label: 'Content' },
    // { id: 'introduction', label: 'Introduction' },
    // { id: 'executive-summary', label: 'Executive Summary' },
    // { id: 'engagement-scope', label: 'Engagement Scope' },
    // { id: 'project-timelines', label: 'Project Timelines' },
    // { id: 'summary-of-tools', label: 'Summary of Tools' },
    // { id: 'approach-methodology', label: 'Approach & Methodology' },
    // { id: 'findings-recommendations', label: 'Findings & Recommendations Summary' },
    { id: 'observation-01', label: 'Observation 01' },
    { id: 'observation-02', label: 'Observation 02' },
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: open ? 0 : "-300px",
        width: 300,
        height: "100vh",
        bgcolor: "#fff",
        boxShadow: 3,
        p: 2,
        transition: "right 0.3s ease-in-out",
        zIndex: 1300
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">Report Navigation</Typography>
        <Button onClick={onClose}>×</Button>
      </Box>
      <Box sx={{ pl: 1, pr: 1 }}>
        <Typography variant="body2" sx={{ color: "#aaa", mb: 2 }}>
          Mobile Application Security Testing
        </Typography>
        {sections.map(item => (
          <Typography
            key={item.id}
            sx={{
              cursor: "pointer",
              mb: 1,
              fontSize: "0.95rem",
              "&:hover": { textDecoration: "underline" }
            }}
            onClick={() => {
              document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
              onClose();
            }}
          >
            • {item.label}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
