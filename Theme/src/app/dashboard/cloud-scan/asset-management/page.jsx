'use client';

import PageContainer from '@/app/components/container/PageContainer';
import BasicTable from '@/app/components/dhanushComponents/BasicTable';
import DownloadCard from '@/app/components/shared/DownloadCard';
import useUserDetails from '@/app/hooks/useUserDetails';
import { deleteCloudProfileAPI, getAssetListAPI } from '@/axios/apis';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  Typography,
  Checkbox,
  FormGroup,
} from '@mui/material';
import {
  IconEdit,
  IconEye,
  IconRefresh,
  IconTrash,
} from '@tabler/icons-react';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AssetFilterDrawer from './components/AssetFilterDrawer';
import CloudCards from './CloudCards';
import EditAssetForm from './EditAssetForm';
import toast from 'react-hot-toast';
import AddAWSAssetForm from './aws/AddAWSAssetForm';
import AddAzureAssetForm from './azure/AddAzureAssetForm';
import AddGCPAssetForm from './gcp/AddGCPAssetForm';

export default function AssetManagement() {
  const { CLIENT_ID, loading } = useUserDetails();
  const [assetsData, setAssetsData] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [filterDrawer, setFilterDrawer] = useState(false);
  // const [selectedCloudTypes, setSelectedCloudTypes] = useState([]);
  const [selectedCloudTypes, setSelectedCloudTypes] = useState(['aws', 'azure', 'gcp']);

  const [selectedRegions, setSelectedRegions] = useState([]);

  const [addAssetModal, setAddAssetModal] = useState(false);
  const toggleAddAssetModal = () => setAddAssetModal(!addAssetModal);
  const toggleFilterDrawer = () => setFilterDrawer(prev => !prev);
  const [statusFilter, setStatusFilter] = useState({
    all: true,
    active: true,
    inactive: true,
  });
  const [showCloudCards, setShowCloudCards] = useState(false);

  const handleAddAsset = () => setShowCloudCards(true);
  const handleCloseCloudCards = () => {
    setShowCloudCards(false);
    getAssetList(); // Refresh asset list after potential add
  };

  const getAssetList = async () => {
    try {
      const response = await getAssetListAPI(CLIENT_ID);
      if (response.status === 200) {
        setAssetsData(response.data);
        setFilteredAssets(response.data);
      }
    } catch (error) {
      console.error('Error fetching asset list:', error);
    }
  };

  useEffect(() => {
    if (!loading && CLIENT_ID) {
      getAssetList();
    }
  }, [CLIENT_ID, loading]);


   // Edit Asset Dialog
  const [editAssetModal, setEditAssetModal] = useState(false);
  const toggleEditAssetModal = () => {
    setEditAssetModal(!editAssetModal);
  };

  // Edit Cloud Profile
  const [existingAssetData, setExistingAssetData] = useState({});
  const handleEdit = async (data) => {
    setExistingAssetData(data);
    setEditAssetModal(!editAssetModal);
  }

  const handleDelete = async (data) => {
    toast.dismiss();
    toast((t) => (
      <div>
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            textAlign: 'center',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}
        >
          Are you sure you want to delete this data?
        </Typography>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={async () => {
              try {
                const response = await deleteCloudProfileAPI(data.id);
                if (response.status === 200) {
                  toast.success(response.data);
                  getAssetList();
                } else {
                  toast.error(response.data);
                }
              } catch (error) {
                console.error(error.message);
                toast.error("Failed to delete the asset.");
              }
              toast.dismiss(t.id);
            }}
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => toast.dismiss(t.id)}
            sx={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };


  useEffect(() => {
    if (!loading && CLIENT_ID) {
      getAssetList();
    }
  }, [CLIENT_ID, loading]);

  useEffect(() => {
    const filtered = assetsData.filter(asset => {
      const cloudMatch = selectedCloudTypes.length
        ? selectedCloudTypes.includes(asset.cloudType)
        : true;
      const regionMatch = selectedRegions.length
        ? selectedRegions.includes(asset.region)
        : true;
      const statusMatch =
        statusFilter !== null
          ? asset.status === (statusFilter ? 'ACTIVE' : 'INACTIVE')
          : true;
      return cloudMatch && regionMatch && statusMatch;
    });
    setFilteredAssets(filtered);
  }, [selectedCloudTypes, selectedRegions, statusFilter, assetsData]);

  const handleCheckboxChange = (type, value) => {
    if (type === 'cloud') {
      setSelectedCloudTypes(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    } else if (type === 'region') {
      setSelectedRegions(prev =>
        prev.includes(value)
          ? prev.filter(v => v !== value)
          : [...prev, value]
      );
    }
  };

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('sno', {
      header: () => 'S.No',
      cell: info => (
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
      cell: info => (
        <Link
          href={`/dashboard/cloud-scan/scan?cloudCategory=${info.row.original.cloudType}&asset=${info.row.original.profileName}`}
        >
          <Typography
            variant="subtitle2"
            color="textSecondary"
            sx={{ fontSize: '0.75rem' }}
          >
            {info.getValue()}
          </Typography>
        </Link>
      ),
    }),
    columnHelper.accessor('entryDate', {
      header: () => 'Entry Date',
      cell: info => (
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
      meta: {
        filterVariant: 'select',
      },
      cell: info => (
        <Chip
          size="small"
          sx={{
            fontSize: '.55rem',
            padding: '.1rem',
            bgcolor:
              info.getValue() === 'ACTIVE'
                ? (theme) => theme.palette.success.light
                : info.getValue() === 'INACTIVE'
                  ? (theme) => theme.palette.error.light
                  : (theme) => theme.palette.secondary.light,
            color:
              info.getValue() === 'ACTIVE'
                ? (theme) => theme.palette.success.main
                : info.getValue() === 'INACTIVE'
                  ? (theme) => theme.palette.error.main
                  : (theme) => theme.palette.secondary.main,
            borderRadius: '2px',
          }}
          label={info.getValue().toUpperCase()}
        />
      ),
    }),
    {
      id: 'actions',
      header: () => 'Actions',
      cell: info => {
        const cloudCategory = info.row.original.cloudType;
        const asset = info.row.original.profileName;

        return (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {/* <Button
              variant="outlined"
              color="primary"
              size="small"
              sx={{ fontSize: '.6rem', padding: '0 .5rem', textTransform: 'none', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              onClick={() => handleAddScan(info.row.original)}
            >
              <IconRefresh size={14} /> Add Scan
            </Button> */}
            <Link href={`/dashboard/cloud-scan/scan?cloudCategory=${cloudCategory}&asset=${asset}`}>
              <IconButton
                aria-label="View"
                size="small"
                color="info"
              >
                <IconEye size={16} />
              </IconButton>
            </Link>
            <IconButton
              aria-label="Edit"
              size="small"
              color="primary"
              onClick={() => handleEdit(info.row.original)}
            >
              <IconEdit size={16} />
            </IconButton>
            <IconButton
              aria-label="Delete"
              size="small"
              color="error"
              onClick={() => handleDelete(info.row.original)}
            >
              <IconTrash size={16} />
            </IconButton>
          </div>
        );
      }
    }
  ];

  return (
    <>
    <PageContainer title="Asset Management" description="Manage cloud assets">
      {loading ? (
        <Box
          sx={{
            height: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : showCloudCards ? (
        <CloudCards onClose={handleCloseCloudCards} />
      ) : (
        <>
          <Box display="flex" justifyContent="flex-start" gap={1} mb={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: '.7rem',
                padding: '.1rem',
                lineHeight: '1',
                borderRadius: '4px',
                marginRight: "0.1",
                backgroundColor: '#1976d2',
                color: '#ffffff', // text white
                '& .MuiButton-startIcon': {
                  color: '#ff784e', // icon orange in normal state
                },
                '&:hover': {
                  backgroundColor: '#ff784e', // orange bg on hover
                  color: '#ffffff',           // text blue on hover
                  '& .MuiButton-startIcon': {
                    color: '#1976d2',         // icon white on hover
                  },
                },
              }}
              onClick={toggleFilterDrawer}
            >
              Filters
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: '.7rem', padding: '.5rem', lineHeight: '1', borderRadius: '4px', backgroundColor: '#1976d2',
                color: '#ffffff', // text white
                '& .MuiButton-startIcon': {
                  color: '#ff784e', // icon orange in normal state
                },
                '&:hover': {
                  backgroundColor: '#ff784e', // orange bg on hover
                  color: '#ffffff',           // text blue on hover
                  '& .MuiButton-startIcon': {
                    color: '#1976d2',         // icon white on hover
                  },
                },
              }}
              onClick={handleAddAsset}
            >
              Add Asset
            </Button>

          </Box>

          <Grid container spacing={2}>
            {filterDrawer && (
              <Grid item xs={12} md={3}>
                <AssetFilterDrawer
                  selectedCloudTypes={selectedCloudTypes}
                  selectedRegions={selectedRegions}
                  statusFilter={statusFilter}
                  handleCheckboxChange={handleCheckboxChange}
                  setStatusFilter={setStatusFilter}
                />
              </Grid>
            )}
            <Grid item xs={12} md={filterDrawer ? 9 : 12}>
              {selectedCloudTypes.length === 0 || selectedCloudTypes.includes('aws') ? (
                <DownloadCard title="AWS Asset List" mb="1rem">
                  <BasicTable
                    tableData={filteredAssets.filter(a => a.cloudType === 'aws')}
                    columns={columns}
                  />
                </DownloadCard>
              ) : null}

              {selectedCloudTypes.length === 0 || selectedCloudTypes.includes('azure') ? (
                <DownloadCard title="Azure Asset List" mb="1rem">
                  <BasicTable
                    tableData={filteredAssets.filter(a => a.cloudType === 'azure')}
                    columns={columns}
                  />
                </DownloadCard>
              ) : null}

              {selectedCloudTypes.length === 0 || selectedCloudTypes.includes('gcp') ? (
                <DownloadCard title="GCP Asset List" mb="0">
                  <BasicTable
                    tableData={filteredAssets.filter(a => a.cloudType === 'gcp')}
                    columns={columns}
                  />
                </DownloadCard>
              ) : null}
            </Grid>
          </Grid>
        </>
      )}
    </PageContainer>
     <AddAWSAssetForm addAssetModal={addAssetModal} toggleAddAssetModal={toggleAddAssetModal} onSuccess={getAssetList} />
     <AddAzureAssetForm addAssetModal={addAssetModal} toggleAddAssetModal={toggleAddAssetModal} onSuccess={getAssetList} />
     <AddGCPAssetForm addAssetModal={addAssetModal} toggleAddAssetModal={toggleAddAssetModal} onSuccess={getAssetList} />

    <EditAssetForm editAssetModal={editAssetModal} toggleEditAssetModal={toggleEditAssetModal} existingAssetData={existingAssetData} onSuccess={getAssetList} />
   </>
  );
}
