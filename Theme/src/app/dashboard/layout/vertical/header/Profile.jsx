'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { IconMail } from '@tabler/icons-react';
import { Stack } from '@mui/system';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useUserDetails from '@/app/hooks/useUserDetails';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const router = useRouter();
  const { userDetails } = useUserDetails();

  const handleClick2 = (event) => setAnchorEl2(event.currentTarget);
  const handleClose2 = () => setAnchorEl2(null);

  const handleLogout = () => {
    Cookies.remove('token');
    router.push('/auth/auth1/login');
  };

  return (
    <Box>
      <IconButton
        color="inherit"
        aria-label="account"
        onClick={handleClick2}
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
      >
        <Avatar
          src="/images/profile/user-1.jpg"
          alt="ProfileImg"
          sx={{ width: 35, height: 35 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl2}
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: 260,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <Stack direction="row" spacing={2} sx={{ py: 1, alignItems: 'center' }}>
          <Avatar src="/images/profile/user-1.jpg" alt="ProfileImg" sx={{ width: 45, height: 45 }} />
          <Box>
            <Typography variant="subtitle2" fontWeight={600} noWrap>
              {userDetails?.ssoId || 'Guest'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              {userDetails?.designation || 'N/A'}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconMail width={15} height={15} />
              info@modernize.com
            </Typography>
          </Box>
        </Stack>

        <Box mt={2}>
          <Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Menu>
    </Box>
  );
};

export default Profile;
