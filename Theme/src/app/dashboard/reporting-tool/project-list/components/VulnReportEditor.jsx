// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box, Container, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow,
//   IconButton, Paper, Tooltip, Divider
// } from "@mui/material";
// import {
//   Add, Remove, FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted,
//   FormatListNumbered, Image, Link as LinkIcon, FormatAlignLeft, FormatAlignCenter,
//   FormatAlignRight, Undo, Redo, Title
// } from "@mui/icons-material";
// import htmlDocx from "html-docx-js/dist/html-docx";
// import { saveAs } from "file-saver";

// const defaultReportData = {
//   severity: "Critical",
//   status: "Open",
//   abstract: "Loading...",
//   cweId: "CWE-639",
//   easeOfExploitation: "Medium",
//   impact: "Loading...",
//   recommendation: "Loading...",
//   applicationUrls: [
//     { url: "https://staging.ongrid.in/portal/#/myCommunity/76148/create-invitations", parameter: "N/A" }
//   ]
// };

// export default function VulnReportEditor() {
//   const editorRef = useRef(null);
//   const [report, setReport] = useState(defaultReportData);
//   const [columnCount, setColumnCount] = useState(2);

//   useEffect(() => {
//     fetch("/api/vuln-report")
//       .then(res => res.json())
//       .then(data => setReport(data))
//       .catch(() => console.warn("API fetch failed. Using default data."));
//   }, []);

//   const exec = (command, value = null) => {
//     document.execCommand(command, false, value);
//   };

//   const insertImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           exec("insertImage", reader.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   const createLink = () => {
//     const url = prompt("Enter URL:");
//     if (url) exec("createLink", url);
//   };

//   const addRow = () => {
//     setReport(prev => ({
//       ...prev,
//       applicationUrls: [...prev.applicationUrls, { url: "", parameter: "" }]
//     }));
//   };

//   const subtractRow = () => {
//     setReport(prev => {
//       const lastRow = prev.applicationUrls[prev.applicationUrls.length - 1];
//       const isEmpty = !lastRow.url.trim() && !lastRow.parameter.trim();
//       if (prev.applicationUrls.length > 1 && isEmpty) {
//         return {
//           ...prev,
//           applicationUrls: prev.applicationUrls.slice(0, -1)
//         };
//       }
//       return prev;
//     });
//   };

//   const addColumn = () => {
//     alert("You can only add new logical columns by modifying the data model. Currently only URL and Parameter fields exist.");
//   };

//   const subtractColumn = () => {
//     alert("To subtract a column, please remove it from the data model and UI manually. Only 2 columns (URL + Parameter) are supported now.");
//   };

//   const handleDownload = () => {
//     const content = editorRef.current?.innerHTML || "";
//     const blob = htmlDocx.asBlob(content);
//     saveAs(blob, "vuln-report.docx");
//   };

//   return (
//     <Container maxWidth="md" sx={{ my: 4 }}>
//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <Button variant="contained" onClick={handleDownload}>Download as DOCX</Button>
//       </Box>

//       <Paper elevation={3} sx={{ p: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//         <Tooltip title="Paragraph"><IconButton onClick={() => exec("formatBlock", "<p>")}> <Title fontSize="small" /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Unordered List"><IconButton onClick={() => exec("insertUnorderedList")}> <FormatListBulleted /> </IconButton></Tooltip>
//         <Tooltip title="Ordered List"><IconButton onClick={() => exec("insertOrderedList")}> <FormatListNumbered /> </IconButton></Tooltip>
//         <Tooltip title="Insert Image"><IconButton onClick={insertImage}> <Image /> </IconButton></Tooltip>
//         <Tooltip title="Insert Link"><IconButton onClick={createLink}> <LinkIcon /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Bold"><IconButton onClick={() => exec("bold")}> <FormatBold /> </IconButton></Tooltip>
//         <Tooltip title="Italic"><IconButton onClick={() => exec("italic")}> <FormatItalic /> </IconButton></Tooltip>
//         <Tooltip title="Underline"><IconButton onClick={() => exec("underline")}> <FormatUnderlined /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Align Left"><IconButton onClick={() => exec("justifyLeft")}> <FormatAlignLeft /> </IconButton></Tooltip>
//         <Tooltip title="Align Center"><IconButton onClick={() => exec("justifyCenter")}> <FormatAlignCenter /> </IconButton></Tooltip>
//         <Tooltip title="Align Right"><IconButton onClick={() => exec("justifyRight")}> <FormatAlignRight /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Undo"><IconButton onClick={() => exec("undo")}> <Undo /> </IconButton></Tooltip>
//         <Tooltip title="Redo"><IconButton onClick={() => exec("redo")}> <Redo /> </IconButton></Tooltip>
//       </Paper>

//       <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 2, bgcolor: "#fff", fontFamily: "Arial, sans-serif" }}>
//         <h2>Observation 01: Account Take Over (ATO)</h2>
//         <p><b>Severity:</b> {report.severity}</p>
//         <p><b>Status:</b> {report.status}</p>
//         <p><b>Abstract:</b> {report.abstract}</p>
//         <p><b>CWE ID/CVE ID:</b> {report.cweId}</p>
//         <p><b>Ease of Exploitation:</b> {report.easeOfExploitation}</p>
//         <p><b>Impact:</b> {report.impact}</p>

//         <h3>Applications Affected</h3>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
//           <Button startIcon={<Add />} onClick={addColumn}>Add Column</Button>
//           <Button startIcon={<Remove />} onClick={subtractColumn}>Subtract Column</Button>
//         </Box>
//         <Table sx={{ mb: 2, border: "1px solid #ccc" }}>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Application URL</b></TableCell>
//               <TableCell><b>Vulnerable Parameter</b></TableCell>
//               <TableCell><b>Actions</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {report.applicationUrls.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell contentEditable suppressContentEditableWarning>{row.url}</TableCell>
//                 <TableCell contentEditable suppressContentEditableWarning>{row.parameter}</TableCell>
//                 <TableCell>
//                   <IconButton onClick={() => subtractRow(index)}><Remove /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//           <Button startIcon={<Add />} onClick={addRow}>Add Row</Button>
//           <Button startIcon={<Remove />} onClick={subtractRow}>Subtract Row</Button>
//         </Box>

