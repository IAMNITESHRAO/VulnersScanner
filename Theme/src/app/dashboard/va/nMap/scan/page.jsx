'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Container,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';
import StorageIcon from '@mui/icons-material/Storage';
import BugReportIcon from '@mui/icons-material/BugReport';
import HistoryIcon from '@mui/icons-material/History';
import { getProfileDetailsAPI } from '@/axios/apis';
import { IconDetails, IconDoor, IconFilterCode, IconFilterPause, IconShieldCheck, IconShieldMinus, IconShieldStar, IconWifiOff } from '@tabler/icons-react';
import { IconWifi } from '@tabler/icons-react';
import { IconDetailsOff } from '@tabler/icons-react';
import { IconShieldPlus } from '@tabler/icons-react';

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ py: 1 }}>{children}</Box>}
    </div>
  );
}

export default function ScanProfileDetailsPage() {
  const searchParams = useSearchParams();
  const profileName = searchParams.get('profileName');

  const [value, setValue] = useState(0);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await getProfileDetailsAPI(profileName);
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        setError(error.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    if (profileName) {
      fetchData();
    }
  }, [profileName]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh" color="error.main">
        <Typography variant="h6">Error: {error}</Typography>
      </Box>
    );
  }

  if (!profileData) return null;

  

 const summaryStats = profileData.scanSummaries?.map((summary, index) => ({
  id: index,
  stats: [
    {
  icon: <IconDetails style={{ color: '#2e7d32' }} />, // Blue
  value: summary.openPorts ?? 0,
  label: 'Open Ports',
},
{
  icon: <IconDetailsOff style={{ color: '#d32f2f'  }} />, // Red
  value: summary.closedPorts ?? 0,
  label: 'Closed Ports',
},
{
  icon: <IconFilterPause style={{ color: '#f9a825' }} />, // Yellow
  value: summary.filteredPorts ?? 0,
  label: 'Filtered Ports',
},
{
  icon: <IconWifi style={{ color: '#2e7d32' }} />, // Green
  value: profileData.hostUp ?? 0,
  label: 'Hosts Up',
},
{
  icon: <IconWifiOff style={{ color: '#9e9e9e' }} />, // Grey
  value: profileData.hostDown ?? 0,
  label: 'Hosts Down',
},
{
  icon: <IconShieldStar style={{ color: '#b71c1c' }} />, // Dark Red
  value: summary.criticalVulnerabilities ?? 0,
  label: 'Critical Vulnerabilities',
},
{
  icon: <IconShieldPlus style={{ color: '#ef6c00' }} />, // Red
  value: summary.highVulners ?? 0,
  label: 'High Vulnerabilities',
},
{
  icon: <IconShieldCheck style={{  color: '#fdd835' }} />, // Orange
  value: summary.mediumVulners ?? 0,
  label: 'Medium Vulnerabilities',
},
{
  icon: <IconShieldMinus style={{  color: '#1976d2' }} />, // Light Yellow
  value: summary.lowVulners ?? 0,
  label: 'Low Vulnerabilities',
},

    // {
    //   icon: <BugReportIcon />,
    //   value:
    //     summary.upIpAddress?.reduce(
    //       (acc, summary) => acc + (summary.openPorts ?? 0) + (summary.closedPorts ?? 0) ,
    //       0
    //     ) ?? 0,
    //   label: 'Total Vulnerabilities',
    // },
    // {
    //   icon: <InfoIcon />,
    //   value: summary.portDetailsList?.reduce( 
    //   (acc, host) => acc + (host.lowVulners ?? 0) + (host.mediumVulners ?? 0) + (host.highVulners ?? 0),
    //       0
    //     ) ?? 0,
    //   label: 'Total Ports',
    // },
  ]
})) ?? [];


  const vulnColors = {
    low: '#4caf50',
    medium: '#ff9800',
    high: '#f44336',
  };

  const hosts = profileData.upIpAddress?.map(host => ({
  name: host.ipAddress,
  vulnerabilities: [
    { value: host.lowVulners ?? 0, color: vulnColors.low },
    { value: host.mediumVulners ?? 0, color: vulnColors.medium },
    { value: host.highVulners ?? 0, color: vulnColors.high },
  ],
})) ?? [];


  const vulnerabilities = profileData.portDetailsList?.map(port => ({
    ip: port.ipAddress,
    port: port.port,
    state: port.state || 'unknown',
    service: port.service,
    version: port.version,
  })) ?? [];

  const history = profileData.scanSummaries?.map(summary => ({
    target: summary.target,
    scanType: summary.scanType,
    scanTime: summary.scanTime,
    status: 'Completed',
  })) ?? [];

  return (
    <Container disableGutters sx={{ p: 0, m: 0, width: '100%' }}>
      <Card elevation={5} sx={{ borderRadius: 0, width: '100%' }}>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h4" 
          color="primary" 
          gutterBottom>
            Profile Name: 
            {profileData.profileName}
          </Typography>
          <Divider sx={{ mb: 0 }} />

          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="scan profile tabs"
            textColor="primary"
            indicatorColor="primary"
            variant="fullWidth"
           sx={{
            borderBottom: '1px solid #e0e0e0',
            minHeight: 0,
            '& .MuiTabs-indicator': {
              backgroundColor: '#1976d2',
              height: 2,
            },
            '& .MuiTab-root': {
              minHeight: 0,
              padding: '6px 12px',
              fontSize: 13,
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': {
                color: '#1976d2',
                backgroundColor: '#f5faff',
              },
              '&.Mui-selected': {
              },
            },
            mt: 0,
            mb: 0,
          }}
          >
            <Tab label="Scan Summary" icon={<InfoIcon />} iconPosition="start" />
            <Tab label="Hosts" icon={<StorageIcon />} iconPosition="start" />
            <Tab label="Vulnerabilities" icon={<BugReportIcon />} iconPosition="start" />
            <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
          </Tabs>

          <TabPanel value={value} index={0}>
  {/* <Card sx={{ backgroundColor: '#1f2235', color: 'white', p: 3, borderRadius: 3 }}> */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: 3,
        color: 'white',

        
        mb: 0,
      }}
    >
      {summaryStats[0]?.stats?.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            textAlign: 'center',
            backgroundColor: '#2b2d42',
            borderRadius: 2,
            py: 2,
            px: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 1,
            }}
          >
            <Box sx={{ fontSize: 30, mr: 1 }}>{item.icon}</Box>
            <Typography variant="h6">
              {item.value !== undefined && item.value !== null ? item.value : 'N/A'}
            </Typography>
          </Box>
          <Typography variant="body2" color="gray">{item.label}</Typography>
        </Box>
      ))}
    </Box>

    <Divider sx={{ my: 2, borderColor: '#444' }} />

    <Box
          sx={{
            textAlign: 'center',
            backgroundColor: '#2b2d42',
            borderRadius: 2,
            py: 2,
            px: 1,
          }}
        >
    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'white' }}>
  <StorageIcon sx={{ color: '#4caf50', mr: 1 }} />
  <strong style={{ marginRight: 8 }}>Scan Info</strong>
