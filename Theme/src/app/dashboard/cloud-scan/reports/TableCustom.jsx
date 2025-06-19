'use client';
import { Box, Chip, Divider, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { padding, Stack } from '@mui/system';
import { IconArrowsSort, IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react';
import * as React from 'react';

import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { TableData } from './data';

const basics = TableData;

const columnHelper = createColumnHelper();

const columns = [

    columnHelper.accessor('sno', {
        header: () => 'S.No',
        cell: info => (
            <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                {info.row.index + 1}
            </Typography>
        ),
    }),
    columnHelper.accessor('description', {
        header: () => 'Description',
        cell: info => {
            const words = info.getValue().split(' ');
            const limitedWords = words.slice(0, 3).join(' ');
            return (
                <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
                    {limitedWords}...
                </Typography>
            );
        },
    }),
    columnHelper.accessor('resource', {
        header: () => 'Resource',
        cell: info => (
            <Typography variant="subtitle1" color="textSecondary" sx={{ fontSize: '0.75rem' }}>
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
                        info.getValue() === 'Passed'
                            ? (theme) => theme.palette.success.light
                            : info.getValue() === 'Pending'
                                ? (theme) => theme.palette.warning.light
                                : info.getValue() === 'Not Applicable'
                                    ? (theme) => theme.palette.info.light
                                    : info.getValue() === 'Error'
                                        ? (theme) => theme.palette.error.light
                                        : info.getValue() === 'Failed'
                                            ? (theme) => theme.palette.secondary.light
                                            : (theme) => theme.palette.secondary.light,
                    color:
                        info.getValue() === 'Passed'
                            ? (theme) => theme.palette.success.main
                            : info.getValue() === 'Pending'
                                ? (theme) => theme.palette.warning.main
                                : info.getValue() === 'Not Applicable'
                                    ? (theme) => theme.palette.info.main
                                    : info.getValue() === 'Error'
                                        ? (theme) => theme.palette.error.main
                                        : info.getValue() === 'Failed'
                                            ? (theme) => theme.palette.secondary.main
                                            : (theme) => theme.palette.secondary.main,
                    borderRadius: '2px',
                }}
                label={info.getValue().toUpperCase()}
            />
        ),
    }),
];

const TableCustom = () => {
    const [data, _setData] = React.useState(() => [...basics]);
    const [columnFilters, setColumnFilters] = React.useState([])
    const rerender = React.useReducer(() => ({}), {})[1]

    const [showPage, setShowPage] = React.useState(1);
    const [tablePageIndex, setTablePageIndex] = React.useState(0);
    const [tableItemPerPage, setTableItemPerPage] = React.useState(5);

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
                                    <TableCell key={header.id} sx={{ padding: '6px 12px' }}>
                                        <Typography
                                            variant="h6"
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                            sx={{ mb: 0, fontSize: '0.75rem' }}>
                                            {header.isPlaceholder ? null : (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {header.column.id !== 'sno' && (
                                                        header.column.getIsSorted() === 'asc' ? (
                                                            <IconSortAscending2 size={16} style={{ marginLeft: 8 }} />
                                                        ) : header.column.getIsSorted() === 'desc' ? (
                                                            <IconSortDescending2 size={16} style={{ marginLeft: 8 }} />
                                                        ) : (
                                                            <IconArrowsSort size={16} style={{ marginLeft: 8 }} />
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
                                    <TableCell key={cell.id} sx={{ padding: '6px 12px' }}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Divider />
            <Stack direction={{ xs: 'column', sm: 'row'}} sx={{ gap: 1, p: 1, alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>{table.getPrePaginationRowModel().rows.length} Rows</Typography>
                </Box>
                <Box
                    sx={{ alignItems: "center", gap: 1, display: { xs: 'block', sm: 'flex' } }}>

                    <Stack
                        direction="row"
                        sx={{ alignItems: "center", gap: 1, }}>
                        <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>Page</Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>
                            {table.getState().pagination.pageIndex + 1} of{' '}
                            {table.getPageCount()}
                        </Typography>
                    </Stack>
                    <Stack direction="row" sx={{ alignItems: "center", gap: 1}}>
                        <Typography variant="subtitle1" sx={{fontSize: '0.75rem' }}>| Go to page:</Typography>
                        <TextField
                            type="number"
                            value={showPage === 0 ? "" : showPage}
                            onChange={handleInputChange}
                            sx={{
                                height: 'auto', 
                                '& .MuiInputBase-root': {
                                    padding: '4px', 
                                    fontSize: '.7rem',
                                },
                                '& .MuiOutlinedInput-root': {
                                    height: '28px',
                                },
                            }}
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

            </Stack>
        </>
    );
};

export default TableCustom;