//         <p><b>Recommendation:</b> {report.recommendation}</p>
//       </Box>
//     </Container>
//   );
// }



// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import {
//   Box, Container, Button, Typography, Table, TableBody, TableCell, TableHead, TableRow,
//   IconButton, Paper, Tooltip, Divider
// } from "@mui/material";
// import {
//   Add, Remove, FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted,
//   FormatListNumbered, Image, Link as LinkIcon, FormatAlignLeft, FormatAlignCenter,
//   FormatAlignRight, Undo, Redo, Title
// } from "@mui/icons-material";
// import htmlDocx from "html-docx-js/dist/html-docx";
// import { saveAs } from "file-saver";

// const defaultReportData = {
//   severity: "Critical",
//   status: "Open",
//   abstract: "Loading...",
//   cweId: "CWE-639",
//   easeOfExploitation: "Medium",
//   impact: "Loading...",
//   recommendation: "Loading...",
//   applicationUrls: [
//     { url: "https://staging.ongrid.in/portal/#/myCommunity/76148/create-invitations", parameter: "N/A" }
//   ]
// };

// export default function VulnReportEditor() {
//   const editorRef = useRef(null);
//   const [report, setReport] = useState(defaultReportData);
//   const [extraColumns, setExtraColumns] = useState([]);

//   useEffect(() => {
//     fetch("/api/vuln-report")
//       .then(res => res.json())
//       .then(data => setReport(data))
//       .catch(() => console.warn("API fetch failed. Using default data."));
//   }, []);

//   const exec = (command, value = null) => {
//     document.execCommand(command, false, value);
//   };

//   const insertImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => {
//           exec("insertImage", reader.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   const createLink = () => {
//     const url = prompt("Enter URL:");
//     if (url) exec("createLink", url);
//   };

//   const addRow = () => {
//     const newRow = { url: "", parameter: "" };
//     extraColumns.forEach((_, i) => newRow[`extra_${i}`] = "");
//     setReport(prev => ({
//       ...prev,
//       applicationUrls: [...prev.applicationUrls, newRow]
//     }));
//   };

//   const subtractRow = () => {
//     setReport(prev => {
//       const lastRow = prev.applicationUrls[prev.applicationUrls.length - 1];
//       const isEmpty = Object.values(lastRow).every(v => !v.trim());
//       if (prev.applicationUrls.length > 1 && isEmpty) {
//         return {
//           ...prev,
//           applicationUrls: prev.applicationUrls.slice(0, -1)
//         };
//       }
//       return prev;
//     });
//   };

//   const addColumn = () => {
//     const colIndex = extraColumns.length;
//     const newCol = `extra_${colIndex}`;
//     setExtraColumns([...extraColumns, newCol]);
//     setReport(prev => ({
//       ...prev,
//       applicationUrls: prev.applicationUrls.map(row => ({ ...row, [newCol]: "" }))
//     }));
//   };

//   const subtractColumn = () => {
//     if (extraColumns.length === 0) return;
//     const colToRemove = extraColumns[extraColumns.length - 1];
//     const isColumnEmpty = report.applicationUrls.every(row => !row[colToRemove]?.trim());
//     if (isColumnEmpty) {
//       setExtraColumns(cols => cols.slice(0, -1));
//       setReport(prev => ({
//         ...prev,
//         applicationUrls: prev.applicationUrls.map(row => {
//           const updated = { ...row };
//           delete updated[colToRemove];
//           return updated;
//         })
//       }));
//     }
//   };

//   const handleDownload = () => {
//     const content = editorRef.current?.innerHTML || "";
//     const blob = htmlDocx.asBlob(content);
//     saveAs(blob, "vuln-report.docx");
//   };

//   return (
//     <Container maxWidth="md" sx={{ my: 4 }}>
//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <Button variant="contained" onClick={handleDownload}>Download as DOCX</Button>
//       </Box>

//       <Paper elevation={3} sx={{ p: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//         <Tooltip title="Paragraph"><IconButton onClick={() => exec("formatBlock", "<p>")}> <Title fontSize="small" /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Unordered List"><IconButton onClick={() => exec("insertUnorderedList")}> <FormatListBulleted /> </IconButton></Tooltip>
//         <Tooltip title="Ordered List"><IconButton onClick={() => exec("insertOrderedList")}> <FormatListNumbered /> </IconButton></Tooltip>
//         <Tooltip title="Insert Image"><IconButton onClick={insertImage}> <Image /> </IconButton></Tooltip>
//         <Tooltip title="Insert Link"><IconButton onClick={createLink}> <LinkIcon /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Bold"><IconButton onClick={() => exec("bold")}> <FormatBold /> </IconButton></Tooltip>
//         <Tooltip title="Italic"><IconButton onClick={() => exec("italic")}> <FormatItalic /> </IconButton></Tooltip>
//         <Tooltip title="Underline"><IconButton onClick={() => exec("underline")}> <FormatUnderlined /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Align Left"><IconButton onClick={() => exec("justifyLeft")}> <FormatAlignLeft /> </IconButton></Tooltip>
//         <Tooltip title="Align Center"><IconButton onClick={() => exec("justifyCenter")}> <FormatAlignCenter /> </IconButton></Tooltip>
//         <Tooltip title="Align Right"><IconButton onClick={() => exec("justifyRight")}> <FormatAlignRight /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Undo"><IconButton onClick={() => exec("undo")}> <Undo /> </IconButton></Tooltip>
//         <Tooltip title="Redo"><IconButton onClick={() => exec("redo")}> <Redo /> </IconButton></Tooltip>
//       </Paper>

