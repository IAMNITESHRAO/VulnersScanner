"use client";

import PageContainer from '@/app/components/container/PageContainer';
import BasicTable from '@/app/components/dhanushComponents/BasicTable';
import DownloadCard from '@/app/components/shared/DownloadCard';
import useUserDetails from '@/app/hooks/useUserDetails';
import { getAssetListAPI } from '@/axios/apis';
import {
  Box, Button, Chip, CircularProgress, FormControlLabel, Grid, IconButton,
  Switch, Typography, Checkbox, FormGroup, Collapse, Paper
} from '@mui/material';
import { IconEdit, IconEye, IconRefresh, IconTrash } from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AssetManagement() {
  const { CLIENT_ID, loading } = useUserDetails();
  const [addAssetModal, setAddAssetModal] = useState(false);
  const [editAssetModal, setEditAssetModal] = useState(false);

  const [assetsData, setAssetsData] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);

  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCloudTypes, setSelectedCloudTypes] = useState([]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);

  const toggleFilter = () => setFilterOpen(prev => !prev);

  const getAssetList = async () => {
    try {
      const response = await getAssetListAPI(CLIENT_ID);
      if (response.status === 200) {
        setAssetsData(response.data);
        setFilteredAssets(response.data);
      }
    } catch (error) {
      console.error("Error fetching asset list:", error);
    }
  };

  useEffect(() => {
    if (!loading && CLIENT_ID) {
      getAssetList();
    }
  }, [CLIENT_ID, loading]);

  useEffect(() => {
    const filtered = assetsData.filter((asset) => {
      const cloudMatch = selectedCloudTypes.length ? selectedCloudTypes.includes(asset.cloudType) : true;
      const regionMatch = selectedRegions.length ? selectedRegions.includes(asset.region) : true;
      const statusMatch = statusFilter !== null ? asset.status === (statusFilter ? 'ACTIVE' : 'INACTIVE') : true;
      return cloudMatch && regionMatch && statusMatch;
    });
    setFilteredAssets(filtered);
  }, [selectedCloudTypes, selectedRegions, statusFilter, assetsData]);

  const handleCheckboxChange = (type, value) => {
    if (type === 'cloud') {
      setSelectedCloudTypes(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    } else if (type === 'region') {
      setSelectedRegions(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
    }
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('sno', {
      header: () => 'S.No',
      cell: info => <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.75rem' }}>{info.row.index + 1}</Typography>,
    }),
    columnHelper.accessor('profileName', {
      header: () => 'Profile Name',
      cell: info => (
        <Link href={`/dashboard/cloud-scan/scan?cloudCategory=${info.row.original.cloudType}&asset=${info.row.original.profileName}`}>
          <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>{info.getValue()}</Typography>
        </Link>
      ),
    }),
    columnHelper.accessor('entryDate', {
      header: () => 'Entry Date',
      cell: info => <Typography variant="subtitle2" color="textSecondary" sx={{ fontSize: '0.75rem' }}>{info.getValue()}</Typography>,
    }),
    columnHelper.accessor('status', {
      header: () => 'Status',
      cell: info => <Chip size="small" label={info.getValue().toUpperCase()} sx={{ fontSize: '.55rem', borderRadius: '2px' }} />,
    }),
    {
      id: 'actions',
      header: () => 'Actions',
      cell: info => (
        <Box display="flex" gap={1}>
          <Button variant="outlined" color="primary" size="small" sx={{ fontSize: '.6rem' }}><IconRefresh size={14} /> Add Scan</Button>
          <Link href={`/dashboard/cloud-scan/scan?cloudCategory=${info.row.original.cloudType}&asset=${info.row.original.profileName}`}>
            <IconButton size="small" color="info"><IconEye size={16} /></IconButton>
          </Link>
          <IconButton size="small" color="primary"><IconEdit size={16} /></IconButton>
          <IconButton size="small" color="error"><IconTrash size={16} /></IconButton>
        </Box>
      )
    }
  ];

  return (
    <PageContainer title="Asset Management" description="Manage cloud assets">
      {loading ? (
        <Box sx={{ height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="flex-start" gap={1} mb={2}>
            <Button variant="contained" color="primary" sx={{ fontSize: '.7rem', padding: '.1rem .5rem', borderRadius: '4px' }} onClick={toggleFilter}>Filters</Button>
            <Button variant="contained" color="primary" sx={{ fontSize: '.7rem', padding: '.1rem .5rem', borderRadius: '4px' }} onClick={() => setAddAssetModal(true)}>Add Asset</Button>
          </Box>

          <Collapse in={filterOpen}>
            <Paper elevation={3} sx={{ p: 2, mb: 2, transition: '0.3s' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="subtitle1" fontWeight={600}>Filters</Typography>
                    <Button variant="outlined" color="error" size="small" onClick={() => {
                      setSelectedCloudTypes([]);
                      setSelectedRegions([]);
                      setStatusFilter(null);
                    }} sx={{ fontSize: '.7rem' }}>Clear All</Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight={600} mb={1} sx={{ fontSize: '.85rem' }}>Cloud Type</Typography>
                  <FormGroup>
                    {['aws', 'azure', 'gcp'].map(type => (
                      <FormControlLabel key={type} control={<Checkbox size="small" checked={selectedCloudTypes.includes(type)} onChange={() => handleCheckboxChange('cloud', type)} />} label={<Typography sx={{ fontSize: '.7rem' }}>{type.toUpperCase()}</Typography>} />
                    ))}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight={600} mb={1} sx={{ fontSize: '.85rem' }}>Region</Typography>
                  <FormGroup>
                    {['east', 'west', 'north', 'south'].map(region => (
                      <FormControlLabel key={region} control={<Checkbox size="small" checked={selectedRegions.includes(region)} onChange={() => handleCheckboxChange('region', region)} />} label={<Typography sx={{ fontSize: '.7rem' }}>{region.toUpperCase()}</Typography>} />
                    ))}
                  </FormGroup>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography fontWeight={600} mb={1} sx={{ fontSize: '.85rem' }}>Status</Typography>
                  <FormControlLabel control={<Switch size="small" checked={statusFilter === true} onChange={() => setStatusFilter(statusFilter === true ? false : statusFilter === false ? null : true)} />} label={<Typography sx={{ fontSize: '.7rem' }}>{statusFilter === null ? 'All' : statusFilter ? 'ACTIVE' : 'INACTIVE'}</Typography>} />
                </Grid>
              </Grid>
            </Paper>
          </Collapse>

          <DownloadCard title="AWS Asset List" mb="1rem">
            <BasicTable tableData={filteredAssets.filter((a) => a.cloudType === 'aws')} columns={columns} />
          </DownloadCard>
          <DownloadCard title="Azure Asset List" mb="1rem">
            <BasicTable tableData={filteredAssets.filter((a) => a.cloudType === 'azure')} columns={columns} />
          </DownloadCard>
          <DownloadCard title="GCP Asset List" mb="0">
            <BasicTable tableData={filteredAssets.filter((a) => a.cloudType === 'gcp')} columns={columns} />
          </DownloadCard>
        </>
      )}
    </PageContainer>
  );
}


