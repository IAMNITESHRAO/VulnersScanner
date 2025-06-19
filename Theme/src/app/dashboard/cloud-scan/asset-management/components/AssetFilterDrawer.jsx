'use client';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Switch,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconFilter } from '@tabler/icons-react';

export default function AssetFilterDrawer({
  selectedCloudTypes,
  selectedRegions,
  statusFilter,
  setStatusFilter,
  handleCheckboxChange,
}) {
  const theme = useTheme();

  const handleStatusChange = (key, value) => {
    let updated = { ...statusFilter };
    if (key === 'all') {
      updated = {
        all: value,
        active: value,
        inactive: value,
      };
    } else {
      updated[key] = value;
      updated.all = updated.active && updated.inactive;
    }
    setStatusFilter(updated);
  };

  return (
    <Box
  sx={{
    width: 240,
    height: 425,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '8px',
    boxShadow: 1,
    overflow: 'hidden', // important to prevent overflow of curved bg
}}
>
  {/* Header section (flat, no curve) */}
  <Box
    sx={{
      padding: 0.1,
      bgcolor: theme.palette.primary.light,
      color:
        theme.palette.mode === 'dark'
          ? theme.palette.common.white
          : theme.palette.common.black,
      borderRadius: 0, // ensures no curve
    }}
  >
    <Typography
      variant="subtitle1"
      fontWeight={600}
      sx={{
        fontSize: '0.975rem',
        mb: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center',padding: "2px 10px", }}>
        <IconFilter sx={{ fontSize: '1.2rem' }} />
      </Box>
      Filters
    </Typography>
  </Box>


      <Divider />

      {/* Filter content (white background) */}
      <Box sx={{ paddingLeft: 2, paddingBottom: 1, paddingTop: 1, height: 'calc(100% - 50px)', overflowY: 'auto' }}>
        <Typography fontWeight={600} mb={0.5} sx={{ fontSize: '.875rem' }}>
          Cloud Type
        </Typography>
        <FormGroup sx={{ mb: 1 }}>
          {['aws', 'azure', 'gcp'].map((type) => (
            <FormControlLabel
              key={type}
              control={
                <Checkbox
                  size="small"
                  checked={selectedCloudTypes.includes(type)}
                  onChange={() => handleCheckboxChange('cloud', type)}
                />
              }
              label={<Typography sx={{ fontSize: '.7rem' }}>{type.toUpperCase()}</Typography>}
            />
          ))}
        </FormGroup>

        <Typography fontWeight={600} mb={0.5} sx={{ fontSize: '.875rem' }}>
          Region
        </Typography>
        <FormGroup sx={{ mb: 1 }}>
          {['us-east-1', 'ap-south-1'].map((region) => (
            <FormControlLabel
              key={region}
              control={
                <Checkbox
                  size="small"
                  checked={selectedRegions.includes(region)}
                  onChange={() => handleCheckboxChange('region', region)}
                />
              }
              label={<Typography sx={{ fontSize: '.7rem' }}>{region.toUpperCase()}</Typography>}
            />
          ))}
        </FormGroup>

        <Typography fontWeight={600} mb={0.5} sx={{ fontSize: '.875rem' }}>
          Status
        </Typography>
        <FormGroup>
          {['all', 'active', 'inactive'].map((status) => (
            <FormControlLabel
              key={status}
              control={
                <Switch
                  size="small"
                  checked={statusFilter[status]}
                  onChange={(e) => handleStatusChange(status, e.target.checked)}
                />
              }
              label={
                <Typography sx={{ fontSize: '.7rem' }}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </Typography>
              }
            />
          ))}
        </FormGroup>
      </Box>
    </Box>
  );
}