//       <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 4, bgcolor: "#fff", fontFamily: "Arial, sans-serif" }}>
//         <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 4, bgcolor: "#fff", fontFamily: "Arial, sans-serif" }}>
//         <h2 style={{ color: '#e65100' }}>Document Details</h2>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
//           <Button startIcon={<Add />} onClick={addColumn}>Add Column</Button>
//           <Button startIcon={<Remove />} onClick={subtractColumn}>Subtract Column</Button>
//         </Box>
//         <Table sx={{ width: '100%', mb: 3 }}>
//           <TableBody>
//             <TableRow>
//               <TableCell><b>Document</b></TableCell>
//               <TableCell>Mobile Application Security Testing</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Report Submitted By</b></TableCell>
//               <TableCell>CyberCube Services Pvt. Ltd.</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Report Submitted On (Date)</b></TableCell>
//               <TableCell>26-Jul-2024</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Security Consultant Name</b></TableCell>
//               <TableCell>bharat</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell><b>Project Manager</b></TableCell>
//               <TableCell>Mr. Shailesh Kumar</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>

//         <h2 style={{ color: '#e65100' }}>Document History</h2>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
//           <Button startIcon={<Add />} onClick={addColumn}>Add Column</Button>
//           <Button startIcon={<Remove />} onClick={subtractColumn}>Subtract Column</Button>
//         </Box>
//         <Table sx={{ width: '100%', mb: 3 }}>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Version</b></TableCell>
//               <TableCell><b>Date</b></TableCell>
//               <TableCell><b>Author</b></TableCell>
//               <TableCell><b>Comments</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <TableCell>1.0</TableCell>
//               <TableCell>04-Sep-2024</TableCell>
//               <TableCell>bharat</TableCell>
//               <TableCell>Sample Report Submitted</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>1.1</TableCell>
//               <TableCell>18-Jun-2025</TableCell>
//               <TableCell>bharat</TableCell>
//               <TableCell>Sample Report Submitted</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>

//         <h2 style={{ color: '#e65100' }}>Disclaimer</h2>
//         <p>This report is solely for the information of <b>IBM</b> and should not be used, circulated, quoted or otherwise referred to for any other purpose, nor included or referred to in whole or in part in any document without our prior written consent.</p>
//         <p>The gaps identified in this report are based on the technical assessment conducted by us. We made specific efforts to verify the accuracy and authenticity of the information gathered only in those cases where it was felt necessary.</p>
//         <p>In carrying out our work and preparing the report, we have worked for <b>IBM's</b> purposes only. Consequently, we make no representation regarding the sufficiency of the procedures performed either for the purpose for which the report has been requested or for any other purpose. Further our report may not have considered issues relevant to any third parties, any use such third parties may choose to make of our report is entirely at their own risk and we shall have no responsibility whatsoever in relation to any such use.</p>
//         <p>The recommendations provided in this report should be tested in a test environment prior to implementing in the production environment.</p>

//         <h2 style={{ color: '#e65100' }}>Content</h2>

//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
//           <Button startIcon={<Add />} onClick={addColumn}>Add Column</Button>
//           <Button startIcon={<Remove />} onClick={subtractColumn}>Subtract Column</Button>
//         </Box>
//         <Table sx={{ width: '100%', border: '1px dashed #ccc' }}>
//           <TableBody>
//             <TableRow>
//               <TableCell>Introduction</TableCell>
//               <TableCell>4</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Executive Summary</TableCell>
//               <TableCell>5</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Engagement Scope</TableCell>
//               <TableCell>5</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Project Timelines</TableCell>
//               <TableCell>5</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Summary of Tools</TableCell>
//               <TableCell>5</TableCell>
//             </TableRow>
//             <TableRow>
//               <TableCell>Approach & Methodology</TableCell>
//               <TableCell>7</TableCell>
//             </TableRow>
//           </TableBody>
//         </Table>
//         </Box>

//       <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 4, bgcolor: "#fff", fontFamily: "Arial, sans-serif" }}>
//         <h2>Observation 01: Account Take Over (ATO)</h2>
//         <p><b>Severity:</b> {report.severity}</p>
//         <p><b>Status:</b> {report.status}</p>
//         <p><b>Abstract:</b> {report.abstract}</p>
//         <p><b>CWE ID/CVE ID:</b> {report.cweId}</p>
//         <p><b>Ease of Exploitation:</b> {report.easeOfExploitation}</p>
//         <p><b>Impact:</b> {report.impact}</p>

//         <h3>Applications Affected</h3>
//         <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
//           <Button startIcon={<Add />} onClick={addColumn}>Add Column</Button>
//           <Button startIcon={<Remove />} onClick={subtractColumn}>Subtract Column</Button>
//         </Box>
//         <Table sx={{ mb: 2, border: "1px solid #ccc" }}>
//           <TableHead>
//             <TableRow>
//               <TableCell><b>Application URL</b></TableCell>
//               <TableCell><b>Vulnerable Parameter</b></TableCell>
//               <TableCell><b>Actions</b></TableCell>
//               {extraColumns.map((col, idx) => (
//                 <TableCell key={col}><b>Extra Column {idx + 1}</b></TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {report.applicationUrls.map((row, index) => (
//               <TableRow key={index}>
//                 <TableCell contentEditable suppressContentEditableWarning>{row.url}</TableCell>
//                 <TableCell contentEditable suppressContentEditableWarning>{row.parameter}</TableCell>
//                 {extraColumns.map((col, colIndex) => (
//                   <TableCell
//                     key={`${index}-${col}`}
//                     contentEditable
//                     suppressContentEditableWarning
//                   >
//                     {row[col]}</TableCell>
//                 ))}
//                 <TableCell>
//                   <IconButton onClick={() => subtractRow(index)}><Remove /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>

//         <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//           <Button startIcon={<Add />} onClick={addRow}>Add Row</Button>
//           <Button startIcon={<Remove />} onClick={subtractRow}>Subtract Row</Button>
//         </Box>
//         </Box>


//         <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 4, bgcolor: "#fff", fontFamily: "Arial, sans-serif" }}>
//           <h2>Observation 02: Broken Authentication</h2>
//           <p><b>Severity:</b> Medium</p>
//           <p><b>Status:</b> Open</p>
//           <p><b>Abstract:</b> The application allows multiple invalid login attempts without rate limiting, increasing risk of brute-force attacks.</p>
//           <p><b>CWE ID/CVE ID:</b> CWE-307</p>
//           <p><b>Ease of Exploitation:</b> Easy</p>
//           <p><b>Impact:</b> Unauthorized access to user accounts may occur due to poor authentication controls.</p>

