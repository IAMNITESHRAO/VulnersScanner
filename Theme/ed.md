'use client';
import { Box, Button, Chip, Divider, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { IconArrowsSort, IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react';
import * as React from 'react';

import { TableData } from '@/app/(DashboardLayout)/cloud-scan/asset-management/TableData';
import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

const basics = TableData;

const columnHelper = createColumnHelper();

const columns = [

    columnHelper.accessor('sno', {
        header: () => 'S.No',
        cell: info => (
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {info.row.index + 1}
            </Typography>
        ),
    }),
    columnHelper.accessor('profileName', {
        header: () => 'Profile Name',
        cell: info => (
            <Typography variant="subtitle1" color="textSecondary">
                {info.getValue()}
            </Typography>
        ),
    }),
    columnHelper.accessor('date', {
        header: () => 'Date',
        cell: info => (
            <Typography variant="subtitle1" color="textSecondary">
                {info.getValue()}
            </Typography>
        ),
    }),
    columnHelper.accessor('status', {
        header: () => 'Status',
        meta: {
            filterVariant: 'select',
        },
        cell: info => (
            <Chip
                size='small'
                sx={{
                    fontSize: '.6rem',
                    bgcolor:
                        info.getValue() === 'active'
                            ? (theme) => theme.palette.success.light
                            : info.getValue() === 'pending'
                                ? (theme) => theme.palette.warning.light
                                : info.getValue() === 'completed'
                                    ? (theme) => theme.palette.primary.light
                                    : info.getValue() === 'cancel'
                                        ? (theme) => theme.palette.error.light
                                        : (theme) => theme.palette.secondary.light,
                    color:
                        info.getValue() === 'active'
                            ? (theme) => theme.palette.success.main
                            : info.getValue() === 'pending'
                                ? (theme) => theme.palette.warning.main
                                : info.getValue() === 'completed'
                                    ? (theme) => theme.palette.primary.main
                                    : info.getValue() === 'cancel'
                                        ? (theme) => theme.palette.error.main
                                        : (theme) => theme.palette.secondary.main,
                    borderRadius: '2px',
                }}
                label={info.getValue().toUpperCase()}
            />
        ),
    }),
];

const TablePagination = () => {
    const [data, _setData] = React.useState(() => [...basics]);
    const [columnFilters, setColumnFilters] = React.useState([])
    const rerender = React.useReducer(() => ({}), {})[1]

    const [showPage, setShowPage] = React.useState(1);
    const [tablePageIndex, setTablePageIndex] = React.useState(0);
    const [tableItemPerPage, setTableItemPerPage] = React.useState(2);

    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            columnFilters,
            pagination: {
                pageIndex: tablePageIndex,
                pageSize: tableItemPerPage,
            },
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    const handleInputChange = (event) => {
        const value = Number(event.target.value);
        setShowPage(value);

        if (value === '') {
            setTablePageIndex(0);
        }
        if (value < 0) {
            setShowPage(1);
            setTablePageIndex(0);
        }
        else {
            const numberValue = parseInt(value, 10) - 1;
            setTablePageIndex(isNaN(numberValue) ? 0 : numberValue);
        }
    };

    return (
        <>

            <TableContainer>
                <Table
                    sx={{ whiteSpace: 'nowrap' }} >
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id} >
                                        <Typography
                                            variant="h6"
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                            sx={{ mb: 1 }}>
                                            {header.isPlaceholder ? null : (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.id !== 'sno' && (
                                                        header.column.getIsSorted() === 'asc' ? (
                                                            <IconSortAscending2 size={16} style={{ marginLeft: 8 }} />
                                                        ) : header.column.getIsSorted() === 'desc' ? (
                                                            <IconSortDescending2 size={16} style={{ marginLeft: 8 }} />
                                                        ) : (
                                                            <IconArrowsSort size={16} style={{ marginLeft: 8}} />
                                                        )
                                                    )}
                                                </div>
                                            )}
                                        </Typography>

                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Divider />
            {/* <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: 1, p: 1, alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button variant="contained" color="primary" sx={{ fontSize: '.7rem',borderRadius: '4px', padding: '.5rem', lineHeight: '1' }} onClick={() => rerender()}>Refresh Data</Button>
                    <Typography variant="subtitle1">{table.getPrePaginationRowModel().rows.length} Rows</Typography>
                </Box>
                <Box
                    sx={{ alignItems: "center", gap: 1, display: { xs: 'block', sm: 'flex' } }}>

                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 1, }}>
                        <Typography variant="subtitle1">Page</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1 }}>
                        <Typography variant="subtitle1">| Go to page:</Typography>
                        <CustomTextField
                            type="number"
                            value={showPage === 0 ? "" : showPage}
                            onChange={handleInputChange}
                        />
                    </Stack>
                    <CustomSelect
                        value={table.getState().pagination.pageSize}
                        onChange={e => {
                            setTableItemPerPage(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 25].map(pageSize => (
                            <MenuItem key={pageSize} value={pageSize}>
                                {pageSize}
                            </MenuItem>
                        ))}
                    </CustomSelect>

                    <IconButton size='small'
                        onClick={() => setTablePageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <IconChevronsLeft />
                    </IconButton>
                    <IconButton size='small'
                        onClick={() => setTablePageIndex(tablePageIndex - 1)}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <IconChevronLeft />
                    </IconButton>
                    <IconButton size='small'
                        onClick={() => setTablePageIndex(tablePageIndex + 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <IconChevronRight />
                    </IconButton>
                    <IconButton size='small'
                        onClick={() => setTablePageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                    >
                        <IconChevronsRight />
                    </IconButton>
                </Box>

            </Stack> */}
        </>
    );
};

export default TablePagination;