'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import PageContainer from '@/app/components/container/PageContainer';
import Image from 'next/image';
import Button from '@mui/material/Button';
import AuthForgotPassword from '../../authForms/AuthForgotPassword';
import AuthLogo from '@/app/dashboard/layout/shared/logo/AuthLogo';

export default function ForgotPassword() {
  return (
    <PageContainer title="Forgot Password Page" description="This is a sample Forgot Password page">
      <Grid
        container
        spacing={0}
        sx={{
          justifyContent: 'center',
          height: '100vh',
          overflowX: 'hidden',
        }}
      >
        {/* Background Grid */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={8}
          xl={9}
          sx={{
            position: 'relative',
            '&:before': {
              content: '""',
              background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
              backgroundSize: '400% 400%',
              animation: 'gradient 15s ease infinite',
              position: 'absolute',
              height: '100%',
              width: '100%',
              opacity: '0.3',
              zIndex: 0,
            },
          }}
        >
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ px: 3 }}>
              <AuthLogo />
            </Box>
            <Box
              sx={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 'calc(100vh - 75px)',
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <Image
                src="/images/backgrounds/login-bg.svg"
                alt="Forgot Password Background"
                width={500}
                height={500}
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  maxHeight: '500px',
                }}
              />
            </Box>
          </Box>
        </Grid>

        {/* Form Grid */}
        <Grid
          item
          xs={12}
          sm={12}
          lg={4}
          xl={3}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box sx={{ p: 4, width: '100%', maxWidth: '400px' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              Forgot your password?
            </Typography>

            <Typography
              color="textSecondary"
              variant="subtitle2"
              sx={{ fontWeight: 400, mt: 2 }}
            >
              Please enter the email address associated with your account and we will send you a link
              to reset your password.
            </Typography>

            <AuthForgotPassword />

            {/* Back to Login Button */}
            {/* <Box mt={2}>
              <Button
                fullWidth
                component={Link}
                href="/auth/auth1/login"
                variant="text"
                sx={{ mt: 1, color: 'primary.main' }}
              >
                Back to Login
              </Button>
            </Box> */}
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