//           <h3>Applications Affected</h3>

//           <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 1 }}>
//           <Button startIcon={<Add />} onClick={addColumn}>Add Column</Button>
//           <Button startIcon={<Remove />} onClick={subtractColumn}>Subtract Column</Button>
//         </Box>
//           <Table sx={{ mb: 2, border: "1px solid #ccc" }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell><b>Application URL</b></TableCell>
//                 <TableCell><b>Vulnerable Parameter</b></TableCell>
//                 <TableCell><b>Actions</b></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               <TableRow>
//                 <TableCell contentEditable suppressContentEditableWarning>https://example.com/login</TableCell>
//                 <TableCell contentEditable suppressContentEditableWarning>username, password</TableCell>
//                 <TableCell>
//                   <IconButton><Remove /></IconButton>
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>

//           <p><b>Recommendation:</b> Implement login throttling, account lockout, and CAPTCHA to prevent automated attacks.</p>
//         </Box>
//       </Box>
//     </Container>
//   );
// }



// "use client";
// import React, { useRef, useState } from "react";
// import {
//   Box, Container, Button, Typography, IconButton, Paper, Tooltip, Divider
// } from "@mui/material";
// import {
//   Add, Remove, FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted,
//   FormatListNumbered, Image, Link as LinkIcon, FormatAlignLeft, FormatAlignCenter,
//   FormatAlignRight, Undo, Redo, Title
// } from "@mui/icons-material";
// import htmlDocx from "html-docx-js/dist/html-docx";
// import { saveAs } from "file-saver";
// import ApplicationsTable from "./ApplicationsTable";

// const defaultReportData = {
//   severity: "Critical",
//   status: "Open",
//   abstract: "Loading...",
//   cweId: "CWE-639",
//   easeOfExploitation: "Medium",
//   impact: "Loading...",
//   recommendation: "Loading...",
//   applicationUrls: [
//     { url: "https://staging.ongrid.in/portal/#/myCommunity/76148/create-invitations", parameter: "N/A" }
//   ],
//   documentDetails: [],
//   documentHistory: [],
//   contentList: []
// };

// export default function VulnReportEditor() {
//   const editorRef = useRef(null);
//   const [report, setReport] = useState(defaultReportData);
//   const [extraColumns, setExtraColumns] = useState([]);

//   const exec = (command, value = null) => {
//     document.execCommand(command, false, value);
//   };

//   const insertImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => exec("insertImage", reader.result);
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   const createLink = () => {
//     const url = prompt("Enter URL:");
//     if (url) exec("createLink", url);
//   };

//   const handleDownload = () => {
//     const content = editorRef.current?.innerHTML || "";
//     const blob = htmlDocx.asBlob(content);
//     saveAs(blob, "vuln-report.docx");
//   };

//   const handleRowOps = (field, type, index = null) => {
//     setReport(prev => {
//       const updated = [...prev[field]];
//       if (type === "add") {
//         const newRow = {};
//         const keys = Object.keys(updated[0] || { col1: "", col2: "" });
//         keys.forEach(k => newRow[k] = "");
//         updated.push(newRow);
//       } else if (type === "remove" && index !== null) {
//         updated.splice(index, 1);
//       }
//       return { ...prev, [field]: updated };
//     });
//   };

//   const addColumn = () => {
//     const colIndex = extraColumns.length;
//     const newCol = `extra_${colIndex}`;
//     setExtraColumns([...extraColumns, newCol]);
//     setReport(prev => ({
//       ...prev,
//       applicationUrls: prev.applicationUrls.map(row => ({ ...row, [newCol]: "" }))
//     }));
//   };

//   const subtractColumn = () => {
//     if (extraColumns.length === 0) return;
//     const colToRemove = extraColumns[extraColumns.length - 1];
//     const isColumnEmpty = report.applicationUrls.every(row => !row[colToRemove]?.trim());
//     if (isColumnEmpty) {
//       setExtraColumns(cols => cols.slice(0, -1));
//       setReport(prev => ({
//         ...prev,
//         applicationUrls: prev.applicationUrls.map(row => {
//           const updated = { ...row };
//           delete updated[colToRemove];
//           return updated;
//         })
//       }));
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ my: 4 }}>
//       {/* Download Button */}
//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <Button variant="contained" onClick={handleDownload}>Download as DOCX</Button>
//       </Box>

//       {/* Scroll Index */}
//       <Box sx={{ mb: 3 }}>
//         <Typography variant="h6" gutterBottom>Index</Typography>
//         <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//           <Button size="small" variant="outlined" onClick={() => document.getElementById('document-details')?.scrollIntoView({ behavior: 'smooth' })}>Document Details</Button>
//           <Button size="small" variant="outlined" onClick={() => document.getElementById('document-history')?.scrollIntoView({ behavior: 'smooth' })}>Document History</Button>
//           <Button size="small" variant="outlined" onClick={() => document.getElementById('disclaimer')?.scrollIntoView({ behavior: 'smooth' })}>Disclaimer</Button>
//           <Button size="small" variant="outlined" onClick={() => document.getElementById('content')?.scrollIntoView({ behavior: 'smooth' })}>Content</Button>
//           <Button size="small" variant="outlined" onClick={() => document.getElementById('observation-01')?.scrollIntoView({ behavior: 'smooth' })}>Observation 01</Button>
//           <Button size="small" variant="outlined" onClick={() => document.getElementById('observation-02')?.scrollIntoView({ behavior: 'smooth' })}>Observation 02</Button>
//         </Box>
//       </Box>

