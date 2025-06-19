import React from 'react';
import { Grid, Typography, Box } from '@mui/material';

const ApiScanningSection = () => {
  return (
    <Box sx={{ py: 6, px: 0 }}>

      <Grid container alignItems="center" spacing={4}>
        {/* Left Side - Image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/images/svgs/api-scanning.svg" 
            alt="API Scanning Visual"
            sx={{
              width: '100%',
              maxWidth: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
        </Grid>

        {/* Right Side - Text */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
              lineHeight: 1.2,
            }}
          >
            State-of-the-art API Scanning
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: 15,
              lineHeight: 1.8,
              fontWeight: 400,
            }}
          >
            Snyk API & Web’s AI-powered API security testing engine helps revolutionize the way APIs are tested, to help better map the ever-growing API attack surface and automate the scanning of vulnerabilities.
            <br />
            <br />
            The API vulnerability scanner can detect large amounts of potential vulnerabilities, allowing your teams to actively run security testing as part of their API development process.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ApiScanningSection;
