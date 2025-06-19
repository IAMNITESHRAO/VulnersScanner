"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Box, Container, Button, Paper, Tooltip, IconButton, Divider
} from "@mui/material";
import {
  FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted, FormatListNumbered,
  Image, Link as LinkIcon, FormatAlignLeft, FormatAlignCenter, FormatAlignRight,
  Undo, Redo, Title
} from "@mui/icons-material";
import { saveAs } from "file-saver";
import htmlDocx from "html-docx-js/dist/html-docx";

export default function FinalReportEditor() {
  const editorRef = useRef(null);

  const exec = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  const insertImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          exec("insertImage", reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const createLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const handleUploadHtml = async (e) => {
    const file = e.target.files[0];
    const text = await file.text();
    if (editorRef.current) editorRef.current.innerHTML = text;
  };

  const handleDownload = () => {
    const content = editorRef.current?.innerHTML || "";
    const blob = htmlDocx.asBlob(content);
    saveAs(blob, "editable-report.docx");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Top Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <Button component="label" variant="outlined">
          Upload Converted HTML
          <input type="file" hidden accept=".html" onChange={handleUploadHtml} />
        </Button>
        <Button variant="contained" onClick={handleDownload}>
          Download as DOCX
        </Button>
      </Box>

      {/* Toolbar */}
      <Paper elevation={3} sx={{ p: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
        <Tooltip title="Paragraph">
          <IconButton onClick={() => exec("formatBlock", "<p>")}>
            <Title fontSize="small" />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip title="Unordered List">
          <IconButton onClick={() => exec("insertUnorderedList")}>
            <FormatListBulleted />
          </IconButton>
        </Tooltip>
        <Tooltip title="Ordered List">
          <IconButton onClick={() => exec("insertOrderedList")}>
            <FormatListNumbered />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insert Image">
          <IconButton onClick={insertImage}>
            <Image />
          </IconButton>
        </Tooltip>
        <Tooltip title="Insert Link">
          <IconButton onClick={createLink}>
            <LinkIcon />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip title="Bold">
          <IconButton onClick={() => exec("bold")}>
            <FormatBold />
          </IconButton>
        </Tooltip>
        <Tooltip title="Italic">
          <IconButton onClick={() => exec("italic")}>
            <FormatItalic />
          </IconButton>
        </Tooltip>
        <Tooltip title="Underline">
          <IconButton onClick={() => exec("underline")}>
            <FormatUnderlined />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip title="Align Left">
          <IconButton onClick={() => exec("justifyLeft")}>
            <FormatAlignLeft />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align Center">
          <IconButton onClick={() => exec("justifyCenter")}>
            <FormatAlignCenter />
          </IconButton>
        </Tooltip>
        <Tooltip title="Align Right">
          <IconButton onClick={() => exec("justifyRight")}>
            <FormatAlignRight />
          </IconButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip title="Undo">
          <IconButton onClick={() => exec("undo")}>
            <Undo />
          </IconButton>
        </Tooltip>
        <Tooltip title="Redo">
          <IconButton onClick={() => exec("redo")}>
            <Redo />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Editor Area */}
      <Box
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        sx={{
          border: "1px solid #ccc",
          borderRadius: 2,
          padding: 3,
          mt: 2,
          minHeight: "80vh",
          backgroundColor: "#fff",
          overflow: "auto",
        }}
      >
        <h2>Editable Report</h2>
        <p>Start editing your content here or upload HTML to begin.</p>
      </Box>
    </Container>
  );
}