//       {/* Editor Toolbar */}
//       <Paper elevation={3} sx={{ p: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//         <Tooltip title="Paragraph"><IconButton onClick={() => exec("formatBlock", "<p>")}> <Title fontSize="small" /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Unordered List"><IconButton onClick={() => exec("insertUnorderedList")}> <FormatListBulleted /> </IconButton></Tooltip>
//         <Tooltip title="Ordered List"><IconButton onClick={() => exec("insertOrderedList")}> <FormatListNumbered /> </IconButton></Tooltip>
//         <Tooltip title="Insert Image"><IconButton onClick={insertImage}> <Image /> </IconButton></Tooltip>
//         <Tooltip title="Insert Link"><IconButton onClick={createLink}> <LinkIcon /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Bold"><IconButton onClick={() => exec("bold")}> <FormatBold /> </IconButton></Tooltip>
//         <Tooltip title="Italic"><IconButton onClick={() => exec("italic")}> <FormatItalic /> </IconButton></Tooltip>
//         <Tooltip title="Underline"><IconButton onClick={() => exec("underline")}> <FormatUnderlined /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Align Left"><IconButton onClick={() => exec("justifyLeft")}> <FormatAlignLeft /> </IconButton></Tooltip>
//         <Tooltip title="Align Center"><IconButton onClick={() => exec("justifyCenter")}> <FormatAlignCenter /> </IconButton></Tooltip>
//         <Tooltip title="Align Right"><IconButton onClick={() => exec("justifyRight")}> <FormatAlignRight /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Undo"><IconButton onClick={() => exec("undo")}> <Undo /> </IconButton></Tooltip>
//         <Tooltip title="Redo"><IconButton onClick={() => exec("redo")}> <Redo /> </IconButton></Tooltip>
//       </Paper>

//       {/* Editable Content Area */}
//       <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 4, bgcolor: "#fff", fontFamily: "Arial, sans-serif" }}>
//         <h2 id="document-details" style={{ color: '#e65100' }}>Document Details</h2>
//         <ApplicationsTable
//           columns={["label", "value"]}
//           rows={report.documentDetails}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("documentDetails", "add")}
//           onSubtractRow={(i) => handleRowOps("documentDetails", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="document-history" style={{ color: '#e65100' }}>Document History</h2>
//         <ApplicationsTable
//           columns={["version", "date", "author", "comments"]}
//           rows={report.documentHistory}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("documentHistory", "add")}
//           onSubtractRow={(i) => handleRowOps("documentHistory", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="disclaimer" style={{ color: '#e65100' }}>Disclaimer</h2>
//         <p>This report is solely for the information of <b>IBM</b>...</p>

//         <h2 id="content" style={{ color: '#e65100' }}>Content</h2>
//         <ApplicationsTable
//           columns={["section", "page"]}
//           rows={report.contentList}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("contentList", "add")}
//           onSubtractRow={(i) => handleRowOps("contentList", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="observation-01">Observation 01: Account Take Over (ATO)</h2>
//         <p><b>Severity:</b> {report.severity}</p>
//         <p><b>Status:</b> {report.status}</p>
//         <p><b>Abstract:</b> {report.abstract}</p>
//         <p><b>CWE ID/CVE ID:</b> {report.cweId}</p>
//         <p><b>Ease of Exploitation:</b> {report.easeOfExploitation}</p>
//         <p><b>Impact:</b> {report.impact}</p>

//         <h3>Applications Affected</h3>
//         <ApplicationsTable
//           columns={["url", "parameter"]}
//           rows={report.applicationUrls}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("applicationUrls", "add")}
//           onSubtractRow={(i) => handleRowOps("applicationUrls", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="observation-02">Observation 02: Broken Authentication</h2>
//         <p><b>Severity:</b> Medium</p>
//         <p><b>Status:</b> Open</p>
//         <p><b>Abstract:</b> Multiple invalid login attempts allowed without rate limiting</p>
//         <p><b>CWE ID/CVE ID:</b> CWE-307</p>
//         <p><b>Ease of Exploitation:</b> Easy</p>
//         <p><b>Impact:</b> May allow brute force attacks on login</p>

//         <h3>Applications Affected</h3>
//         <ApplicationsTable
//           columns={["url", "parameter"]}
//           rows={report.applicationUrls}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("applicationUrls", "add")}
//           onSubtractRow={(i) => handleRowOps("applicationUrls", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <p><b>Recommendation:</b> Implement CAPTCHA, account lockout, rate limiting</p>
//       </Box>
//     </Container>
//   );
// }


// "use client";
// import React, { useRef, useState } from "react";
// import {
//   Box, Container, Button, Typography, IconButton, Paper, Tooltip, Divider
// } from "@mui/material";
// import {
//   FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted,
//   FormatListNumbered, Image, Link as LinkIcon, FormatAlignLeft, FormatAlignCenter,
//   FormatAlignRight, Undo, Redo, Title
// } from "@mui/icons-material";
// import htmlDocx from "html-docx-js/dist/html-docx";
// import { saveAs } from "file-saver";
// import ApplicationsTable from "./ApplicationsTable";
// import ReportSidebar from "./ReportSidebar";

// const defaultReportData = {
//   severity: "Critical",
//   status: "Open",
//   abstract: "Loading...",
//   cweId: "CWE-639",
//   easeOfExploitation: "Medium",
//   impact: "Loading...",
//   recommendation: "Loading...",
//   applicationUrls: [
//     { url: "https://staging.ongrid.in/portal/#/myCommunity/76148/create-invitations", parameter: "N/A" }
//   ],
//   documentDetails: [],
//   documentHistory: [],
//   contentList: []
// };

// export default function VulnReportEditor() {
//   const editorRef = useRef(null);
//   const [report, setReport] = useState(defaultReportData);
//   const [extraColumns, setExtraColumns] = useState([]);
//   const [isSidebarOpen, setSidebarOpen] = useState(false);
//   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

//   const exec = (command, value = null) => {
//     document.execCommand(command, false, value);
//   };

