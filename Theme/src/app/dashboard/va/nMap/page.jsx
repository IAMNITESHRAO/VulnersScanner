// "use client";
// import React, { useEffect, useState } from 'react';
// import PageContainer from '@/app/components/container/PageContainer';
// import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
// import BasicTable from '@/app/components/dhanushComponents/BasicTable';
// import { Box, Button, Grid, Typography, IconButton, Link, Chip } from '@mui/material';
// import DownloadCard from '@/app/components/shared/DownloadCard';
// import AddScanProfileForm from './components/AddScanProfileForm';
// import { createColumnHelper } from '@tanstack/react-table';
// import { IconTrash } from '@tabler/icons-react';
// import toast from 'react-hot-toast';
// import { deleteScanProfileAPI, getProfileListAPI, reScanProfileAPI } from '@/axios/apis';
// import theme from '@/utils/theme';

// export default function NMap() {
//   const [addProfileModal, setAddProfileModal] = useState(false);
//   const [scanProfiles, setScanProfiles] = useState([]);

//   // Fetch profiles on component mount
//   useEffect(() => {
//     const fetchScanProfiles = async () => {
//       try {
//         const response = await getProfileListAPI();
//         const mappedProfiles = response?.data?.map((profile) => ({
//           profileName: profile.profileName,
//           totalScans: profile.totalScans || 0,
//           lastScan: profile.lastScanTime || null,
//         })) || [];

//         setScanProfiles(mappedProfiles);
//       } catch (error) {
//         // console.error("Failed to load scan profiles:", error);
//         toast.error("Could not load scan profiles.");
//       }
//     };

//     fetchScanProfiles();
//   }, []);

//   const toggleAddProfileModal = () => setAddProfileModal(prev => !prev);

//   const handleAddProfile = (profileData) => {
//     setScanProfiles(prev => [
//       ...prev,
//       {
//         profileName: profileData.scanProfile,
//         totalScans: 0,
//         lastScan: null,
//       }
//     ]);
//   };

//   const handleDelete = async (data) => {
//     toast.dismiss();
//     toast((t) => (
//       <div>
//         <Typography
//           variant="body2"
//           sx={{
//             mb: 1,
//             textAlign: 'center',
//             fontFamily: "'Plus Jakarta Sans', sans-serif",
//           }}
//         >
//           Are you sure you want to delete this data?
//         </Typography>
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//           <Button
//             variant="outlined"
//             color="error"
//             size="small"
//             onClick={async () => {
//               try {
//                 const response = await deleteScanProfileAPI(data.profileName);
//                 if (response.status === 200) {
//                   toast.success(
//                     typeof response.data === 'string'
//                       ? response.data
//                       : response.data?.message || "Profile deleted."
//                   );
//                   // Refresh the scan profiles list
//                   const refreshed = await getProfileListAPI();
//                   const newList = refreshed?.data?.map((profile) => ({
//                     profileName: profile.profileName,
//                     totalScans: profile.totalScans || 0,
//                     lastScan: profile.lastScanTime || null,
//                   })) || [];
//                   setScanProfiles(newList);
//                 } else {
//                   toast.error(
//                     typeof response.data === 'string'
//                       ? response.data
//                       : response.data?.message || "Failed to delete profile."
//                   );
//                 }
//               } catch (error) {
//                 console.error(error.message);
//                 toast.error("Failed to delete the asset.");
//               }
//               toast.dismiss(t.id);
//             }}
//             sx={{
//               fontFamily: "'Plus Jakarta Sans', sans-serif",
//             }}
//           >
//             Confirm
//           </Button>
//           <Button
//             variant="outlined"
//             color="secondary"
//             size="small"
//             onClick={() => toast.dismiss(t.id)}
//             sx={{
//               fontFamily: "'Plus Jakarta Sans', sans-serif",
//             }}
//           >
//             Cancel
//           </Button>
//         </div>
//       </div>
//     ), { duration: Infinity });
//   };

//   const columnHelper = createColumnHelper();
//   const columns = [
//     columnHelper.accessor('profileName', {
//       header: 'Profile Name',
//       cell: info => (
//         <Link href={`/dashboard/va/nMap/scan?profileName=${info.row.original.profileName}`}>
//           <Typography variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
//             {info.getValue()}
//           </Typography>
//         </Link>
//       ),
//     }),
//     columnHelper.accessor('totalScans', {
//       header: 'Total Scans',
//       cell: info => (
//         <Typography variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
//           {info.getValue()}
//         </Typography>
//       ),
//     }),
//     columnHelper.accessor('lastScan', {
//       header: 'Last Scan',
//       cell: info => (
//         <Typography variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
//           {info.getValue() || 'No Scan Yet'}
//         </Typography>
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
//     columnHelper.display({
//       id: 'actions',
//       header: 'Action',
//       cell: info => (
//         <Box display="flex" gap={1}>
//           <Button
//             variant="outlined"
//             color="primary"
//             size="small"
//             sx={{ fontSize: '.6rem' }}
//             onClick={async () => {
//               const profileName = info.row.original.profileName;
//               try {
//                 toast.loading('Rescanning...', { id: 'rescan' });

