import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const Delivery = [
  {
    id: 1,
    title: 'Free delivery',
    description: 'Delivered on Firday, May 10',
  },
  {
    id: 2,
    title: 'Fast delivery ($2,00)',
    description: 'Delivered on Wednesday, May 8',
  },
];

const Payment = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icons: '/images/svgs/paypal.svg',
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icons: '/images/svgs/mastercard.svg',
  },
  {
    value: 'cash',
    title: 'Cash on Delivery',
    description: 'Pay with cash when your order is delivered.',
    icons: '',
  },
];

const ThirdStep = () => {
  const [selectedValue, setSelectedValue] = React.useState('Free delivery');

  const handleDChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const [selectedPyament, setSelectedPyament] = React.useState('paypal');

  const handlePChange = (event) => {
    setSelectedPyament(event.target.value);
  };

  return (<>
    {/* ------------------------------------------- */}
    {/* Delivery Option */}
    {/* ------------------------------------------- */}
    <Paper variant="outlined" sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6">Delivery Option</Typography>
      <Grid container spacing={3} sx={{
        mt: 1
      }}>
        {Delivery.map((option) => (
          <Grid
            key={option.id}
            size={{
              lg: 6,
              xs: 12
            }}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                borderColor: selectedValue === option.title ? 'primary.main' : '',
                backgroundColor: selectedValue === option.title ? 'primary.light' : '',
              }}
            >
              <Stack
                direction={'row'}
                sx={{
                  alignItems: "center",
                  gap: 1
                }}>
                <Radio
                  checked={selectedValue === option.title}
                  onChange={handleDChange}
                  value={option.title}
                  name="radio-buttons"
                  inputProps={{ 'aria-label': option.title }}
                />
                <Box>
                  <Typography variant="h6">{option.title}</Typography>
                  <Typography variant="subtitle2">{option.description}</Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Paper>
    {/* ------------------------------------------- */}
    {/* Payment Option */}
    {/* ------------------------------------------- */}
    <Paper variant="outlined" sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6">Payment Option</Typography>
      <Grid container spacing={3} sx={{
        alignItems: "center"
      }}>
        <Grid
          size={{
            lg: 8,
            xs: 12
          }}>
          <Grid container spacing={3} sx={{
            mt: 2
          }}>
            {Payment.map((option) => (
              <Grid
                key={option.value}
                size={{
                  lg: 12,
                  xs: 12
                }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: selectedPyament === option.value ? 'primary.main' : '',
                    backgroundColor: selectedPyament === option.value ? 'primary.light' : '',
                  }}
                >
                  <Stack
                    direction={'row'}
                    sx={{
                      alignItems: "center",
                      gap: 1
                    }}>
                    <Radio
                      checked={selectedPyament === option.value}
                      onChange={handlePChange}
                      value={option.value}
                      name="radio-buttons"
                      inputProps={{ 'aria-label': option.title }}
                    />
                    <Box>
                      <Typography variant="h6">{option.title}</Typography>
                      <Typography variant="subtitle2">{option.description}</Typography>
                    </Box>
                    <Box sx={{
                      ml: "auto"
                    }}>
                      {option.icons ? <Image src={option.icons} alt="payment" width={35} height={35} /> : ''}
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid
          size={{
            lg: 4,
            xs: 12
          }}>
          <Image src='/images/products/payment.svg' height={100} width={100} alt="payment" style={{ height: '265px', width: '265px' }} />
        </Grid>
      </Grid>
    </Paper>
  </>);
};

export default ThirdStep;
