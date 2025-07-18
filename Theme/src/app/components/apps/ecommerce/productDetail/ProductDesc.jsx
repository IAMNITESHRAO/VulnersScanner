'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { IconPencil } from '@tabler/icons-react';
import ChildCard from '../../../../components/shared/ChildCard';

// progress
function ProgressBar({ like, star, value, ...others }) {
  return (
    (<Box
      sx={{
        display: 'flex',
        alignItems: "center",
        gap: "20px"
      }}>
      <Box sx={{ minWidth: 50 }}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(star)} Stars`}</Typography>
      </Box>
      <Box sx={{ width: '100%' }}>
        <LinearProgress value={value} variant="determinate" color="primary" {...others} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="subtitle2">{`(${Math.round(like)})`}</Typography>
      </Box>
    </Box>)
  );
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ProductDesc = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    (<ChildCard>
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: 'grey.100' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="primary"
            allowScrollButtonsMobile
            scrollButtons
            indicatorColor="primary"
          >
            <Tab label="Description" {...a11yProps(0)} />
            <Tab label="Reviews" {...a11yProps(1)} />
          </Tabs>
        </Box>
        {/* ------------------------------------------- */}
        {/* Decription */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={0}>
          <Typography variant="h5">
            Sed at diam elit. Vivamus tortor odio, pellentesque eu tincidunt a, aliquet sit amet
            lorem pellentesque eu tincidunt a, aliquet sit amet lorem.
          </Typography>
          <Typography color="textSecondary" sx={{
            mt: 4
          }}>
            Cras eget elit semper, congue sapien id, pellentesque diam. Nulla faucibus diam nec
            fermentum ullamcorper. Praesent sed ipsum ut augue vestibulum malesuada. Duis vitae
            volutpat odio. Integer sit amet elit ac justo sagittis dignissim.
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
            sx={{
              fontWeight: 400,
              mt: 4
            }}>
            Vivamus quis metus in nunc semper efficitur eget vitae diam. Proin justo diam, venenatis
            sit amet eros in, iaculis auctor magna. Pellentesque sit amet accumsan urna, sit amet
            pretium ipsum. Fusce condimentum venenatis mauris et luctus. Vestibulum ante ipsum
            primis in faucibus orci luctus et ultrices posuere cubilia curae;
          </Typography>
        </TabPanel>
        {/* ------------------------------------------- */}
        {/* Reviews Tab */}
        {/* ------------------------------------------- */}
        <TabPanel value={value} index={1}>
          <Grid container spacing={3}>
            {/* ------------------------------------------- */}
            {/* Average Rate Tab */}
            {/* ------------------------------------------- */}
            <Grid
              size={{
                xs: 12,
                lg: 4
              }}>
              <Paper variant="outlined" sx={{ height: '100%', p: 3 }}>
                <Stack
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: '100%'
                  }}>
                  <Typography variant="subtitle1">Average Rating</Typography>
                  <Typography variant="h1" color="primary" sx={{
                    fontWeight: 600
                  }}>
                    4/5
                  </Typography>
                  <Rating name="rate" value={4} />
                </Stack>
              </Paper>
            </Grid>
            {/* ------------------------------------------- */}
            {/* Progrees Rate Tab */}
            {/* ------------------------------------------- */}
            <Grid
              size={{
                xs: 12,
                lg: 4
              }}>
              <Paper variant="outlined" sx={{ p: 3 }}>
                <Grid
                  container
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}>
                  <Grid size={12}>
                    <ProgressBar star={1} value={45} like={485} />
                  </Grid>
                  <Grid size={12}>
                    <ProgressBar star={2} value={25} like={215} />
                  </Grid>
                  <Grid size={12}>
                    <ProgressBar star={3} value={20} like={110} />
                  </Grid>
                  <Grid size={12}>
                    <ProgressBar star={4} value={80} like={620} />
                  </Grid>
                  <Grid size={12}>
                    <ProgressBar star={5} value={12} like={160} />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {/* ------------------------------------------- */}
            {/* Button */}
            {/* ------------------------------------------- */}
            <Grid
              size={{
                xs: 12,
                lg: 4
              }}>
              <Paper sx={{ height: '100%', p: 3 }} variant="outlined">
                <Stack
                  spacing={2}
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: '100%'
                  }}>
                  <Button variant="outlined" size="large" startIcon={<IconPencil />}>
                    Write an Review
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Box>
    </ChildCard>)
  );
};

export default ProductDesc;
