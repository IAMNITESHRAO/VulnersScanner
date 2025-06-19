'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardActions, Button, Typography, Grid, Box } from '@mui/material';
import { IconPlugConnected } from '@tabler/icons-react';
import AddAWSAssetForm from './aws/AddAWSAssetForm';
import AddAzureAssetForm from './azure/AddAzureAssetForm';
import AddGCPAssetForm from './gcp/AddGCPAssetForm';
import cloudProviders from '../data/cloudProviders';
import TiltCard from '@/app/components/custom-tiltcard/TiltCard';
import { IconArrowBack } from '@tabler/icons-react';

const CloudCards = ({ onClose }) => {
  const [selectedProvider, setSelectedProvider] = useState(null); 

  const handleOpenModal = (provider) => setSelectedProvider(provider);
  const handleCloseModal = () => setSelectedProvider(null);
  

  return (
    <>
  <Box sx={{ mb: 3 }}>
    <Button 
      variant="contained" 
      startIcon={<IconArrowBack />}
      onClick={onClose} 
      sx={{ 
        fontSize: '.7rem',
                lineHeight: '1.5',
                borderRadius: '4px',
                backgroundColor: '#1976d2',
                padding: '6px 10px',
                    color: '#ffffff', // text white
                    '& .MuiButton-startIcon': {
                      color: '#ff784e', // icon orange in normal state
                    },
                    '&:hover': {
                      backgroundColor: '#ff784e', // orange bg on hover
                      color: '#ffffff',           // text blue on hover
                      '& .MuiButton-startIcon': {
                        color: '#1976d2',         // icon white on hover
                      },
                    },
      }}
    >
      Back to Asset List
    </Button>
  </Box>
      <Grid container spacing={3}>
        {cloudProviders.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      p: 0.5,
                      borderRadius: 1,
                      border: '1px solid #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 1.5,
                      backgroundColor: '#f9f9f9',
                    }}
                  >
                    <Image
                      src={item.logo}
                      alt={`${item.name} logo`}
                      width={24}
                      height={24}
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                  <Typography variant="h6">{item.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  startIcon={<IconPlugConnected />}
                  onClick={() => handleOpenModal(item.provider)}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: '#ffffff', // text white
                    '& .MuiButton-startIcon': {
                      color: '#ff784e', // icon orange in normal state
                    },
                    '&:hover': {
                      backgroundColor: '#ff784e', // orange bg on hover
                      color: '#ffffff',           // text blue on hover
                      '& .MuiButton-startIcon': {
                        color: '#1976d2',         // icon white on hover
                      },
                    },
                  }}
                >
                  Connect
                </Button>
              </CardActions>
              </Card>
              
          </Grid>
        ))}
      </Grid>

      {/* Conditional Modals */}
      {selectedProvider === 'aws' && (
        <AddAWSAssetForm addAssetModal={true} toggleAddAssetModal={handleCloseModal}  />
      )}
      {selectedProvider === 'azure' && (
        <AddAzureAssetForm addAssetModal={true} toggleAddAssetModal={handleCloseModal} />
      )}
      {selectedProvider === 'gcp' && (
        <AddGCPAssetForm addAssetModal={true} toggleAddAssetModal={handleCloseModal} />
      )}
    </>
  );
};

export default CloudCards;
