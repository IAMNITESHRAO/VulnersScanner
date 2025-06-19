"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  Paper
} from "@mui/material";
import {
  Delete,
  AddCircleOutline
} from "@mui/icons-material";

export default function ContentEditor() {
  const initialContentRows = [
    { label: "Introduction", page: "4" },
    { label: "Executive Summary", page: "5" },
    { label: "Detailed Technical Findings", page: "10" },
    { label: "Client Remarks", page: "25" },
    { label: "Tester’s Notes", page: "26" },
    { label: "Conclusion", page: "27" },
  ];

  const [contentRows, setContentRows] = useState(initialContentRows);

  const addRow = (index, position = "below") => {
    const newRow = { label: "", page: "" };
    const newRows = [...contentRows];
    newRows.splice(position === "above" ? index : index + 1, 0, newRow);
    setContentRows(newRows);
  };

  const deleteRow = (index) => {
    const newRows = [...contentRows];
    newRows.splice(index, 1);
    setContentRows(newRows);
  };

  const updateRow = (index, field, value) => {
    const newRows = [...contentRows];
    newRows[index][field] = value;
    setContentRows(newRows);
  };

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 2,
        p: 3,
        mt: 4,
        bgcolor: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#f57c00",
          borderBottom: "2px solid #f57c00",
          display: "inline-block",
          pb: "4px",
        }}
      >
        Content
      </Typography>

      <Box sx={{ mt: 3 }}>
        {contentRows.map((row, i) => (
          <Paper
            key={i}
            elevation={1}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1,
              px: 2,
              py: 1,
            }}
          >
            <Typography sx={{ width: 30 }}>{i + 1}.</Typography>
            <TextField
              placeholder="Section Title"
              size="small"
              value={row.label}
              onChange={(e) => updateRow(i, "label", e.target.value)}
              sx={{ flexGrow: 1 }}
            />
            <TextField
              placeholder="Page"
              size="small"
              value={row.page}
              onChange={(e) => updateRow(i, "page", e.target.value)}
              sx={{ width: 80 }}
            />
            <IconButton
              color="primary"
              onClick={() => addRow(i, "above")}
              sx={{ ml: 1 }}
              title="Add Above"
            >
              <AddCircleOutline />
            </IconButton>
            <IconButton
              color="primary"
              onClick={() => addRow(i, "below")}
              title="Add Below"
            >
              <AddCircleOutline sx={{ transform: "rotate(180deg)" }} />
            </IconButton>
            <IconButton
              color="error"
              onClick={() => deleteRow(i)}
              title="Delete Row"
            >
              <Delete />
            </IconButton>
          </Paper>
        ))}
      </Box>

      <Button
        variant="outlined"
        sx={{ mt: 2 }}
        onClick={() => setContentRows([...contentRows, { label: "", page: "" }])}
      >
        Add Final Row
      </Button>
    </Box>
  );
}