//                 const payload = { profileName };
//                 const response = await reScanProfileAPI(payload);

//                 toast.success(
//                   response?.data?.message || 'Rescan started successfully!',
//                   { id: 'rescan' }
//                 );
//               } catch (error) {
//                 console.error('Rescan failed:', error);
//                 toast.error('Failed to start rescan.', { id: 'rescan' });
//               }
//             }}
//           >
//             Rescan
//           </Button>

//           <IconButton size="small" color="error" onClick={() => handleDelete(info.row.original)}>
//             <IconTrash size={16} />
//           </IconButton>
//         </Box>
//       ),
//     }),
//   ];

//   return (
//     <>
//       <PageContainer title="nMap" description="this is nMap">
//         <Breadcrumb title="nMap" subtitle="Avoid Vulnerabilities with NMap Tool" />
//       </PageContainer>

//       <PageContainer>
//         <Button
//           variant="contained"
//           color="primary"
//           sx={{ fontSize: '.7rem', padding: '.5rem', borderRadius: '4px', mb: '.5rem' }}
//           onClick={toggleAddProfileModal}
//         >
//           Create Scan Profile
//         </Button>

//         <DownloadCard title={'Profile List'} mb={'1rem'}>
//           <Grid container spacing={3}>
//             <Grid item xs={12}>
//               <Box>
//                 <BasicTable tableData={scanProfiles} columns={columns} />
//               </Box>
//             </Grid>
//           </Grid>
//         </DownloadCard>
//       </PageContainer>

//       <AddScanProfileForm
//         addProfileModal={addProfileModal}
//         toggleAddProfileModal={toggleAddProfileModal}
//         onAddProfile={handleAddProfile}
//       />
//     </>
//   );
// }



