// 'use client';

// import {
//   Box,
//   Button,
//   Chip,
//   IconButton,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Tooltip,
//   Typography,
//   darken,
// } from '@mui/material';
// import {
//   IconArrowsSort,
//   IconSortAscending2,
//   IconSortDescending2,
//   IconTrash,
// } from '@tabler/icons-react';
// import * as React from 'react';
// import {
//   createColumnHelper,
//   flexRender,
//   getCoreRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import { useTheme } from '@emotion/react';
// import toast from 'react-hot-toast';
// import { deleteSemgrepReportAPI } from '@/axios/apis';

// const columnHelper = createColumnHelper();

// const SemgrepFileTable = ({ tableData, title = 'Files Table', onFileClick, onDeleteSuccess }) => {
//   const theme = useTheme();

//   const handleDelete = async (data) => {
//     toast.dismiss();
//     toast((t) => (
//       <div>
//         <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
//           Are you sure you want to delete this data?
//         </Typography>
//         <Box display="flex" justifyContent="space-between">
//           <Button
//             variant="outlined"
//             color="error"
//             size="small"
//             onClick={async () => {
//               try {
//                 const response = await deleteSemgrepReportAPI(data.id);
//                 if (response.status === 200) {
//                   toast.success(
//                     typeof response.data === 'string'
//                       ? response.data
//                       : response.data?.message || 'Data deleted successfully.'
//                   );
//                   onDeleteSuccess?.(data.id); // ✅ Update parent state
//                 } else {
//                   toast.error(
//                     typeof response.data === 'string'
//                       ? response.data
//                       : response.data?.message || 'Failed to delete data.'
//                   );
//                 }
//               } catch (error) {
//                 console.error(error.message);
//                 toast.error('Failed to delete the data.');
//               }
//               toast.dismiss(t.id);
//             }}
//           >
//             Confirm
//           </Button>
//           <Button variant="outlined" color="secondary" size="small" onClick={() => toast.dismiss(t.id)}>
//             Cancel
//           </Button>
//         </Box>
//       </div>
//     ), { duration: Infinity });
//   };

//   const columns = [

// columnHelper.accessor('fileName', {
//   header: 'File Name',
//   cell: (info) => {
//     const row = info.row.original;
//     const isDisabled = row.status?.toUpperCase() !== 'COMPLETED';

//     return (
//       <Tooltip title={isDisabled ? 'Scan not completed yet' : 'Click to download report'}>
//         <span>
//           <Typography
//             component="button"
//             onClick={() => {
//               if (!isDisabled) {
//                 info.table.options.meta?.onFileClick?.(row.id);
//               }
//             }}
//             disabled={isDisabled}
//             sx={{
//               color: isDisabled ? 'grey' : '#1976d2',
//               background: 'none',
//               border: 'none',
//               padding: 0,
//               margin: 0,
//               cursor: isDisabled ? 'not-allowed' : 'pointer',
//               textDecoration: isDisabled ? 'none' : 'underline',
//               font: 'inherit',
//               '&:hover': {
//                 color: isDisabled ? 'grey' : '#ff784e',
//               },
//             }}
//           >
//             {info.getValue()}
//           </Typography>
//         </span>
//       </Tooltip>
//     );
//   },
// }),



//     columnHelper.accessor('fileType', {
//       header: 'File Type',
//       cell: (info) => (
//         <Chip label={info.getValue()?.toUpperCase() || 'N/A'} color="primary" size="small" />
//       ),
//     }),
//     columnHelper.accessor('status', {
//       header: 'Status',
//       cell: (info) => {
//         const status = info.getValue()?.toUpperCase() || 'N/A';
//         const getColor = () => {
//           if (status === 'COMPLETED') return theme.palette.success;
//           if (status === 'FAILED') return theme.palette.error;
//           return theme.palette.warning;
//         };
//         const color = getColor();

//         return (
//           <Chip
//             size="small"
//             label={status}
//             sx={{
//               fontSize: '.7rem',
//               bgcolor: color.light,
//               color: color.main,
//               borderRadius: '2px',
//             }}
//           />
//         );
//       },
//     }),
//     columnHelper.accessor('dateTime', {
//       header: 'Date & Time',
//       cell: (info) => <Typography variant="body2">{info.getValue() || 'N/A'}</Typography>,
//     }),
//     columnHelper.display({
//       id: 'actions',
//       header: 'Action',
//       cell: (info) => (
//         <Box display="flex" gap={1}>
//           <IconButton size="small" color="error" onClick={() => handleDelete(info.row.original)}>
//             <IconTrash size={16} />
//           </IconButton>
//         </Box>
//       ),
//     }),
//   ];

//   const table = useReactTable({
//     data: tableData,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     meta: {
//       onFileClick,
//     },
//   });

//   return (
//     <TableContainer sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
//       <Table sx={{ minWidth: 650 }} size="small">
//         {/* Title Row */}
//         <TableHead>
//           <TableRow>
//             <TableCell
//               colSpan={columns.length}
//               sx={{
//                 backgroundColor: darken(theme.palette.primary.light, 0.2),
//                 color: theme.palette.primary.contrastText,
//                 fontWeight: 700,
//                 fontSize: '16px',
//                 py: 1.5,
//               }}
//             >
//               {title}
//             </TableCell>
//           </TableRow>
//         </TableHead>

//         {/* Column Headers */}
//         <TableHead>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <TableCell
//                   key={header.id}
//                   onClick={header.column.getToggleSortingHandler()}
//                   sx={{
//                     cursor: header.column.getCanSort() ? 'pointer' : 'default',
//                     fontWeight: 600,
//                     backgroundColor: theme.palette.background.paper,
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     {flexRender(header.column.columnDef.header, header.getContext())}
//                     {header.column.getCanSort() && (
//                       <Box ml={1}>
//                         {header.column.getIsSorted() === 'asc' ? (
//                           <IconSortAscending2 size={16} />
//                         ) : header.column.getIsSorted() === 'desc' ? (
//                           <IconSortDescending2 size={16} />
//                         ) : (
//                           <IconArrowsSort size={16} />
//                         )}
//                       </Box>
//                     )}
//                   </Box>
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableHead>

//         {/* Table Rows */}
//         <TableBody>
//           {table.getRowModel().rows.map((row) => (
//             <TableRow key={row.id} hover>
//               {row.getVisibleCells().map((cell) => (
//                 <TableCell key={cell.id}>
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}

//           {table.getRowModel().rows.length === 0 && (
//             <TableRow>
//               <TableCell colSpan={columns.length} align="center">
//                 <Typography variant="body2">No files found</Typography>
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SemgrepFileTable;
