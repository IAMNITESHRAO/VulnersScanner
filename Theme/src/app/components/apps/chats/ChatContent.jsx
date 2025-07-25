import React from 'react';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconDotsVertical, IconMenu2, IconPhone, IconVideo } from '@tabler/icons-react';
import { useSelector } from 'react-redux';

import { formatDistanceToNowStrict } from 'date-fns';
import ChatInsideSidebar from './ChatInsideSidebar';
import Image from 'next/image';

const ChatContent = ({ toggleChatSidebar }) => {
  const [open, setOpen] = React.useState(true);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const chatDetails = useSelector(
    (state) => state.chatReducer.chats[state.chatReducer.chatContent - 1],
  );

  return (
    (<Box>
      {chatDetails ? (
        <Box>
          {/* ------------------------------------------- */}
          {/* Header Part */}
          {/* ------------------------------------------- */}
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2
              }}>
              <Box
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'none' },
                  mr: '10px',
                }}
              >
                <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
              </Box>
              <ListItem key={chatDetails.id} dense disableGutters>
                <ListItemAvatar>
                  <Badge
                    color={
                      chatDetails.status === 'online'
                        ? 'success'
                        : chatDetails.status === 'busy'
                        ? 'error'
                        : chatDetails.status === 'away'
                        ? 'warning'
                        : 'secondary'
                    }
                    variant="dot"
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    overlap="circular"
                  >
                    <Avatar
                      alt={chatDetails.name}
                      src={chatDetails.thumb}
                      sx={{ width: 40, height: 40 }}
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={<Typography variant="h5">{chatDetails.name}</Typography>}
                  secondary={chatDetails.status}
                />
              </ListItem>
              <Stack direction={'row'}>
                <IconButton aria-label="phone">
                  <IconPhone stroke={1.5} />
                </IconButton>
                <IconButton aria-label="video">
                  <IconVideo stroke={1.5} />
                </IconButton>
                <IconButton aria-label="sidebar" onClick={() => setOpen(!open)}>
                  <IconDotsVertical stroke={1.5} />
                </IconButton>
              </Stack>
            </Box>
            <Divider />
          </Box>
          {/* ------------------------------------------- */}
          {/* Chat Content */}
          {/* ------------------------------------------- */}

          <Box sx={{
            display: "flex"
          }}>
            {/* ------------------------------------------- */}
            {/* Chat msges */}
            {/* ------------------------------------------- */}

            <Box sx={{
              width: "100%"
            }}>
              <Box
                sx={{
                  height: '650px',
                  overflow: 'auto',
                  maxHeight: '800px',
                }}
              >
                <Box sx={{
                  p: 3
                }}>
                  {chatDetails.messages.map((chat) => {
                    return (
                      (<Box key={chat.id + chat.createdAt}>
                        {chatDetails.id === chat.senderId ? (
                          <Box sx={{
                            display: "flex"
                          }}>
                            <ListItemAvatar>
                              <Avatar
                                alt={chatDetails.name}
                                src={chatDetails.thumb}
                                sx={{ width: 40, height: 40 }}
                              />
                            </ListItemAvatar>
                            <Box>
                              {chat.createdAt ? (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "grey.400",
                                    mb: 1
                                  }}>
                                  {chatDetails.name},{' '}
                                  {formatDistanceToNowStrict(new Date(chat.createdAt), {
                                    addSuffix: false,
                                  })}{' '}
                                  ago
                                </Typography>
                              ) : null}
                              {chat.type === 'text' ? (
                                <Box
                                  sx={{
                                    mb: 2,
                                    p: 1,
                                    backgroundColor: 'grey.100',
                                    mr: 'auto',
                                    maxWidth: '320px'
                                  }}>
                                  {chat.msg}
                                </Box>
                              ) : null}
                              {chat.type === 'image' ? (
                                <Box
                                  sx={{
                                    mb: 1,
                                    overflow: 'hidden',
                                    lineHeight: '0px'
                                  }}>
                                  <Image src={chat.msg} alt="attach" width="150" height="150" />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              mb: 1,
                              display: "flex",
                              alignItems: "flex-end",
                              flexDirection: "row-reverse"
                            }}>
                            <Box
                              sx={{
                                alignItems: "flex-end",
                                display: "flex",
                                flexDirection: 'column'
                              }}>
                              {chat.createdAt ? (
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "grey.400",
                                    mb: 1
                                  }}>
                                  {formatDistanceToNowStrict(new Date(chat.createdAt), {
                                    addSuffix: false,
                                  })}{' '}
                                  ago
                                </Typography>
                              ) : null}
                              {chat.type === 'text' ? (
                                <Box
                                  sx={{
                                    mb: 1,
                                    p: 1,
                                    backgroundColor: 'primary.light',
                                    ml: 'auto',
                                    maxWidth: '320px'
                                  }}>
                                  {chat.msg}
                                </Box>
                              ) : null}
                              {chat.type === 'image' ? (
                                <Box
                                  sx={{
                                    mb: 1,
                                    overflow: 'hidden',
                                    lineHeight: '0px'
                                  }}>
                                  <Image src={chat.msg} alt="attach" width="250" height="165" />
                                </Box>
                              ) : null}
                            </Box>
                          </Box>
                        )}
                      </Box>)
                    );
                  })}
                </Box>
              </Box>
            </Box>

            {/* ------------------------------------------- */}
            {/* Chat right sidebar Content */}
            {/* ------------------------------------------- */}
            {open ? (
              <Box sx={{
                flexShrink: 0
              }}>
                <ChatInsideSidebar isInSidebar={lgUp ? open : !open} chat={chatDetails} />
              </Box>
            ) : (
              ''
            )}
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            pb: 1,
            pt: 1
          }}>
          {/* ------------------------------------------- */}
          {/* if No Chat Content */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'flex', lg: 'none' },
              mr: '10px',
            }}
          >
            <IconMenu2 stroke={1.5} onClick={toggleChatSidebar} />
          </Box>
          <Typography variant="h4">Select Chat</Typography>
        </Box>
      )}
    </Box>)
  );
};

export default ChatContent;