</Typography>

<Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'white' }}>
  <strong style={{ marginRight: 6 }}>Scan Type:</strong> {profileData.scanType ?? 'N/A'}
</Typography>

<Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'white' }}>
  <strong style={{ marginRight: 6 }}>Scan Start:</strong>{' '}
  {profileData.scanStartTime ? new Date(profileData.scanStartTime).toLocaleString() : 'N/A'}
</Typography>

<Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'white' }}>
  <strong style={{ marginRight: 6 }}>Scan End:</strong>{' '}
  {profileData.scanEndTime ? new Date(profileData.scanEndTime).toLocaleString() : 'N/A'}
</Typography>

    </Box>
  {/* </Card> */}
</TabPanel>


        <TabPanel value={value} index={1}>
  <Box sx={{ backgroundColor: '#2b2d42', borderRadius: 2, padding: 2, mb: 3 }}>
    <Typography variant="h6" color="white" gutterBottom>Scanned Hosts</Typography>

    {/* Table Headers */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',  // more space for host name
        backgroundColor: '#3a3c5a',
        borderRadius: 1,
        px: 2,
        py: 1,
        color: '#cfcfcf',
        fontWeight: 'bold',
      }}
    >
      <Typography>HOST</Typography>
      <Typography>Low Vulns</Typography>
      <Typography>Medium Vulns</Typography>
      <Typography>High Vulns</Typography>
    </Box>

    {/* Table Rows */}
    {(hosts.length > 0 ? hosts : [{}]).map((host, i) => (
      <Box
        key={i}
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          alignItems: 'center',
          px: 2,
          py: 2,
          borderBottom: '1px solid #444',
          color: '#ffffff',
        }}
      >
        {/* Host Name */}
        <Typography>{host.name || 'N/A'}</Typography>

        {/* Vulnerabilities Columns */}
        {host.vulnerabilities && host.vulnerabilities.length === 3
          ? host.vulnerabilities.map((vuln, idx) => (
              <Typography key={idx} sx={{ color: vuln.color || '#fff' }}>
                {vuln.value ?? 'N/A'}
              </Typography>
            ))
          : [0, 1, 2].map(idx => (
              <Typography key={idx} sx={{ color: '#fff' }}>N/A</Typography>
            ))
        }
      </Box>
    ))}
  </Box>
