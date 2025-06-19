"use client";
import React from "react";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

export default function ApplicationsTable({
  columns = [],               // ['Column1', 'Column2', 'Column3']
  rows = [],                  // [{ Column1: 'val', Column2: 'val' }]
  editable = false,           // Whether cells are contentEditable
  showControls = true,        // Show Add/Subtract buttons
  onAddRow = () => {},
  onSubtractRow = () => {},
  onAddCol = () => {},
  onSubtractCol = () => {},
  extraColumns = []           // For dynamic extra column headers
}) {
  const renderCell = (row, col) => (
    <TableCell
      key={col}
      contentEditable={editable}
      suppressContentEditableWarning={editable}
    >
      {row[col] || ""}
    </TableCell>
  );

  return (
    <>
      {showControls && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
          <Button startIcon={<Add />} onClick={onAddCol}>Add Column</Button>
          <Button startIcon={<Remove />} onClick={onSubtractCol}>Subtract Column</Button>
        </Box>
      )}

      <Table sx={{ mb: 2, border: "1px solid #ccc" }}>
        {columns.length > 0 && (
          <TableHead>
            <TableRow>
              {columns.map((col, idx) => (
                <TableCell key={idx}><b>{col}</b></TableCell>
              ))}
              
              {showControls && <TableCell><b>Actions</b></TableCell>}
              {extraColumns.map((col, idx) => (
                <TableCell key={col}><b>Extra Column {idx + 1}</b></TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}

        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map(col => renderCell(row, col))}
              {extraColumns.map(col => renderCell(row, col))}
              {showControls && (
                <TableCell>
                  <IconButton onClick={() => onSubtractRow(rowIndex)}><Remove /></IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showControls && (
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <Button startIcon={<Add />} onClick={onAddRow}>Add Row</Button>
          <Button startIcon={<Remove />} onClick={() => onSubtractRow(rows.length - 1)}>Subtract Row</Button>
        </Box>
      )}
    </>
  );
}
