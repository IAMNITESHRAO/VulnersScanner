'use client';
import {
  Grid2 as Grid,
  InputAdornment,
  Button,
  Typography,
  Divider,
  MenuItem,
  IconButton,
} from '@mui/material';
import React from 'react';
import CustomFormLabel from '../theme-elements/CustomFormLabel';
import CustomTextField from '../theme-elements/CustomTextField';
import CustomOutlinedInput from '../theme-elements/CustomOutlinedInput';
import CustomSelect from '../theme-elements/CustomSelect';
import { Stack } from '@mui/system';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

const countries = [
  {
    value: 'india',
    label: 'India',
  },
  {
    value: 'uk',
    label: 'United Kingdom',
  },
  {
    value: 'srilanka',
    label: 'Srilanka',
  },
];

const FormLabelAlignment = () => {
  // country
  const [country, setCountry] = React.useState('');

  const handleChange = (event) => {
    setCountry(event.target.value);
  };

  //   password
  //
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    (<div>
      <Typography variant="h6" sx={{
        mb: 3
      }}>
        Account Details
      </Typography>
      {/* ------------------------------------------------------------------------------------------------ */}
      {/* Basic Layout */}
      {/* ------------------------------------------------------------------------------------------------ */}
      <Grid container spacing={3}>
        {/* 1 */}
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
          }}>
          <CustomFormLabel htmlFor="fs-uname" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            Username
          </CustomFormLabel>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <CustomTextField id="fs-uname" placeholder="John Deo" fullWidth />
        </Grid>
        {/* 2 */}
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
          }}>
          <CustomFormLabel htmlFor="fs-email" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            Email
          </CustomFormLabel>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <CustomOutlinedInput
            endAdornment={<InputAdornment position="end">@example.com</InputAdornment>}
            id="fs-email"
            placeholder="john.deo"
            fullWidth
          />
        </Grid>
        {/* 2 */}
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
          }}>
          <CustomFormLabel htmlFor="fs-pwd" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            Password
          </CustomFormLabel>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <CustomOutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <IconEyeOff size="20" /> : <IconEye size="20" />}
                </IconButton>
              </InputAdornment>
            }
            id="fs-pwd"
            placeholder="john.deo"
            fullWidth
          />
        </Grid>
        <Grid size={12}>
          <Divider sx={{ mx: '-24px' }} />
          <Typography variant="h6" sx={{
            mt: 2
          }}>
            Personal Info
          </Typography>
        </Grid>

        {/* 4 */}
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
          }}>
          <CustomFormLabel htmlFor="fs-fname" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            Full Name
          </CustomFormLabel>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <CustomTextField id="fs-fname" placeholder="John Deo" fullWidth />
        </Grid>
        {/* 4 */}
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
          }}>
          <CustomFormLabel htmlFor="fs-country" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            Country
          </CustomFormLabel>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <CustomSelect
            id="standard-select-currency"
            value={country}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          >
            {countries.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </CustomSelect>
        </Grid>
        {/* 4 */}
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
          }}>
          <CustomFormLabel htmlFor="fs-date" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            Birth Date
          </CustomFormLabel>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <CustomTextField type="date" id="fs-date" placeholder="John Deo" fullWidth />
        </Grid>
        {/* 4 */}
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end"
          }}>
          <CustomFormLabel htmlFor="fs-phone" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
            Phone no
          </CustomFormLabel>
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <CustomTextField id="fs-phone" placeholder="123 4567 201" fullWidth />
        </Grid>
        <Grid
          size={{
            xs: 12,
            sm: 3
          }}></Grid>
        <Grid
          size={{
            xs: 12,
            sm: 9
          }}>
          <Stack direction="row" spacing={2}>
            <Button variant="contained" color="primary">
              Submit
            </Button>
            <Button variant="text" color="error">
              Cancel
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </div>)
  );
};

export default FormLabelAlignment;
