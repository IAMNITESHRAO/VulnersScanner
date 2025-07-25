import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// components
import Logo from '@/app/dashboard/layout/shared/logo/Logo';
import PageContainer from '@/app/components/container/PageContainer';
import AuthLogin from '../../authForms/AuthLogin';

export default function Login2() {

  return (
    (<PageContainer title="Login Page" description="this is Sample page">
      <Box
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
          },
        }}
      >
        <Grid
          container
          spacing={0}
          sx={{
            justifyContent: "center",
            height: '100vh'
          }}>
          <Grid
            size={{
              xs: 12,
              sm: 12,
              lg: 5,
              xl: 4
            }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                <Logo />
              </Box>
              <AuthLogin
                subtitle={
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      justifyContent: "center",
                      mt: 3
                    }}>
                    <Typography color="textSecondary" variant="h6" sx={{
                      fontWeight: "500"
                    }}>
                      New to Modernize?
                    </Typography>
                    <Typography
                      component={Link}
                      href="/auth/auth2/register"
                      sx={{
                        fontWeight: "500",
                        textDecoration: 'none',
                        color: 'primary.main'
                      }}>
                      Create an account
                    </Typography>
                  </Stack>
                }
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>)
  );
};