//   const insertImage = () => {
//     const input = document.createElement("input");
//     input.type = "file";
//     input.accept = "image/*";
//     input.onchange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = () => exec("insertImage", reader.result);
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   const createLink = () => {
//     const url = prompt("Enter URL:");
//     if (url) exec("createLink", url);
//   };

//   const handleDownload = () => {
//     const content = editorRef.current?.innerHTML || "";
//     const blob = htmlDocx.asBlob(content);
//     saveAs(blob, "vuln-report.docx");
//   };

//   const handleRowOps = (field, type, index = null) => {
//     setReport(prev => {
//       const updated = [...prev[field]];
//       if (type === "add") {
//         const newRow = {};
//         const keys = Object.keys(updated[0] || { col1: "", col2: "" });
//         keys.forEach(k => newRow[k] = "");
//         updated.push(newRow);
//       } else if (type === "remove" && index !== null) {
//         updated.splice(index, 1);
//       }
//       return { ...prev, [field]: updated };
//     });
//   };

//   const addColumn = () => {
//     const colIndex = extraColumns.length;
//     const newCol = `extra_${colIndex}`;
//     setExtraColumns([...extraColumns, newCol]);
//     setReport(prev => ({
//       ...prev,
//       applicationUrls: prev.applicationUrls.map(row => ({ ...row, [newCol]: "" }))
//     }));
//   };

//   const subtractColumn = () => {
//     if (extraColumns.length === 0) return;
//     const colToRemove = extraColumns[extraColumns.length - 1];
//     const isColumnEmpty = report.applicationUrls.every(row => !row[colToRemove]?.trim());
//     if (isColumnEmpty) {
//       setExtraColumns(cols => cols.slice(0, -1));
//       setReport(prev => ({
//         ...prev,
//         applicationUrls: prev.applicationUrls.map(row => {
//           const updated = { ...row };
//           delete updated[colToRemove];
//           return updated;
//         })
//       }));
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ my: 4 }}>
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Button variant="contained" onClick={handleDownload}>Download as DOCX</Button>
//         <Button variant="outlined" onClick={toggleSidebar}>Index</Button>
//       </Box>

//       <Paper elevation={3} sx={{ p: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
//         <Tooltip title="Paragraph"><IconButton onClick={() => exec("formatBlock", "<p>")}> <Title fontSize="small" /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Unordered List"><IconButton onClick={() => exec("insertUnorderedList")}> <FormatListBulleted /> </IconButton></Tooltip>
//         <Tooltip title="Ordered List"><IconButton onClick={() => exec("insertOrderedList")}> <FormatListNumbered /> </IconButton></Tooltip>
//         <Tooltip title="Insert Image"><IconButton onClick={insertImage}> <Image /> </IconButton></Tooltip>
//         <Tooltip title="Insert Link"><IconButton onClick={createLink}> <LinkIcon /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Bold"><IconButton onClick={() => exec("bold")}> <FormatBold /> </IconButton></Tooltip>
//         <Tooltip title="Italic"><IconButton onClick={() => exec("italic")}> <FormatItalic /> </IconButton></Tooltip>
//         <Tooltip title="Underline"><IconButton onClick={() => exec("underline")}> <FormatUnderlined /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Align Left"><IconButton onClick={() => exec("justifyLeft")}> <FormatAlignLeft /> </IconButton></Tooltip>
//         <Tooltip title="Align Center"><IconButton onClick={() => exec("justifyCenter")}> <FormatAlignCenter /> </IconButton></Tooltip>
//         <Tooltip title="Align Right"><IconButton onClick={() => exec("justifyRight")}> <FormatAlignRight /> </IconButton></Tooltip>
//         <Divider orientation="vertical" flexItem />
//         <Tooltip title="Undo"><IconButton onClick={() => exec("undo")}> <Undo /> </IconButton></Tooltip>
//         <Tooltip title="Redo"><IconButton onClick={() => exec("redo")}> <Redo /> </IconButton></Tooltip>
//       </Paper>

//       <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 4, bgcolor: "#fff" }}>
//         <h2 id="document-details">Document Details</h2>
//         <ApplicationsTable
//           columns={["label", "value"]}
//           rows={report.documentDetails}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("documentDetails", "add")}
//           onSubtractRow={(i) => handleRowOps("documentDetails", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="document-history">Document History</h2>
//         <ApplicationsTable
//           columns={["version", "date", "author", "comments"]}
//           rows={report.documentHistory}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("documentHistory", "add")}
//           onSubtractRow={(i) => handleRowOps("documentHistory", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="disclaimer">Disclaimer</h2>
//         <p>This report is solely for the information of <b>IBM</b>...</p>

//         <h2 id="content">Content</h2>
//         <ApplicationsTable
//           columns={["section", "page"]}
//           rows={report.contentList}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("contentList", "add")}
//           onSubtractRow={(i) => handleRowOps("contentList", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="observation-01">Observation 01: Account Take Over (ATO)</h2>
//         <p><b>Severity:</b> {report.severity}</p>
//         <p><b>Status:</b> {report.status}</p>
//         <p><b>Abstract:</b> {report.abstract}</p>
//         <p><b>CWE ID/CVE ID:</b> {report.cweId}</p>
//         <p><b>Ease of Exploitation:</b> {report.easeOfExploitation}</p>
//         <p><b>Impact:</b> {report.impact}</p>

//         <h3>Applications Affected</h3>
//         <ApplicationsTable
//           columns={["url", "parameter"]}
//           rows={report.applicationUrls}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("applicationUrls", "add")}
//           onSubtractRow={(i) => handleRowOps("applicationUrls", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <h2 id="observation-02">Observation 02: Broken Authentication</h2>
//         <p><b>Severity:</b> Medium</p>
//         <p><b>Status:</b> Open</p>
//         <p><b>Abstract:</b> Multiple invalid login attempts allowed without rate limiting</p>
//         <p><b>CWE ID/CVE ID:</b> CWE-307</p>
//         <p><b>Ease of Exploitation:</b> Easy</p>
//         <p><b>Impact:</b> May allow brute force attacks on login</p>

//         <h3>Applications Affected</h3>
//         <ApplicationsTable
//           columns={["url", "parameter"]}
//           rows={report.applicationUrls}
//           editable={true}
//           showControls={true}
//           extraColumns={extraColumns}
//           onAddRow={() => handleRowOps("applicationUrls", "add")}
//           onSubtractRow={(i) => handleRowOps("applicationUrls", "remove", i)}
//           onAddCol={addColumn}
//           onSubtractCol={subtractColumn}
//         />

//         <p><b>Recommendation:</b> Implement CAPTCHA, account lockout, rate limiting</p>
//       </Box>

//       <ReportSidebar open={isSidebarOpen} onClose={toggleSidebar} />
//     </Container>
//   );
// }

