import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { SearchContact } from '@/store/apps/contacts/ContactSlice';
import { IconMenu2, IconSearch } from '@tabler/icons-react';

const ContactSearch = ({ onClick }) => {
  const searchTerm = useSelector((state) => state.contactsReducer.contactSearch);
  const dispatch = useDispatch();

  return (
    (<Box
        sx={{
          display: "flex",
          p: 2
        }}>
      <Fab
        onClick={onClick}
        color="primary"
        size="small"
        sx={{ mr: 1, flexShrink: '0', display: { xs: 'block', lineHeight: '10px', lg: 'none' } }}
      >
        <IconMenu2 width="16" />
      </Fab>
      <TextField
        id="outlined-basic"
        fullWidth
        size="small"
        value={searchTerm}
        placeholder="Search Contacts"
        variant="outlined"
        onChange={(e) => dispatch(SearchContact(e.target.value))}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconSearch size={'16'} />
              </InputAdornment>
            ),
          }
        }}
      />
    </Box>)
  );
};

export default ContactSearch;
