import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Logo from '@/app/dashboard/layout/shared/logo/Logo';
import PageContainer from '@/app/components/container/PageContainer';
import AuthTwoSteps from '../../authForms/AuthTwoSteps';

export default function TwoSteps2() {
  return (
    (<PageContainer title="Two steps Page" description="this is Sample page">
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
              <Typography
                variant="subtitle1"
                color="textSecondary"
                sx={{
                  textAlign: "center",
                  mb: 1
                }}>
                We sent a verification code to your mobile. Enter the code from the mobile in the
                field below.
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  textAlign: "center",
                  fontWeight: "700",
                  mb: 1
                }}>
                ******1234
              </Typography>
              <AuthTwoSteps />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>)
  );
};