"use client";
import React, { useRef, useState } from "react";
import {
  Box, Container, Button, Typography, IconButton, Paper, Tooltip, Divider
} from "@mui/material";
import {
  FormatBold, FormatItalic, FormatUnderlined, FormatListBulleted,
  FormatListNumbered, Image, Link as LinkIcon, FormatAlignLeft, FormatAlignCenter,
  FormatAlignRight, Undo, Redo, Title
} from "@mui/icons-material";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";
import ApplicationsTable from "./ApplicationsTable";
import ReportSidebar from "./ReportSidebar";

const defaultReportData = {
  severity: "Critical",
  status: "Open",
  abstract: "Loading...",
  cweId: "CWE-639",
  easeOfExploitation: "Medium",
  impact: "Loading...",
  recommendation: "Loading...",
  applicationUrls: [
    { url: "https://staging.ongrid.in/portal/#/myCommunity/76148/create-invitations", parameter: "N/A" }
  ],
  documentDetails: [],
  documentHistory: [],
  contentList: []
};

function renderTOCWithNumbers(items, level = 0, prefix = "") {
  return items.map((item, index) => {
    const numberPrefix = prefix ? `${prefix}.${index + 1}` : `${index + 1}`;
    const indent = level * 20;

    const content = `${numberPrefix}. ${item.label}`;
    const page = item.page || "";
    const dotCount = Math.max(10, 100 - indent - content.length - String(page).length);
    const dots = ".".repeat(dotCount);

    return (
      <div key={content}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          paddingLeft: `${indent}px`,
          whiteSpace: "nowrap",
          margin: "2px 0"
        }}>
          <span>{content} {dots}</span>
          <span>{page}</span>
        </div>
        {item.children && renderTOCWithNumbers(item.children, level + 1, numberPrefix)}
      </div>
    );
  });
}


