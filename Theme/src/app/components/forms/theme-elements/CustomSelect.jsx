'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Select, MenuItem } from '@mui/material';

const CustomSelect = styled((props) => 
  <Select {...props} />
)(({ theme }) => ({
  '& .MuiSelect-select': {
    padding: '0.2rem 0.4rem',
    fontSize: '0.7rem',
  },
}));

export default CustomSelect;