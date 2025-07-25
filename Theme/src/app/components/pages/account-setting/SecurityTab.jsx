import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

// components
import BlankCard from '../../shared/BlankCard';
import { Stack } from '@mui/system';
import { IconDeviceLaptop, IconDeviceMobile, IconDotsVertical } from '@tabler/icons-react';

const SecurityTab = () => {
  return (<>
    <Grid container spacing={3} sx={{
      justifyContent: "center"
    }}>
      <Grid
        size={{
          xs: 12,
          lg: 8
        }}>
        <BlankCard>
          <CardContent>
            <Typography variant="h4" sx={{
              mb: 2
            }}>
              Two-factor Authentication
            </Typography>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                mb: 4
              }}>
              <Typography variant="subtitle1" color="textSecondary">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corporis sapiente sunt
                earum officiis laboriosam ut.
              </Typography>
              <Button variant="contained" color="primary">
                Enable
              </Button>
            </Stack>

            <Divider />

            {/* list 1 */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                py: 2,
                alignItems: "center"
              }}>
              <Box>
                <Typography variant="h6">Authentication App</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Google auth app
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto !important' }}>
                <Button variant="text" color="primary">
                  Setup
                </Button>
              </Box>
            </Stack>
            <Divider />
            {/* list 2 */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                py: 2,
                alignItems: "center"
              }}>
              <Box>
                <Typography variant="h6">Another e-mail</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  E-mail to send verification link
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto !important' }}>
                <Button variant="text" color="primary">
                  Setup
                </Button>
              </Box>
            </Stack>
            <Divider />
            {/* list 3 */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                py: 2,
                alignItems: "center"
              }}>
              <Box>
                <Typography variant="h6">SMS Recovery</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Your phone number or something
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto !important' }}>
                <Button variant="text" color="primary">
                  Setup
                </Button>
              </Box>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>
      <Grid
        size={{
          xs: 12,
          lg: 4
        }}>
        <BlankCard>
          <CardContent>
            <Avatar
              variant="rounded"
              sx={{ bgcolor: 'primary.light', color: 'primary.main', width: 48, height: 48 }}
            >
              <IconDeviceLaptop size="26" />
            </Avatar>

            <Typography variant="h5" sx={{
              mt: 2
            }}>
              Devices
            </Typography>
            <Typography
              color="textSecondary"
              sx={{
                mt: 1,
                mb: 2
              }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit Rem.
            </Typography>
            <Button variant="contained" color="primary">
              Sign out from all devices
            </Button>

            {/* list 1 */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                py: 2,
                mt: 3,
                alignItems: "center"
              }}>
              <IconDeviceMobile size="26" />

              <Box>
                <Typography variant="h6">iPhone 14</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  London UK, Oct 23 at 1:15 AM
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto !important' }}>
                <IconButton>
                  <IconDotsVertical size="22" />
                </IconButton>
              </Box>
            </Stack>
            <Divider />
            {/* list 2 */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                py: 2,
                alignItems: "center"
              }}>
              <IconDeviceLaptop size="26" />

              <Box>
                <Typography variant="h6">Macbook Air </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Gujarat India, Oct 24 at 3:15 AM
                </Typography>
              </Box>
              <Box sx={{ ml: 'auto !important' }}>
                <IconButton>
                  <IconDotsVertical size="22" />
                </IconButton>
              </Box>
            </Stack>
            <Stack>
              <Button variant="text" color="primary">
                Need Help ?
              </Button>
            </Stack>
          </CardContent>
        </BlankCard>
      </Grid>
    </Grid>
    <Stack
      direction="row"
      spacing={2}
      sx={{
        mt: 3,
        justifyContent: 'end'
      }}>
      <Button size="large" variant="contained" color="primary">
        Save
      </Button>
      <Button size="large" variant="text" color="error">
        Cancel
      </Button>
    </Stack>
  </>);
};

export default SecurityTab;