export default function VulnReportEditor() {
  const editorRef = useRef(null);
  const [report, setReport] = useState(defaultReportData);
  const [extraColumnsMap, setExtraColumnsMap] = useState({
    documentDetails: [],
    documentHistory: [],
    contentList: [],
    applicationUrls: []
  });
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

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
        reader.onload = () => exec("insertImage", reader.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const createLink = () => {
    const url = prompt("Enter URL:");
    if (url) exec("createLink", url);
  };

  const handleDownload = () => {
    const content = editorRef.current?.innerHTML || "";
    const blob = htmlDocx.asBlob(content);
    saveAs(blob, "vuln-report.docx");
  };

  const handleRowOps = (field, type, index = null) => {
    setReport(prev => {
      const updated = [...prev[field]];
      if (type === "add") {
        const newRow = {};
        const keys = Object.keys(updated[0] || { col1: "", col2: "" });
        keys.forEach(k => newRow[k] = "");
        updated.push(newRow);
      } else if (type === "remove" && index !== null) {
        updated.splice(index, 1);
      }
      return { ...prev, [field]: updated };
    });
  };

  const addColumn = (field) => {
    setExtraColumnsMap(prev => {
      const newCols = [...prev[field], `extra_${prev[field].length}`];
      const updatedRows = report[field].map(row => {
        const newRow = { ...row, [newCols[newCols.length - 1]]: "" };
        return newRow;
      });
      setReport(prevReport => ({ ...prevReport, [field]: updatedRows }));
      return { ...prev, [field]: newCols };
    });
  };

  const subtractColumn = (field) => {
    setExtraColumnsMap(prev => {
      const cols = prev[field];
      if (cols.length === 0) return prev;
      const colToRemove = cols[cols.length - 1];
      const isColumnEmpty = report[field].every(row => !row[colToRemove]?.trim());

      if (!isColumnEmpty) return prev;

      const updatedRows = report[field].map(row => {
        const newRow = { ...row };
        delete newRow[colToRemove];
        return newRow;
      });

      setReport(prevReport => ({ ...prevReport, [field]: updatedRows }));
      return { ...prev, [field]: cols.slice(0, -1) };
    });
  };
  

  return (
    <>
      <Box sx={{
        position: "sticky",
        top: 0,
        zIndex: 1200,
        bgcolor: "#fff",
        py: 0,
        mb: 0,
        borderBottom: "1px solid #ddd"
      }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" onClick={handleDownload}>Download as DOCX</Button>
          <Button variant="outlined" onClick={toggleSidebar}>Index</Button>
        </Box>

        <Paper elevation={3} sx={{ p: 0, display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
          <Tooltip title="Paragraph"><IconButton onClick={() => exec("formatBlock", "<p>")}> <Title fontSize="small" /> </IconButton></Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Unordered List"><IconButton onClick={() => exec("insertUnorderedList")}> <FormatListBulleted /> </IconButton></Tooltip>
          <Tooltip title="Ordered List"><IconButton onClick={() => exec("insertOrderedList")}> <FormatListNumbered /> </IconButton></Tooltip>
          <Tooltip title="Insert Image"><IconButton onClick={insertImage}> <Image /> </IconButton></Tooltip>
          <Tooltip title="Insert Link"><IconButton onClick={createLink}> <LinkIcon /> </IconButton></Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Bold"><IconButton onClick={() => exec("bold")}> <FormatBold /> </IconButton></Tooltip>
          <Tooltip title="Italic"><IconButton onClick={() => exec("italic")}> <FormatItalic /> </IconButton></Tooltip>
          <Tooltip title="Underline"><IconButton onClick={() => exec("underline")}> <FormatUnderlined /> </IconButton></Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Align Left"><IconButton onClick={() => exec("justifyLeft")}> <FormatAlignLeft /> </IconButton></Tooltip>
          <Tooltip title="Align Center"><IconButton onClick={() => exec("justifyCenter")}> <FormatAlignCenter /> </IconButton></Tooltip>
          <Tooltip title="Align Right"><IconButton onClick={() => exec("justifyRight")}> <FormatAlignRight /> </IconButton></Tooltip>
          <Divider orientation="vertical" flexItem />
          <Tooltip title="Undo"><IconButton onClick={() => exec("undo")}> <Undo /> </IconButton></Tooltip>
          <Tooltip title="Redo"><IconButton onClick={() => exec("redo")}> <Redo /> </IconButton></Tooltip>
        </Paper>
      </Box>
      <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 0.5, bgcolor: "#fff" }}>

      <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 0.5, bgcolor: "#fff" }}>
        <h2 id="document-details">Document Details</h2>
        <ApplicationsTable
          columns={["label", "value"]}
          rows={report.documentDetails}
          editable={true}
          showControls={true}
          extraColumns={extraColumnsMap.documentDetails}
          onAddRow={() => handleRowOps("documentDetails", "add")}
          onSubtractRow={(i) => handleRowOps("documentDetails", "remove", i)}
          onAddCol={() => addColumn("documentDetails")}
          onSubtractCol={() => subtractColumn("documentDetails")}
        />

        <h2 id="document-history">Document History</h2>
        <ApplicationsTable
          columns={["version", "date", "author", "comments"]}
          rows={report.documentHistory}
          editable={true}
          showControls={true}
          extraColumns={extraColumnsMap.documentHistory}
          onAddRow={() => handleRowOps("documentHistory", "add")}
          onSubtractRow={(i) => handleRowOps("documentHistory", "remove", i)}
          onAddCol={() => addColumn("documentHistory")}
          onSubtractCol={() => subtractColumn("documentHistory")}
        />

        <h2 id="disclaimer">Disclaimer</h2>
        <p>This report is solely for the information of <b>IBM</b>...</p>

        <h2 id="content">Content</h2>
        <ApplicationsTable
          columns={["section", "page"]}
          rows={report.contentList}
          editable={true}
          showControls={true}
          extraColumns={extraColumnsMap.contentList}
          onAddRow={() => handleRowOps("contentList", "add")}
          onSubtractRow={(i) => handleRowOps("contentList", "remove", i)}
          onAddCol={() => addColumn("contentList")}
          onSubtractCol={() => subtractColumn("contentList")}
        />
      </Box>

   <Box
  sx={{
    border: "1px solid #ccc",
    borderRadius: 2,
    p: 3,
    mt: 4,
    bgcolor: "#fff",
    fontFamily: "Arial, sans-serif",
  }}
  contentEditable
  suppressContentEditableWarning
>
  <h2 style={{
    color: "#f57c00",
    borderBottom: "2px solid #f57c00",
    display: "inline-block",
    paddingBottom: "4px"
  }}>
    Content
  </h2>

  <div style={{ marginTop: "1.5rem" }}>
    {renderTOCWithNumbers([
      {
        label: "Introduction",
        page: "4"
      },
      {
        label: "Executive Summary",
        children: [
          { label: "Engagement Scope", page: "5" },
          { label: "Project Timelines", page: "5" },
          { label: "Summary of Tools", page: "5" },
          { label: "Approach & Methodology", page: "7" },
          { label: "Findings & Recommendations Summary", page: "9" },
        ]
      },
      {
        label: "Detailed Technical Findings",
        children: [
          { label: "List of Test Cases", page: "11" },
          {
            label: "Vulnerability Discovery Phase",
            children: [
              { label: "Observation 1: Observation1", page: "pn" },
              { label: "Observation 2: Observation2", page: "pn" },
            ]
          },
          {
            label: "Proof of Concept",
            page: "14",
            children: [
              { label: "Observation 1: Observation1", page: "pn" },
              { label: "Observation 2: Observation2", page: "20" },
            ]
          },
        ]
      },
      {
        label: "Client Remark’s",
        page: "25"
      },
      {
        label: "Tester’s Notes",
        page: "26"
      },
      {
        label: "Conclusion",
        page: "27"
      }
    ])}
  </div>
</Box>

      <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 0.5, bgcolor: "#fff" }}>
        <h2 id="observation-01">Observation 01: Account Take Over (ATO)</h2>
        <p><b>Severity:</b> {report.severity}</p>
        <p><b>Status:</b> {report.status}</p>
        <p><b>Abstract:</b> {report.abstract}</p>
        <p><b>CWE ID/CVE ID:</b> {report.cweId}</p>
        <p><b>Ease of Exploitation:</b> {report.easeOfExploitation}</p>
        <p><b>Impact:</b> {report.impact}</p>

        <h3>Applications Affected</h3>
        <ApplicationsTable
          columns={["url", "parameter"]}
          rows={report.applicationUrls}
          editable={true}
          showControls={true}
          extraColumns={extraColumnsMap.applicationUrls}
          onAddRow={() => handleRowOps("applicationUrls", "add")}
          onSubtractRow={(i) => handleRowOps("applicationUrls", "remove", i)}
          onAddCol={() => addColumn("applicationUrls")}
          onSubtractCol={() => subtractColumn("applicationUrls")}
        />
      </Box>

       <Box ref={editorRef} contentEditable suppressContentEditableWarning sx={{ border: "1px solid #ccc", borderRadius: 2, p: 3, mt: 0.5, bgcolor: "#fff" }}>
        <h2 id="observation-02">Observation 02: Broken Authentication</h2>
        <p><b>Severity:</b> Medium</p>
        <p><b>Status:</b> Open</p>
        <p><b>Abstract:</b> Multiple invalid login attempts allowed without rate limiting</p>
        <p><b>CWE ID/CVE ID:</b> CWE-307</p>
        <p><b>Ease of Exploitation:</b> Easy</p>
        <p><b>Impact:</b> May allow brute force attacks on login</p>

        <h3>Applications Affected</h3>
        <ApplicationsTable
          columns={["url", "parameter"]}
          rows={report.applicationUrls}
          editable={true}
          showControls={true}
          extraColumns={extraColumnsMap.applicationUrls}
          onAddRow={() => handleRowOps("applicationUrls", "add")}
          onSubtractRow={(i) => handleRowOps("applicationUrls", "remove", i)}
          onAddCol={() => addColumn("applicationUrls")}
          onSubtractCol={() => subtractColumn("applicationUrls")}
        />

        <p><b>Recommendation:</b> Implement CAPTCHA, account lockout, rate limiting</p>
        </Box>
      </Box>
      <ReportSidebar open={isSidebarOpen} onClose={toggleSidebar} />
    </>
  );
}
