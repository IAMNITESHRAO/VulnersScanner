'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { fetchTickets, DeleteTicket, SearchTicket } from '@/store/apps/tickets/TicketSlice';
import { IconTrash } from '@tabler/icons-react';

const TicketListing = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const getVisibleTickets = (tickets, filter, ticketSearch) => {
    switch (filter) {
      case 'total_tickets':
        return tickets.filter(
          (c) => !c.deleted && c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Pending':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Pending' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Closed':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Closed' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      case 'Open':
        return tickets.filter(
          (c) =>
            !c.deleted &&
            c.Status === 'Open' &&
            c.ticketTitle.toLocaleLowerCase().includes(ticketSearch),
        );

      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  };

  const tickets = useSelector((state) =>
    getVisibleTickets(
      state.ticketReducer.tickets,
      state.ticketReducer.currentFilter,
      state.ticketReducer.ticketSearch,
    ),
  );
  const ticketBadge = (ticket) => {
    return ticket.Status === 'Open'
      ? theme.palette.success.light
      : ticket.Status === 'Closed'
      ? theme.palette.error.light
      : ticket.Status === 'Pending'
      ? theme.palette.warning.light
      : ticket.Status === 'Moderate'
      ? theme.palette.primary.light
      : 'primary';
  };

  return (
    (<Box sx={{
      mt: 4
    }}>
      <Box
        sx={{
          mb: 3,
          maxWidth: '260px',
          ml: 'auto'
        }}>
        <TextField
          size="small"
          label="Search"
          fullWidth
          onChange={(e) => dispatch(SearchTicket(e.target.value))}
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">Id</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Ticket</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Assigned To</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Status</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">Date</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.Id} hover>
                <TableCell>{ticket.Id}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="h6" noWrap sx={{
                      fontWeight: 600
                    }}>
                      {ticket.ticketTitle}
                    </Typography>
                    <Typography
                      color="textSecondary"
                      noWrap
                      variant="subtitle2"
                      sx={{
                        fontWeight: 400,
                        maxWidth: '250px'
                      }}>
                      {ticket.ticketDescription}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Stack
                    direction="row"
                    sx={{
                      gap: "10px",
                      alignItems: "center"
                    }}>
                    <Avatar
                      src={ticket.thumb}
                      alt={ticket.thumb}
                      sx={{
                        borderRadius: '100%',
                        width: '35',
                        height: '35',
                      }}
                    />
                    <Typography variant="h6">{ticket.AgentName}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    sx={{
                      backgroundColor: ticketBadge(ticket),
                    }}
                    size="small"
                    label={ticket.Status}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    {format(new Date(ticket.Date), 'E, MMM d')}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete Ticket">
                    <IconButton onClick={() => dispatch(DeleteTicket(ticket.Id))}>
                      <IconTrash size="18" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          my: 3,
          display: "flex",
          justifyContent: 'center'
        }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>)
  );
};

export default TicketListing;
