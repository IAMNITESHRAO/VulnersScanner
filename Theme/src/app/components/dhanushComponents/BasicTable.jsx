'use client';
import { Box, Chip, Divider, IconButton, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { IconArrowsSort, IconClockEdit, IconEdit, IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react';
import * as React from 'react';

import CustomSelect from '@/app/components/forms/theme-elements/CustomSelect';
import CustomTextField from '@/app/components/forms/theme-elements/CustomTextField';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-react';
import { createColumnHelper, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { useTheme } from '@emotion/react';
import { useRouter } from 'next/navigation';

const BasicTable = ({ tableData, columns }) => {

    const router = useRouter();

    const basics = tableData;

    const theme = useTheme();
    const columnHelper = createColumnHelper();

    const [data, setData] = React.useState(tableData || []);
    const [columnFilters, setColumnFilters] = React.useState([])
    const rerender = React.useReducer(() => ({}), {})[1]

    const [showPage, setShowPage] = React.useState(1);
    const [tablePageIndex, setTablePageIndex] = React.useState(0);
    const [tableItemPerPage, setTableItemPerPage] = React.useState(5);

    React.useEffect(() => {
        setData(tableData);
    }, [tableData]);

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

            <TableContainer
                sx={{ height: '100%', overflowY: 'auto' }}
                className="custom-scrollbar"
            >
                <Table
                    sx={{ whiteSpace: 'nowrap' }} >
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell
                                        key={header.id}
                                        sx={{
                                            padding: '2px 12px',
                                            position: 'sticky',
                                            top: 0,
                                            zIndex: 1,
                                            backgroundColor:
                                                theme.palette.mode === 'dark'
                                                    ? theme.palette.background.dark
                                                    : theme.palette.common.white,
                                        }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                            sx={{ mb: 0, p: 0, fontWeight: '600' }}>
                                            {header.isPlaceholder ? null : (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                                    {
                                                        header.column.id !== 'sno' && header.column.id !== 'actions' && (
                                                            header.column.getIsSorted() === 'asc' ? (
                                                                <IconSortAscending2 size={16} style={{ marginLeft: 8 }} />
                                                            ) : header.column.getIsSorted() === 'desc' ? (
                                                                <IconSortDescending2 size={16} style={{ marginLeft: 8 }} />
                                                            ) : (
                                                                <IconArrowsSort size={16} style={{ marginLeft: 8 }} />
                                                            )
                                                        )
                                                    }
                                                </div>
                                            )}
                                        </Typography>

                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ cursor: "pointer" }}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}
                                            sx={{
                                                padding: "2px 10px",
                                                width: cell.column.id === "profileName" ? "500px" : "auto", 
                                                minWidth: cell.column.id === "profileName" ? "300px" : "auto",
                                                maxWidth: cell.column.id === "profileName" ? "300px" : "none",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                whiteSpace: "nowrap",
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    align="center"
                                    sx={{
                                        padding: "10px",
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                    }}
                                >
                                    <Typography>No data available</Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer >
        </>
    );
};

export default BasicTable;