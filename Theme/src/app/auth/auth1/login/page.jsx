// 'use client';

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import Link from 'next/link';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import PageContainer from '@/app/components/container/PageContainer';
// import Image from 'next/image';
// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { FormControlLabel } from '@mui/material';
// import { Checkbox } from 'formik-mui';
// import Logo from '@/app/dashboard/layout/shared/logo/Logo';
// import { useSelector } from 'react-redux';
// import AuthLogo from '@/app/dashboard/layout/shared/logo/AuthLogo';

// export default function Login() {
//   const router = useRouter();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const customizer = useSelector((state) => state.customizer);

//   // const handleLogin = (e) => {
//   //   e.preventDefault();

//   //   const validUsername = 'cc118';
//   //   const validPassword = 'Admin@123';

//   //   if (username === validUsername && password === validPassword) {
//   //     localStorage.setItem('isLoggedIn', 'true');
//   //     router.push('/dashboard');
//   //   } else {
//   //     setError('Invalid Credentials');
//   //   }
//   // };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ username, password }),
//       });

//       let result;
//       try {
//         result = await response.json();
//       } catch (jsonErr) {
//         const text = await response.text();
//         result = { message: text };
//       }

//       if (!response.ok) {
//         setError(result.message || 'Login failed');
//         return;
//       }

//       // Save username temporarily for OTP verification step
//       localStorage.setItem('username', username);

//       router.push('/auth/auth1/two-steps');
//     } catch (err) {
//       setError('Something went wrong');
//       console.error(err);
//     }
//   };


//   return (
//     <PageContainer title="Login Page" description="this is Sample page">
//       <Grid container spacing={0} sx={{ justifyContent: 'center', height: '100vh' }}>
//         <Grid
//           sx={{
//             position: 'relative',
//             '&:before': {
//               content: '""',
//               background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
//               backgroundSize: '400% 400%',
//               animation: 'gradient 15s ease infinite',
//               position: 'absolute',
//               height: '100%',
//               width: '100%',
//               opacity: '0.3',
//             },
//           }}
//           item
//           xs={12}
//           sm={12}
//           lg={7}
//           xl={8}
//         >
//           <Box sx={{ position: 'relative' }}>
//             <Box sx={{ px: 3 }}>
//               <AuthLogo />
//             </Box>
//             <Box
//               sx={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 height: 'calc(100vh - 75px)',
//                 display: {
//                   xs: 'none',
//                   lg: 'flex',
//                 },
//               }}
//             >
//               <Image
//                 src="/images/backgrounds/login-bg.svg"
//                 alt="bg"
//                 width={500}
//                 height={500}
//                 style={{
//                   width: '100%',
//                   maxWidth: '500px',
//                   maxHeight: '500px',
//                 }}
//               />
//             </Box>
//           </Box>
//         </Grid>
//         <Grid
//           item
//           xs={12}
//           sm={12}
//           lg={5}
//           xl={4}
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}
//         >
//           <Box sx={{ p: 4, width: '100%', maxWidth: '400px' }}>
//             <Typography variant="h4" gutterBottom>
//               Welcome to Modernize
//             </Typography>
//             <Typography variant="subtitle1" color="textSecondary" mb={3}>
//               Your Admin Dashboard
//             </Typography>

//             <form onSubmit={handleLogin}>
//               {error && (
//                 <Typography color="error" mb={2}>
//                   {error}
//                 </Typography>
//               )}
//               <TextField
//                 fullWidth
//                 label="Username"
//                 variant="outlined"
//                 margin="normal"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//               />
//               <TextField
//                 fullWidth
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 margin="normal"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//               <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
//                 Send OTP
//               </Button>
//             </form>

//             <Box
//               sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 mt: 1,
//               }}
//             >
//               <Link
//                 href="/auth/auth1/forgot-password"
//                 style={{
//                   textDecoration: 'none',
//                   color: '#1976d2',
//                   fontWeight: '500',
//                 }}
//               >
//                 Forgot Password?
//               </Link>
//             </Box>