</TabPanel>

          <TabPanel value={value} index={2}>
            <Box sx={{ backgroundColor: '#2b2d42', borderRadius: 2, padding: 2 }}>
              <Typography variant="h6" color="white" gutterBottom>
                Vulnerability Overview
              </Typography>

              <TableContainer component={Paper} sx={{ backgroundColor: '#2b2d42' }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: '#3a3c5a' }}>
                      <TableCell sx={{ color: '#cfcfcf', fontWeight: 'bold' }}>IP</TableCell>
                      <TableCell sx={{ color: '#cfcfcf', fontWeight: 'bold' }}>Port</TableCell>
                      <TableCell sx={{ color: '#cfcfcf', fontWeight: 'bold' }}>State</TableCell>
                      <TableCell sx={{ color: '#cfcfcf', fontWeight: 'bold' }}>Service</TableCell>
                      <TableCell sx={{ color: '#cfcfcf', fontWeight: 'bold' }}>Version</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(vulnerabilities.length > 0 ? vulnerabilities : [{}]).map((vuln, i) => (
                      <TableRow key={i} sx={{ borderBottom: '1px solid #444' }}>
                        <TableCell sx={{ color: '#fff' }}>{vuln.ip || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{vuln.port || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{vuln.state || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{vuln.service || 'N/A'}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{vuln.version || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <Box sx={{ backgroundColor: '#2b2d42', borderRadius: 2, padding: 2 }}>
              <Typography variant="h6" color="white" gutterBottom>
                Scan History
              </Typography>

              {history.length === 0 ? (
                <Typography color="white">No scan history available.</Typography>
              ) : (
                <>
                  {/* Table Header */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '3fr 2fr 3fr 2fr',
                      backgroundColor: '#3a3c5a',
                      borderRadius: 1,
                      px: 2,
                      py: 1,
                      color: '#cfcfcf',
                      fontWeight: 'bold',
                      fontSize: 13,
                    }}
                  >
                    <Typography>Target IP</Typography>
                    <Typography>Scan Type</Typography>
                    <Typography>Scan Time</Typography>
                    <Typography>Status</Typography>
                  </Box>

                  {/* Data Rows */}
                  {history.map((entry, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '3fr 2fr 3fr 2fr',
                        px: 2,
                        py: 1.5,
                        borderBottom: '1px solid #444',
                        color: '#fff',
                      }}
                    >
                      <Typography>{entry.target}</Typography>
                      <Typography>{entry.scanType}</Typography>
                      <Typography>{new Date(entry.scanTime).toLocaleString()}</Typography>
                      <Typography>{entry.status}</Typography>
                    </Box>
                  ))}
                </>
              )}
            </Box>
          </TabPanel>

        </CardContent>
      </Card>
    </Container>
  );
}




// 'use client';

// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   Tabs,
//   Tab,
//   Container,
//   CircularProgress,
//   Card,
//   CardContent,
//   Divider,
//   TableContainer,
//   Table,
//   Paper,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
// } from '@mui/material';
// import { useSearchParams } from 'next/navigation';
// import InfoIcon from '@mui/icons-material/Info';
// import StorageIcon from '@mui/icons-material/Storage';
// import BugReportIcon from '@mui/icons-material/BugReport';
// import HistoryIcon from '@mui/icons-material/History';
// import { getProfileDetailsAPI } from '@/axios/apis';
// import { IconDoor, IconWifiOff, IconWifi } from '@tabler/icons-react';

// function TabPanel({ children, value, index }) {
//   return value === index ? (
//     <Box sx={{ py: 2 }}>
//       {children}
//     </Box>
//   ) : null;
// }

// export default function ScanProfileDetailsPage() {
//   const searchParams = useSearchParams();
//   const profileName = searchParams.get('profileName');

//   const [value, setValue] = useState(0);
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const handleChange = (_, newValue) => setValue(newValue);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const { data } = await getProfileDetailsAPI(profileName);
//         setProfileData(data);
//       } catch (err) {
//         setError(err.message || 'Failed to fetch profile data');
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (profileName) fetchData();
//   }, [profileName]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress size={60} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh" color="error.main">
//         <Typography variant="h6">Error: {error}</Typography>
//       </Box>
//     );
//   }

//   if (!profileData) return null;

//   const summaryStats = [
//     { icon: <StorageIcon />, value: profileData.openPorts ?? 0, label: 'Open Ports' },
//     { icon: <IconDoor />, value: profileData.closedPorts ?? 0, label: 'Closed Ports' },
//     { icon: <StorageIcon />, value: profileData.filteredPorts ?? 0, label: 'Filtered Ports' },
//     { icon: <IconWifi />, value: profileData.upCount ?? 0, label: 'Hosts Up' },
//     { icon: <IconWifiOff />, value: profileData.downCount ?? 0, label: 'Hosts Down' },
//     { icon: <StorageIcon />, value: 0, label: 'Critical Vulnerabilities' },
//     { icon: <StorageIcon />, value: 0, label: 'High Vulnerabilities' },
//     { icon: <StorageIcon />, value: 0, label: 'Medium Vulnerabilities' },
//     { icon: <StorageIcon />, value: 0, label: 'Low Vulnerabilities' },
//     {
//       icon: <BugReportIcon />,
//       value:
//         profileData.upIpAddress?.reduce((acc, host) =>
//           acc + (host.lowVulners ?? 0) + (host.mediumVulners ?? 0) + (host.highVulners ?? 0), 0
//         ) ?? 0,
//       label: 'Total Vulnerabilities',
//     },
//     { icon: <InfoIcon />, value: profileData.portDetailsList?.length ?? 0, label: 'Total Ports' },
//   ];

//   const hosts = profileData.upIpAddress?.map(host => ({
//     name: host.ipAddress,
//     vulnerabilities: [
//       { value: host.lowVulners ?? 0, color: '#4caf50' },
//       { value: host.mediumVulners ?? 0, color: '#ff9800' },
//       { value: host.highVulners ?? 0, color: '#f44336' },
//     ],
//   })) ?? [];

//   const vulnerabilities = profileData.portDetailsList ?? [];
//   const history = profileData.scanSummaries ?? [];

//   return (
//     <Container maxWidth="md" sx={{ mt: 2, mb: 4,paddingBottom: 2 }}>
//       <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
//         <CardContent>
//           <Typography variant="h5" fontWeight={600} color="primary" gutterBottom>
//             Profile: {profileData.profileName}
//           </Typography>
//           <Divider sx={{ mb: 2 }} />

//           {/* Tabs */}
//           <Tabs
//             value={value}
//             onChange={handleChange}
//             variant="scrollable"
//             scrollButtons="auto"
//             textColor="primary"
//             indicatorColor="primary"
//             sx={{
//               borderRadius: 2,
//               mb: 3,
//               backgroundColor: '#f5f5f5',
//               '.MuiTab-root': {
//                 textTransform: 'none',
//                 fontWeight: 500,
//                 borderRadius: 2,
//               },
//               '.Mui-selected': {
//                 color: '#1976d2 !important',
//               },
//             }}
//           >
//             <Tab label="Summary" icon={<InfoIcon />} iconPosition="start" />
//             <Tab label="Hosts" icon={<StorageIcon />} iconPosition="start" />
//             <Tab label="Vulnerabilities" icon={<BugReportIcon />} iconPosition="start" />
//             <Tab label="History" icon={<HistoryIcon />} iconPosition="start" />
//           </Tabs>

//           {/* Tab Content */}
//           <TabPanel value={value} index={0}>
//             <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 2 }}>
//               {summaryStats.map((item, idx) => (
//                 <Box
//                   key={idx}
//                   sx={{
//                     backgroundColor: '#f0f2f5',
//                     borderRadius: 2,
//                     p: 2,
//                     textAlign: 'center',
//                     boxShadow: 1,
//                   }}
//                 >
//                   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
//                     <Box sx={{ fontSize: 24, mr: 1 }}>{item.icon}</Box>
//                     <Typography variant="h6">{item.value}</Typography>
//                   </Box>
//                   <Typography variant="caption" color="text.secondary">
//                     {item.label}
//                   </Typography>
//                 </Box>
//               ))}
              
//             </Box>
//             <Box sx={{ borderTop: '1px solid #444', pt: 2 }}>
//                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                    <StorageIcon sx={{ color: '#4caf50', mr: 1 }} />
//                    <strong>Scan Details</strong>
//                  </Typography>
//                  <Typography variant="body2">
//                    <strong>Scan Type:</strong> {profileData.scanType}
//                  </Typography>
//                  <Typography variant="body2">
//                    <strong>Scan Start:</strong> {new Date(profileData.scanStartTime).toLocaleString()}
//                  </Typography>
//                  <Typography variant="body2">
//                    <strong>Scan End:</strong> {new Date(profileData.scanEndTime).toLocaleString()}
//                  </Typography>
//                </Box>
//           </TabPanel>

//           <TabPanel value={value} index={1}>
//             <Typography variant="subtitle1" gutterBottom>Scanned Hosts</Typography>
//             {hosts.length > 0 ? (
//               <Box>
//                 <Box
//                   sx={{
//                     display: 'grid',
//                     gridTemplateColumns: '1fr 1fr 1fr 1fr',
//                     fontWeight: 'bold',
//                     backgroundColor: '#ececec',
//                     p: 1,
//                     borderRadius: 1,
//                   }}
//                 >
//                   <Typography>Host</Typography>
//                   <Typography>Low</Typography>
//                   <Typography>Medium</Typography>
//                   <Typography>High</Typography>
//                 </Box>
//                 {hosts.map((host, i) => (
//                   <Box
//                     key={i}
//                     sx={{
//                       display: 'grid',
//                       gridTemplateColumns: '1fr 1fr 1fr 1fr',
//                       p: 1,
//                       borderBottom: '1px solid #ddd',
//                     }}
//                   >
//                     <Typography>{host.name}</Typography>
//                     {host.vulnerabilities.map((v, idx) => (
//                       <Typography key={idx} sx={{ color: v.color }}>
//                         {v.value}
//                       </Typography>
//                     ))}
//                   </Box>
//                 ))}
//               </Box>
//             ) : (
//               <Typography>No hosts found.</Typography>
//             )}
//           </TabPanel>

//           <TabPanel value={value} index={2}>
//             <Typography variant="subtitle1" gutterBottom>Vulnerabilities</Typography>
//             <TableContainer component={Paper} elevation={0}>
//               <Table size="small">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>IP</TableCell>
//                     <TableCell>Port</TableCell>
//                     <TableCell>State</TableCell>
//                     <TableCell>Service</TableCell>
//                     <TableCell>Version</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {vulnerabilities.map((v, i) => (
//                     <TableRow key={i}>
//                       <TableCell>{v.ipAddress}</TableCell>
//                       <TableCell>{v.port}</TableCell>
//                       <TableCell>{v.state}</TableCell>
//                       <TableCell>{v.service}</TableCell>
//                       <TableCell>{v.version}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </TabPanel>

//           <TabPanel value={value} index={3}>
//             <Typography variant="subtitle1" gutterBottom>Scan History</Typography>
//             {history.length === 0 ? (
//               <Typography>No scan history available.</Typography>
//             ) : (
//               <Box sx={{ fontSize: 14 }}>
//                 {history.map((entry, idx) => (
//                   <Box
//                     key={idx}
//                     sx={{
//                       display: 'grid',
//                       gridTemplateColumns: '3fr 2fr 3fr 2fr',
//                       p: 1,
//                       borderBottom: '1px solid #ddd',
//                     }}
//                   >
//                     <Typography>{entry.target}</Typography>
//                     <Typography>{entry.scanType}</Typography>
//                     <Typography>{new Date(entry.scanTime).toLocaleString()}</Typography>
//                     <Typography>{entry.status}</Typography>
//                   </Box>
//                 ))}
//               </Box>
//             )}
//           </TabPanel>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// }
