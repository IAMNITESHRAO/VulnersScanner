import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import { IconFileDescription, IconSettingsCode, IconShieldCog, IconDatabaseSearch } from '@tabler/icons-react';

const features = [
  {
    icon: <IconShieldCog size={36} color="white" />,
    title: "0.08% false positive rate",
    description:
      "Snyk’s API & Web scanner can detect over 30,000 potential vulnerabilities. With a false positive rate of 0.08%, find the security vulnerabilities that matter."
  },
  {
    icon: <IconFileDescription size={36} color="white" />,
    title: "Evidence-based reporting",
    description:
      "Time is extremely valuable for both development and security teams. Get context and proof of all relevant findings."
  },
  {
    icon: <IconSettingsCode size={36} color="white" />,
    title: "Fixed guidance",
    description:
      "Get detailed instructions on how to fix the vulnerabilities based on the technology identified in your web applications and APIs."
  },
  {
    icon: <IconDatabaseSearch size={36} color="white" />,
    title: "Vulnerability database",
    description: (
      <>
        Snyk maintains and owns an extensive and proprietary{' '}
        <Link href="#" underline="hover" color="#87bfff">
          list of vulnerabilities
        </Link>{' '}
        findable by its DAST engine, which includes 115 different types applicable specifically to APIs.
      </>
    )
  }
];

const SnykHeader = () => (
  <Box sx={{ textAlign: 'center', mb: 6, px: { xs: 2, md: 0 } }}>
    <Typography
      variant="h4"
      fontWeight="bold"
      sx={{  mb: 2, fontFamily: 'Oswald, sans-serif' }}
    >
      GET STARTED WITH SNYK API & WEB
    </Typography>
    <Typography
      variant="body1"
      sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}
    >
      Uncover all your unknowns and test them for vulnerabilities. No matter your job function, department, or team, Snyk can help you work towards reducing your cyber security risk with focus, efficiency, and speed.
    </Typography>
    <Link
      href="#"
      underline="none"
      sx={{
        color: '#87bfff',
        fontWeight: 'bold',
        fontSize: '1rem',
        '&:hover': { textDecoration: 'underline' },
        cursor: 'pointer',
      }}
    >
      Compare all plans &rarr;
    </Link>
  </Box>
);

const SnykFeatures = () => {
  return (
    <Box sx={{ py: 4, px: 4, minHeight: '90vh' }}>
      <SnykHeader />
      <Grid container spacing={4} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} sx={{ textAlign: 'center' }}>
            <Box
              sx={{
                mb: 2,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1e1f3f',
                borderRadius: '15px',
                width: 80,
                height: 80
              }}
            >
              {feature.icon}
            </Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              {feature.title}
            </Typography>
            <Typography variant="body1" sx={{ px: 1 }}>
              {feature.description}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SnykFeatures;
