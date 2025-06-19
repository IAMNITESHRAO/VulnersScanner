'use client';

import React from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  darken,
  Checkbox,
  Paper,
} from '@mui/material';
import {
  IconArrowsSort,
  IconSortAscending2,
  IconSortDescending2,
  IconTrash,
} from '@tabler/icons-react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTheme } from '@emotion/react';
import toast from 'react-hot-toast';
import { deleteAllSnykReportAPI } from '@/axios/apis';   // ✅ bulk‑delete API

/* ---------- Indeterminate checkbox ---------- */
function IndeterminateCheckbox({ indeterminate, ...rest }) {
  return <Checkbox indeterminate={indeterminate} size="small" {...rest} />;
}

const columnHelper = createColumnHelper();

/* ------------------------------------------------------------------ */
/*                             FileTable                              */
/* ------------------------------------------------------------------ */
const FileTable = ({
  tableData = [],
  title = 'Files Table',
  onFileClick,
  onDelete,               // parent callback (optional)
  onRowSelectionChange,   // optional row‑selection callback
}) => {
  const theme = useTheme();
  const [rowSelection, setRowSelection] = React.useState({});

  /* ------------ Single‑row delete (uses bulk API) ----------------- */
  const confirmAndDeleteIds = (ids) => {
    toast.dismiss();
    toast(
      (t) => (
        <div>
          <Typography variant="body2" sx={{ mb: 1, textAlign: 'center' }}>
            {ids.length > 1
              ? `Delete ${ids.length} selected reports?`
              : 'Are you sure you want to delete this report?'}
          </Typography>

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={async () => {
                try {
                  await onDelete(ids);               // ✅ parent does the API
                  toast.success('Reports deleted');
                  if (ids.length > 1) setRowSelection({});
                } catch (err) {
                  toast.error('Delete failed');
                }
                toast.dismiss(t.id);
              }}
            >
              Confirm
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
          </Box>
        </div>
      ),
      { duration: Infinity }
    );
  };

  /* -------------------- Column definitions ------------------------ */
  const columns = React.useMemo(() => [
    // ☐ Selection column
    columnHelper.display({
      id: 'selection',
      header: ({ table }) => (
        <IndeterminateCheckbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
      size: 10,
    }),

    // 📄 File name
    columnHelper.accessor('fileName', {
      header: 'File Name',
      cell: (info) => {
        const row = info.row.original;
        const isDisabled = row.status?.toUpperCase() !== 'COMPLETED';

        return (
          <Tooltip title={isDisabled ? 'Scan not completed yet' : 'Click to download report'}>
            <span>
              <Typography
                component="button"
                onClick={() => !isDisabled && info.table.options.meta?.onFileClick?.(row.id)}
                disabled={isDisabled}
                sx={{
                  color: isDisabled ? 'grey' : '#1976d2',
                  background: 'none',
                  border: 'none',
                  p: 0,
                  m: 0,
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  textDecoration: isDisabled ? 'none' : 'underline',
                  font: 'inherit',
                  '&:hover': { color: isDisabled ? 'grey' : '#ff784e' },
                }}
              >
                {info.getValue()}
              </Typography>
            </span>
          </Tooltip>
        );
      },
    }),

    // 🏷️ File type
    columnHelper.accessor('fileType', {
      header: 'File Type',
      cell: (info) => (
        <Chip label={(info.getValue() || 'N/A').toUpperCase()} color="primary" size="small" />
      ),
    }),

    // 🚦 Status
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = (info.getValue() || 'N/A').toUpperCase();
        const clr =
          status === 'COMPLETED'
            ? theme.palette.success
            : status === 'FAILED'
              ? theme.palette.error
              : theme.palette.warning;

        return (
          <Chip
            size="small"
            label={status}
            sx={{ fontSize: '.7rem', bgcolor: clr.light, color: clr.main, borderRadius: '2px' }}
          />
        );
      },
    }),

    // 🕒 Date & Time
    columnHelper.accessor('dateTime', {
      header: 'Date & Time',
      cell: (info) => <Typography variant="body2">{info.getValue() || 'N/A'}</Typography>,
    }),

    // 🗑️ Actions
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: (info) => (
        <IconButton
          size="small"
          color="error"
          onClick={() => confirmAndDeleteIds([info.row.original.id])}
        >
          <IconTrash size={16} />
        </IconButton>
      ),
    }),
  ], [theme]);

  /* --------------------- React‑Table instance --------------------- */
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    onRowSelectionChange: (updater) => {
      const newState = typeof updater === 'function' ? updater(rowSelection) : updater;
      setRowSelection(newState);
      onRowSelectionChange?.(newState, table.getSelectedRowModel().rows);
    },
    state: { rowSelection },
    meta: { onFileClick },
  });

  /* ---------------------------- UI -------------------------------- */
  const selectedIds = table.getSelectedRowModel().rows.map((r) => r.original.id);

  return (
    <TableContainer component={Paper} sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 3 }}>
      <Table size="small" sx={{ minWidth: 650 }}>
        {/* Title + Delete Selected button */}
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={columns.length}
              sx={{
                backgroundColor: darken(theme.palette.primary.light, 0.2),
                color: theme.palette.primary.contrastText,
                fontWeight: 700,
                fontSize: '16px',
                py: 1.5,
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {title}
                {selectedIds.length > 0 && (
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => confirmAndDeleteIds(selectedIds)}
                  >
                    Delete Selected
                  </Button>
                )}
              </Box>
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Column headers */}
        <TableHead>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => (
                <TableCell
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  sx={{
                    cursor: header.column.getCanSort() ? 'pointer' : 'default',
                    fontWeight: 600,
                    backgroundColor: theme.palette.background.paper,
                    width: header.column.id === 'selection' ? 50 : undefined,
                  }}
                >
                  <Box display="flex" alignItems="center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getCanSort() && header.column.id !== 'selection' && (
                      <Box ml={1}>
                        {header.column.getIsSorted() === 'asc' ? (
                          <IconSortAscending2 size={16} />
                        ) : header.column.getIsSorted() === 'desc' ? (
                          <IconSortDescending2 size={16} />
                        ) : (
                          <IconArrowsSort size={16} />
                        )}
                      </Box>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        {/* Body */}
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} hover>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  sx={{ width: cell.column.id === 'selection' ? 50 : undefined }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {table.getRowModel().rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                <Typography variant="body2">No files found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FileTable;
