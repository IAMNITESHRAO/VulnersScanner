// 'use client';
// import React, { useState } from 'react';
// import { Box, CardContent, Chip, Divider, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
// import { Cloud, CheckCircle, HourglassEmpty, Cancel, ReportProblem } from '@mui/icons-material';
// import { IconCloudFilled } from '@tabler/icons-react';
// import { IconCategoryFilled } from '@tabler/icons-react';
// import { IconComponents } from '@tabler/icons-react';
// import { IconCloudLock } from '@tabler/icons-react';
// import { IconCloudUpload } from '@tabler/icons-react';
// import { IconFileDescription } from '@tabler/icons-react';

// const ServiceTabs = ({ statusDataWidgets, onCardClick }) => {
//   const [selectedTab, setSelectedTab] = useState(0);
  
//   const topcards = [
//     {
//       title: "All",
//       status: null,
//       digits: statusDataWidgets?.total || 0,
//       bgcolor: "primary",
//       icon: <IconCloudFilled />
//     },
//     {
//       title: "Services",
//       status: "SERVICES",
//       digits: statusDataWidgets?.categories || 0,
//       bgcolor: "error",
//       icon: <IconCategoryFilled />
//     },
//     {
//       title: "Compliance",
//       status: "COMPLIANCE",
//       digits: statusDataWidgets?.compliance || 0,
//       bgcolor: "success",
//       icon: <IconComponents />
//     },
//     {
//       title: "Security Hub",
//       status: "SECURITYHUB",
//       digits: statusDataWidgets?.securityhub || 0,
//       bgcolor: "#FFFF8F",
//       textColor: "#FFBF00",
//       icon: <IconCloudLock />
//     },
//     {
//       title: "YML",
//       status: "YML",
//       digits: statusDataWidgets?.yml || 0,
//       bgcolor: "info",
//       icon: <IconFileDescription />
//     },
//     {
//       title: "Cloud Type",
//       status: "CLOUDTYPE",
//       digits: statusDataWidgets?.cloudType || 0,
//       bgcolor: "info",
//       icon: <IconCloudUpload />
//     }
//   ];
  

//   const handleTabChange = (event, newValue) => {
//     setSelectedTab(newValue);
//     onCardClick(topcards[newValue].status);
//   };

//   return (
//    <Grid container spacing={0} sx={{ m: 0, p: 0 }}>
//   <Grid item xs={12} sx={{ p: 0 }}>
//     <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper', m: 0, p: 0 }}>
//       <Tabs
//         value={selectedTab}
//         onChange={handleTabChange}
//         aria-label="status filter tabs"
//         sx={{
//           minHeight: 36,
//           m: 0,
//           p: 0,
//           '& .MuiTabs-indicator': {
//             height: 3,
//           },
//         }}
//       >
//         {topcards.map((card, index) => (
//           <Tab
//             key={index}
//             icon={card.icon}
//             iconPosition="start"
//             label={card.title}
//             sx={{
//               minWidth: 80,
//               height: 36,
//               padding: '4px 16px',
//               gap: 0.5,
//               m: 0,
//             }}
//           />
//         ))}
//       </Tabs>
//     </Box>

//     <Divider sx={{ m: 0 }} />

//     <CardContent sx={{ padding: 0 }}>
//       {topcards.map((card, index) => (
//         <TabPanel value={selectedTab} index={index} key={index}>
//           <Box
//             sx={{
//               border: '1px solid #1976d2',
//               borderRadius: 1,
//               px: 1,
//               display: 'inline-flex',
//               alignItems: 'center',
//               gap: 1,
//               bgcolor: '#E3F2FD',
//             }}
//           >
//             <Typography variant="subtitle1" fontWeight="bold" color="primary">
//               {card.title}:
//             </Typography>
//             <Typography variant="h6" color="primary">
//               {card.digits}
//             </Typography>
//           </Box>
//         </TabPanel>
//       ))}
//     </CardContent>
//   </Grid>
// </Grid>
//   );
// };

// const TabPanel = ({ children, value, index }) => {
//   return value === index && (
//     <Box p={1}>
//       {children}
//     </Box>
//   );
// };

// export default ServiceTabs;

'use client';
import React, { useState } from 'react';
import {
  Box,
  CardContent,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  IconCloudFilled,
  IconCategoryFilled,
  IconComponents,
  IconCloudLock,
  IconCloudUpload,
  IconFileDescription,
} from '@tabler/icons-react';

const ServiceTabs = ({ statusDataWidgets, onCardClick }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const topcards = [
    {
      title: 'All',
      status: null,
      digits: statusDataWidgets?.total || 0,
      icon: <IconCloudFilled size={20} />,
    },
    {
      title: 'Services',
      status: 'SERVICES',
      digits: statusDataWidgets?.categories || 0,
      icon: <IconCategoryFilled size={20} />,
    },
    {
      title: 'Compliance',
      status: 'COMPLIANCE',
      digits: statusDataWidgets?.compliance || 0,
      icon: <IconComponents size={20} />,
    },
    {
      title: 'Security Hub',
      status: 'SECURITYHUB',
      digits: statusDataWidgets?.securityhub || 0,
      icon: <IconCloudLock size={20} />,
    },
    {
      title: 'YML',
      status: 'YML',
      digits: statusDataWidgets?.yml || 0,
      icon: <IconFileDescription size={20} />,
    },
    {
      title: 'Cloud Type',
      status: 'CLOUDTYPE',
      digits: statusDataWidgets?.cloudType || 0,
      icon: <IconCloudUpload size={20} />,
    },
  ];

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    onCardClick(topcards[newValue].status);
  };

  return (
    <Grid container spacing={0} sx={{ m: 0, p: 0 }}>
      <Grid item xs={12} sx={{ p: 0 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
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
              color: '#444',
              '&:hover': {
                color: '#1976d2',
                backgroundColor: '#f5faff',
              },
              '&.Mui-selected': {
                color: '#1976d2',
              },
            },
            mt: 0,
            mb: 0,
          }}
        >
          {topcards.map((card, index) => (
            <Tab
              key={index}
              icon={card.icon}
              iconPosition="start"
              label={card.title}
              sx={{height: 32,padding: '4px 16px',
               gap: 0.5,}}
            />
          ))}
        </Tabs>

        <CardContent sx={{marginTop: 2 }}>
          {topcards.map((card, index) => (
            <TabPanel value={selectedTab} index={index} key={index}>
              <Box
                sx={{
                  border: '1px solid #1976d2',
                  borderRadius: 1,
                  px: 0.5,
                  py: 0.5,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: '#E3F2FD',
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight={600}
                  color="primary"
                >
                  {card.title}:
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  color="primary"
                >
                  {card.digits}
                </Typography>
              </Box>
            </TabPanel>
          ))}
        </CardContent>
      </Grid>
    </Grid>
  );
};

const TabPanel = ({ children, value, index }) => {
  return value === index ? <Box>{children}</Box> : null;
};

export default ServiceTabs;
