'use client';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-input': {
    padding: '12px 14px',
    height: 'auto',
    lineHeight: '1.5em', 
  },
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: 0.8,
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[200],
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.primary.main, 
  },
}));

export default CustomTextField;