"use client";
import React, { useEffect, useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import BasicTable from '@/app/components/dhanushComponents/BasicTable';
import { Box, Button, Grid, Typography, IconButton, Link, Chip, Tooltip } from '@mui/material';
import DownloadCard from '@/app/components/shared/DownloadCard';
import AddScanProfileForm from './components/AddScanProfileForm';
import { createColumnHelper } from '@tanstack/react-table';
import { IconTrash } from '@tabler/icons-react';
import toast from 'react-hot-toast';
import { deleteScanProfileAPI, getProfileListAPI, reScanProfileAPI } from '@/axios/apis';
import { useTheme } from '@emotion/react';

export default function NMap() {
  const [addProfileModal, setAddProfileModal] = useState(false);
  const [scanProfiles, setScanProfiles] = useState([]);
  const theme = useTheme();

  // Initial fetch
  const fetchScanProfiles = async () => {
    try {
      const response = await getProfileListAPI();
      const mappedProfiles = response?.data?.map((profile) => ({
        profileName: profile.profileName,
        totalScans: profile.totalScans || 0,
        lastScan: profile.lastScanTime || null,
        status: profile.status || 'IN_PROGRESS',
      })) || [];
      setScanProfiles(mappedProfiles);
    } catch (error) {
      toast.error("Could not load scan profiles.");
    }
  };

  useEffect(() => {
    fetchScanProfiles();

    // Poll every 5 seconds
    const interval = setInterval(() => {
      fetchScanProfiles();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleAddProfileModal = () => setAddProfileModal(prev => !prev);

  const handleAddProfile = (profileData) => {
    setScanProfiles(prev => [
      ...prev,
      {
        profileName: profileData.scanProfile,
        totalScans: 0,
        lastScan: null,
        status: 'IN_PROGRESS',
      }
    ]);
  };

  const handleDelete = async (data) => {
    toast.dismiss();
    toast((t) => (
      <div>
        <Typography
          variant="body2"
          sx={{ mb: 1, textAlign: 'center', fontFamily: "'Plus Jakarta Sans', sans-serif" }}
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
                const response = await deleteScanProfileAPI(data.profileName);
                if (response.status === 200) {
                  toast.success(typeof response.data === 'string' ? response.data : response.data?.message || "Profile deleted.");
                  fetchScanProfiles(); // refresh list
                } else {
                  toast.error(typeof response.data === 'string' ? response.data : response.data?.message || "Failed to delete profile.");
                }
              } catch (error) {
                console.error(error.message);
                toast.error("Failed to delete the asset.");
              }
              toast.dismiss(t.id);
            }}
            sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => toast.dismiss(t.id)}
            sx={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Cancel
          </Button>
        </div>
      </div>
    ), { duration: Infinity });
  };

  const columnHelper = createColumnHelper();
  const columns = [
         columnHelper.accessor('profileName', {
  header: 'Profile Name',
  cell: (info) => {
    const row = info.row.original;
    const isDisabled = row.status?.toUpperCase() !== 'COMPLETED';

    return (
      <Tooltip title={isDisabled ? 'Scan not completed yet' : 'Click to view scan'}>
        <span>
          {isDisabled ? (
            <Typography
              variant="subtitle2"
              sx={{
                fontSize: '0.75rem',
                color: 'text.disabled',
                cursor: 'not-allowed',
              }}
            >
              {info.getValue()}
            </Typography>
          ) : (
            <Link
              href={`/dashboard/va/nMap/scan?profileName=${row.profileName}`}
              underline="hover"
              sx={{
                fontSize: '0.75rem',
                color: 'primary.main',
                cursor: 'pointer',
                '&:hover': { color: 'primary.dark' },
              }}
            >
              {info.getValue()}
            </Link>
          )}
        </span>
      </Tooltip>
    );
  },
}),

      
    columnHelper.accessor('totalScans', {
      header: 'Total Scans',
      cell: info => (
        <Typography variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
          {info.getValue()}
        </Typography>
      ),
    }),
    columnHelper.accessor('lastScan', {
      header: 'Last Scan',
      cell: info => (
        <Typography variant="subtitle2" sx={{ fontSize: '0.75rem' }}>
          {info.getValue() || 'No Scan Yet'}
        </Typography>
      ),
    }),
    columnHelper.accessor('status', {
      header: 'Status',
      cell: (info) => {
        const status = info.getValue()?.toUpperCase() || 'N/A';
        const getColor = () => {
          if (status === 'COMPLETED') return theme.palette.success;
          if (status === 'FAILED') return theme.palette.error;
          return theme.palette.warning;
        };
        const color = getColor();

        return (
          <Chip
            size="small"
            label={status}
            sx={{
              fontSize: '.7rem',
              bgcolor: color.light,
              color: color.main,
              borderRadius: '2px',
            }}
          />
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Action',
      cell: info => (
        <Box display="flex" gap={1}>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            sx={{ fontSize: '.6rem' }}
            onClick={async () => {
              const profileName = info.row.original.profileName;
              try {
                toast.loading('Rescanning...', { id: 'rescan' });

                // Optimistic update
                setScanProfiles(prev =>
                  prev.map(p =>
                    p.profileName === profileName
                      ? { ...p, status: 'IN_PROGRESS' }
                      : p
                  )
                );

                const payload = { profileName };
                const response = await reScanProfileAPI(payload);

                toast.success(response?.data?.message || 'Rescan started successfully!', { id: 'rescan' });
              } catch (error) {
                console.error('Rescan failed:', error);
                toast.error('Failed to start rescan.', { id: 'rescan' });
              }
            }}
          >
            Rescan
          </Button>

          <IconButton size="small" color="error" onClick={() => handleDelete(info.row.original)}>
            <IconTrash size={16} />
          </IconButton>
        </Box>
      ),
    }),
  ];

  return (
    <>
      <PageContainer title="nMap" description="this is nMap">
        <Breadcrumb title="nMap" subtitle="Avoid Vulnerabilities with NMap Tool" />
      </PageContainer>

      <PageContainer>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontSize: '.7rem', padding: '.5rem', borderRadius: '4px', mb: '.5rem' }}
          onClick={toggleAddProfileModal}
        >
          Create Scan Profile
        </Button>

        <DownloadCard title={'Profile List'} mb={'1rem'}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box>
                <BasicTable tableData={scanProfiles} columns={columns} />
              </Box>
            </Grid>
          </Grid>
        </DownloadCard>
      </PageContainer>

      <AddScanProfileForm
        addProfileModal={addProfileModal}
        toggleAddProfileModal={toggleAddProfileModal}
        onAddProfile={handleAddProfile}
      />
    </>
  );
}


// columnHelper.accessor('profileName', {
    //   header: 'Profile Name',
    //   cell: (info) => {
    //       const row = info.row.original;
    //       const isDisabled = row.status?.toUpperCase() !== 'COMPLETED';
      
    //       return (
    //         <Tooltip title={isDisabled ? 'Scan not completed yet' : 'Click to download report'}>
    //           <span>
    //             <Typography
    //               component="button"
    //               onClick={() => {
    //                 if (!isDisabled) {
    //                   info.table.options.meta?.onFileClick?.(row.id);
    //                 }
    //               }}
    //               disabled={isDisabled}
    //               sx={{
    //                 color: isDisabled ? 'grey' : '#1976d2',
    //                 background: 'none',
    //                 border: 'none',
    //                 padding: 0,
    //                 margin: 0,
    //                 cursor: isDisabled ? 'not-allowed' : 'pointer',
    //                 textDecoration: isDisabled ? 'none' : 'underline',
    //                 font: 'inherit',
    //                 '&:hover': {
    //                   color: isDisabled ? 'grey' : '#ff784e',
    //                 },
    //               }}
    //             >
    //               {info.getValue()}
    //             </Typography>
    //           </span>
    //         </Tooltip>
    //       );
    //     },
    //   }),