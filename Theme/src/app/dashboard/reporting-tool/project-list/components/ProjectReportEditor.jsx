"use client";
import React, { useRef, useState, useEffect } from "react";
import {
    Box, Paper, Button, Divider, Tooltip, IconButton,
} from "@mui/material";
import {
    FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted, FormatListNumbered, Image, Link, FormatAlignLeft, FormatAlignCenter, FormatAlignRight, Undo, Redo, Title,
} from "@mui/icons-material";

const ProjectReportEditor = () => {
    // Toolbar exec commands
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
        if (url) {
            exec("createLink", url);
        }
    };

    // Table data states
    const [columns, setColumns] = useState([
  { name: 'IP', width: '33%' },
  { name: 'Port', width: '33%' },
  { name: 'Status', width: '34%' },
]);

    const [rows, setRows] = useState([
        ["", "", ""],
    ]);
    const [rowHeights, setRowHeights] = useState([40]); // track row heights

    // Handle header text change
    const handleHeaderChange = (index, value) => {
        setColumns((cols) => {
            const newCols = [...cols];
            newCols[index].name = value;
            return newCols;
        });
    };

    // Handle cell text change
    const handleCellChange = (rowIndex, colIndex, value) => {
        setRows((rs) => {
            const newRows = [...rs];
            newRows[rowIndex] = [...newRows[rowIndex]];
            newRows[rowIndex][colIndex] = value;
            return newRows;
        });
    };

    // Add/remove columns
    const addColumn = () => {
        setColumns((cols) => [...cols, { name: `Column ${cols.length + 1}`, width: 150 }]);
        setRows((rs) => rs.map((row) => [...row, ""]));
    };
    const removeColumn = () => {
        setColumns((cols) => (cols.length > 1 ? cols.slice(0, -1) : cols));
        setRows((rs) => rs.map((row) => (row.length > 1 ? row.slice(0, -1) : row)));
    };

    // Add/remove rows
    const addRow = () => {
        setRows((rs) => [...rs, Array(columns.length).fill("")]);
        setRowHeights((rh) => [...rh, 40]);
    };
    const removeRow = () => {
        setRows((rs) => (rs.length > 1 ? rs.slice(0, -1) : rs));
        setRowHeights((rh) => (rh.length > 1 ? rh.slice(0, -1) : rh));
    };

    // Column resizing state and handlers
    const startX = useRef(0);
    const startWidth = useRef(0);
    const resizingColIndex = useRef(null);

    const onMouseDownCol = (e, index) => {
        e.preventDefault();
        startX.current = e.clientX;
        startWidth.current = columns[index].width;
        resizingColIndex.current = index;
        window.addEventListener("mousemove", onMouseMoveCol);
        window.addEventListener("mouseup", onMouseUpCol);
    };

    const onMouseMoveCol = (e) => {
        if (resizingColIndex.current === null) return;
        const diffX = e.clientX - startX.current;
        setColumns((cols) => {
            const newCols = [...cols];
            let newWidth = startWidth.current + diffX;
            if (newWidth < 40) newWidth = 40; // min width
            newCols[resizingColIndex.current].width = newWidth;
            return newCols;
        });
    };

    const onMouseUpCol = () => {
        resizingColIndex.current = null;
        window.removeEventListener("mousemove", onMouseMoveCol);
        window.removeEventListener("mouseup", onMouseUpCol);
    };

    // Row resizing
    const startY = useRef(0);
    const startHeight = useRef(0);
    const resizingRowIndex = useRef(null);

    const onMouseDownRow = (e, index) => {
        e.preventDefault();
        startY.current = e.clientY;
        startHeight.current = rowHeights[index];
        resizingRowIndex.current = index;
        window.addEventListener("mousemove", onMouseMoveRow);
        window.addEventListener("mouseup", onMouseUpRow);
    };

    const onMouseMoveRow = (e) => {
        if (resizingRowIndex.current === null) return;
        const diffY = e.clientY - startY.current;
        setRowHeights((heights) => {
            const newHeights = [...heights];
            let newHeight = startHeight.current + diffY;
            if (newHeight < 30) newHeight = 30; // min height
            newHeights[resizingRowIndex.current] = newHeight;
            return newHeights;
        });
    };

    const onMouseUpRow = () => {
        resizingRowIndex.current = null;
        window.removeEventListener("mousemove", onMouseMoveRow);
        window.removeEventListener("mouseup", onMouseUpRow);
    };

    return (
        <Box>
            {/* Toolbar */}
            <Paper
                elevation={3}
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    backgroundColor: "#fff",
                    p: 1,
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                    flexWrap: "wrap",
                }}
            >
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
                        <Link />
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

            {/* Editor Content */}
            <Box
                sx={{
                    p: 3,
                    minHeight: "80vh",
                    border: "1px solid #ddd",
                    mt: 2,
                    borderRadius: 2,
                    maxWidth: "95vw",
                    overflowX: "auto",
                }}
            >
                <div contentEditable={true} suppressContentEditableWarning={true}>
                    <h1>Edit Project Report</h1>
                    <p>This is a sample editable paragraph. You can insert images, links, or use the table below.</p>
                </div>

                {/* Table + Buttons */}
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: 900,
                        margin: "auto",
                        mt: 4,
                        userSelect: "none",
                    }}
                >
                    {/* Table + Column buttons */}
                    <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                        {/* Table */}
                        <Box
                            component="table"
                            sx={{
                                borderCollapse: "collapse",
                                width: "100%",
                                tableLayout: "fixed",
                                border: "1px solid #ccc",
                                "& th, & td": {
                                    border: "1px solid #ccc",
                                    padding: "8px",
                                    overflowWrap: "break-word",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal",
                                    position: "relative",
                                },
                                "& th": {
                                    backgroundColor: "#f0f0f0",
                                    userSelect: "text",
                                },
                            }}
                        >
                            <thead>
                                <tr>
                                    {columns.map((col, colIndex) => (
                                        <th
                                            key={colIndex}
                                            contentEditable
                                            suppressContentEditableWarning
                                            onInput={(e) =>
                                                handleHeaderChange(colIndex, e.currentTarget.innerText)
                                            }
                                            
                                            style={{ width: columns[colIndex].width, minWidth: 40, minHeight: 40 }}
                                        >
                                            {col.name}
                                            {/* Resize handle */}
                                            <div
                                                onMouseDown={(e) => onMouseDownCol(e, colIndex)}
                                                style={{
                                                    position: "absolute",
                                                    top: 0,
                                                    right: 0,
                                                    width: 6,
                                                    height: "100%",
                                                    cursor: "col-resize",
                                                    userSelect: "none",
                                                    zIndex: 10,
                                                }}
                                            />
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} style={{ height: rowHeights[rowIndex] || 40 }}>
                                        {row.map((cell, colIndex) => (
                                            <td
                                                key={colIndex}
                                                style={{
                                                    width: columns[colIndex].width,
                                                    minWidth: 40,
                                                    minHeight: rowHeights[rowIndex] || 40,
                                                }}
                                            >
                                                <div
                                                    contentEditable
                                                    suppressContentEditableWarning
                                                    onInput={(e) =>
                                                        handleCellChange(rowIndex, colIndex, e.currentTarget.innerText)
                                                    }
                                                    onBlur={(e) =>
                                                        handleCellChange(rowIndex, colIndex, e.currentTarget.innerText)
                                                    }
                                                    style={{
                                                        width: "100%",
                                                        minHeight: "100%",
                                                        outline: "none",
                                                        whiteSpace: "normal",
                                                        wordBreak: "break-word",
                                                        overflowWrap: "break-word",
                                                        cursor: "text",
                                                    }}
                                                />

                                                {/* Row resize handle */}
                                                {colIndex === 0 && (
                                                    <div
                                                        onMouseDown={(e) => onMouseDownRow(e, rowIndex)}
                                                        style={{
                                                            position: "absolute",
                                                            bottom: 0,
                                                            left: 0,
                                                            width: "100%",
                                                            height: 6,
                                                            cursor: "row-resize",
                                                            userSelect: "none",
                                                            zIndex: 10,
                                                        }}
                                                    />
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </Box>

                        {/* Column buttons */}
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                                userSelect: "none",
                                mt: "38px",
                                minWidth: 100,
                            }}
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={removeColumn}
                                disabled={columns.length <= 1}
                            >
                                - Column
                            </Button>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={addColumn}
                            >
                                + Column
                            </Button>
                        </Box>
                    </Box>

                    {/* Row buttons */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            justifyContent: "flex-start",
                            mt: 1,
                            userSelect: "none",
                            minWidth: 100,
                        }}
                    >
                        <Button
                            variant="outlined"
                            size="small"
                            onClick={removeRow}
                            disabled={rows.length <= 1}
                        >
                            - Row
                        </Button>
                        <Button variant="outlined" size="small" onClick={addRow} >
                            + Row
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ProjectReportEditor;