//             <Stack direction="row" spacing={1} mt={3}>
//               <Typography color="textSecondary" variant="h6" fontWeight="500">
//                 New to Modernize?
//               </Typography>
//               <Typography
//                 component={Link}
//                 href="/auth/auth1/register"
//                 sx={{ fontWeight: 500, textDecoration: 'none', color: 'primary.main' }}
//               >
//                 Create an account
//               </Typography>
//             </Stack>
//           </Box>
//         </Grid>
//       </Grid>
//     </PageContainer>
//   );
// }


'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PageContainer from '@/app/components/container/PageContainer';
import { Alert, Box, Grid, Link, Stack, Snackbar } from '@mui/material';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import AuthLogo from '@/app/dashboard/layout/shared/logo/AuthLogo';
import Cookies from 'js-cookie';


export default function LoginWithOtp() {
  const router = useRouter();
  const customizer = useSelector((state) => state.customizer);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(60);

  // Snackbar states
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');

  const showSnackbar = (message, severity = 'error') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    let timer;
    if (showOtpForm && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setShowOtpForm(false);
            showSnackbar('OTP expired. Please login again.', 'error');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showOtpForm, secondsLeft]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        const text = await response.text();
        result = { message: text };
      }

      if (!response.ok) {
        showSnackbar(result.message || 'Login failed');
        setLoading(false);
        return;
      }

      setShowOtpForm(true);
      setSecondsLeft(60);
    } catch (err) {
      // console.error('Login error:', err);
      showSnackbar('Enter correct Username/Password');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!username) {
      showSnackbar('Username missing');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_AUTH_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, otp }),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        const text = await response.text();
        result = { message: text };
      }

      if (!response.ok) {
        showSnackbar(result.message || 'OTP verification failed');
        return;
      }

      // Store JWT & User info
      localStorage.setItem('token', result.jwtToken);
      localStorage.setItem('username', result.username);
      localStorage.setItem('roles', JSON.stringify(result.roles));

      // Cookies.set('token', result.jwtToken, { expires: 1 }); // 1 day expiry
     Cookies.set('token', result.jwtToken, { secure: true, sameSite: 'Lax', path: '/' });
      Cookies.set('username', result.username);
      Cookies.set('roles', JSON.stringify(result.roles));

      showSnackbar('Login successful!', 'success');
      router.push('/dashboard');
    } catch (err) {
      // console.error('Error verifying OTP:', err);
      showSnackbar('Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Dhanush Guard" description="this is Authentication page">
      <Grid container spacing={0} sx={{ justifyContent: 'center', height: '100vh' }}>
        <Grid item xs={12} sm={12} lg={7} xl={8} sx={{
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
        }}>
          <Box sx={{ position: 'relative', px: 3 }}>
            <AuthLogo />
            <Box sx={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 'calc(100vh - 75px)',
              display: { xs: 'none', lg: 'flex' },
            }}>
              <Image
                src="/images/backgrounds/login-bg.svg"
                alt="bg"
                width={500}
                height={500}
                style={{ width: '100%', maxWidth: '500px', maxHeight: '500px' }}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} lg={5} xl={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ p: 4, width: '100%', maxWidth: '400px' }}>
            <Typography variant="h4" gutterBottom>
              Welcome to Dhanush Guard
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mb={3}>
              Your Admin Dashboard
            </Typography>

            {!showOtpForm ? (
              <form onSubmit={handleLogin}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="outlined"
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  variant="outlined"
                  margin="normal"
                  value={otp}
                  inputProps={{ maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*' }}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,6}$/.test(value)) setOtp(value);
                  }}
                />
                <Typography variant="body2" color="textSecondary" mt={1}>
                  OTP expires in {secondsLeft} seconds
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Link href="/auth/auth1/forgot-password" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: '500' }}>
                Forgot Password?
              </Link>
            </Box>

            <Stack direction="row" spacing={1} mt={3}>
              <Typography color="textSecondary" variant="h6" fontWeight="500">
                New to Dhanush Guard?
              </Typography>
              <Typography
                component={Link}
                href="/auth/auth1/register"
                sx={{ fontWeight: 500, textDecoration: 'none', color: 'primary.main' }}
              >
                Create an account
              </Typography>
            </Stack>
          </Box>
        </Grid>
      </Grid>

      {/* Snackbar for top-right alerts */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
}
