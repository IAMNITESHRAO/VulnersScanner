
'use client';
import React, { useState } from 'react';
import {Chip,Divider,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Typography,IconButton,
} from '@mui/material';
import {IconArrowsSort,IconSortAscending2,IconSortDescending2,IconEdit,IconTrash,
} from '@tabler/icons-react';
import { useTheme } from '@mui/material/styles';
import {createColumnHelper,flexRender,getCoreRowModel,getFilteredRowModel,getPaginationRowModel,getSortedRowModel,useReactTable,
} from '@tanstack/react-table';
import EditAssetForm from '../../dashboard/cloud-scan/asset-management/EditAssetForm';
import { deleteCloudProfileAPI, editCloudProfileAPI, getAssetAPI } from '@/axios/apis';

const columnHelper = createColumnHelper();

const TablePagination = ({ assetTableData }) => {
    const theme = useTheme();
    const [data, setData] = useState(assetTableData);
    const [columnFilters, setColumnFilters] = useState([]);
    const [editAssetModal, setEditAssetModal] = useState(false);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const toggleEditAssetModal = () => {
        setEditAssetModal(!editAssetModal);
    };

    const handleEditClick = async (asset) => {
        try {
            // Use the asset's id to fetch specific data
            const response = await getAssetAPI(asset.id);
            
            if (response?.status === 200) {
                const selectedAssetData = response.data;
                
                // Log only the selected asset data to the console
                console.log("Selected Asset Data:", selectedAssetData);
                
                // Set the selected asset for pre-filling the edit form
                setSelectedAsset(selectedAssetData);
                toggleEditAssetModal();
            } else {
                console.error("Error fetching asset details:", response?.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error fetching asset details:", error);
        }
    };
    

    const handleDeleteClick = async (assetId) => {
        try {
            const response = await deleteCloudProfileAPI(assetId);
            if (response.status === 200) {
                console.log(response.data);
                setData((prevData) => prevData.filter((asset) => asset.id !== assetId));
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    const columns = [
        columnHelper.accessor('sno', {
            header: () => 'S.No',
            cell: (info) => (
                <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, fontSize: '0.75rem' }}
                >
                    {info.row.index + 1}
                </Typography>
            ),
        }),
        columnHelper.accessor('profileName', {
            header: () => 'Profile Name',
            cell: (info) => (
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: '0.75rem' }}
                >
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('entryDate', {
            header: () => 'Date',
            cell: (info) => (
                <Typography
                    variant="subtitle2"
                    color="textSecondary"
                    sx={{ fontSize: '0.75rem' }}
                >
                    {info.getValue()}
                </Typography>
            ),
        }),
        columnHelper.accessor('status', {
            header: () => 'Status',
            cell: (info) => (
                <Chip
                    size="small"
                    sx={{
                        fontSize: '.55rem',
                        padding: '.1rem',
                        bgcolor: (theme) => {
                            switch (info.getValue()) {
                                case 'ACTIVE':
                                    return theme.palette.success.main;
                                case 'INACTIVE':
                                    return theme.palette.error.main;
                                default:
                                    return theme.palette.secondary.main;
                            }
                        },
                        color: (theme) => {
                            switch (info.getValue()) {
                                case 'ACTIVE':
                                    return theme.palette.common.black;
                                case 'INACTIVE':
                                    return theme.palette.common.black;
                                default:
                                    return theme.palette.secondary.black;
                            }
                        },
                        borderRadius: '2px',
                    }}
                    label={info.getValue()}
                />
            ),
        }),
        columnHelper.accessor('action', {
            header: () => 'Actions',
            cell: (info) => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <IconButton onClick={() => handleEditClick(info.row.original)}>
                        <IconEdit size={16} />
                    </IconButton>
                    <IconButton
                        onClick={() => handleDeleteClick(info.row.original.id)}
                        color="error"
                    >
                        <IconTrash size={16} />
                    </IconButton>
                </div>
            ),
        }),        
    ];

    const table = useReactTable({
        data: data,
        columns,
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 20,
            },
        },
    });

    if (data.length === 0) {
        return (
            <Typography variant="body1" sx={{ padding: '1rem', textAlign: 'center' }}>
                No data available.
            </Typography>
        );
    }

    return (
        <>
            <TableContainer
                sx={{ height: '100px', overflowY: 'auto' }}
                className="custom-scrollbar"
            >
                <Table sx={{ whiteSpace: 'nowrap' }}>
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
                                                    ? theme.palette.common.primary
                                                    : theme.palette.common.white,
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            {...{
                                                className: header.column.getCanSort()
                                                    ? 'cursor-pointer select-none'
                                                    : '',
                                                onClick: header.column.getToggleSortingHandler(),
                                            }}
                                            sx={{ mb: 0, fontSize: '0.75rem' }}
                                        >
                                            {header.isPlaceholder ? null : (
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    {flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                                    {header.column.id !== 'sno' &&
                                                        (header.column.getIsSorted() === 'asc' ? (
                                                            <IconSortAscending2
                                                                size={16}
                                                                style={{ marginLeft: 8 }}
                                                            />
                                                        ) : header.column.getIsSorted() === 'desc' ? (
                                                            <IconSortDescending2
                                                                size={16}
                                                                style={{ marginLeft: 8 }}
                                                            />
                                                        ) : (
                                                            <IconArrowsSort
                                                                size={16}
                                                                style={{ marginLeft: 8 }}
                                                            />
                                                        ))}
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
            <EditAssetForm
                editAssetModal={editAssetModal}
                toggleEditAssetModal={toggleEditAssetModal}
                onEditAsset={async (updatedAsset) => {
                    try {
                        const response = await editCloudProfileAPI(updatedAsset);
                        console.log(response)
                        if (response?.status === 200) {
                            setData((prevData) =>
                                prevData.map((asset) =>
                                    asset.id === updatedAsset.id ? response.data : asset
                                )
                            );
                            toggleEditAssetModal();
                        } else {
                            console.error("Error updating asset:", response?.message || "Unknown error");
                        }
                    } catch (error) {
                        console.error("Error updating asset:", error);
                    }
                }}
                selectedAsset={selectedAsset}
            />
        </>
    );
};

export default TablePagination;


