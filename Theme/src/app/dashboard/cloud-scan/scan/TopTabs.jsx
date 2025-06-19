'use client';
import React, { useState } from 'react';
import { Box, CardContent, Divider, Grid, Tab, Tabs, Typography } from '@mui/material';
import {
  Cloud, CheckCircle, HourglassEmpty, Cancel, ReportProblem
} from '@mui/icons-material';

const topcards = [
  {
    title: "All",
    status: null,
    digitsKey: 'total',
    icon: <Cloud />
  },
  {
    title: "Services",
    status: "SERVICES",
    digitsKey: 'nonCompliant',
    icon: <ReportProblem />
  },
  {
    title: "Compliance",
    status: "COMPLIANCE",
    digitsKey: 'compliant',
    icon: <CheckCircle />
  },
  {
    title: "Security Hub",
    status: "PENDING",
    digitsKey: 'pending',
    icon: <HourglassEmpty />
  },
  {
    title: "AWS",
    status: "NOT_APPLICABLE",
    digitsKey: 'notApplicable',
    icon: <Cancel />
  },
];

const TabPanel = ({ children, value, index }) => {
  return value === index && (
    <Box p={2}>
      {children}
    </Box>
  );
};

const TopTabs = ({ fullData = [], onCardClick }) => {  // Defaulting fullData to an empty array
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Box sx={{ maxWidth: '100%', bgcolor: 'background.paper' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons="auto"
            variant="scrollable"
            allowScrollButtonsMobile
            aria-label="status filter tabs"
          >
            {topcards.map((card, index) => (
              <Tab
                key={index}
                icon={card.icon}
                iconPosition="start"
                label={card.title}
                sx={{ minWidth: 120 }}
              />
            ))}
          </Tabs>
        </Box>
        <Divider />
        <CardContent>
          {topcards.map((card, index) => (
            <TabPanel value={value} index={index} key={index}>
              {/* Ensure fullData is an array and has length */}
              {Array.isArray(fullData) && fullData.length > 0 ? (
                fullData.map((item, idx) => (
                  <Typography key={idx}>
                    {/* Display the data based on your structure */}
                    {JSON.stringify(item)}
                  </Typography>
                ))
              ) : (
                <Typography>No data available</Typography>
              )}
            </TabPanel>
          ))}
        </CardContent>
      </Grid>
    </Grid>
  );
};

export default TopTabs;
