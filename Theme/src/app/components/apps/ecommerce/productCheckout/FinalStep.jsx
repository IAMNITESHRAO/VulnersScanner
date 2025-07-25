import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';

const FinalStep = () => {
  return (<>
    <Box sx={{
      my: 3
    }}>
      <Box
        sx={{
          textAlign: "center",
          p: 3
        }}>
        <Typography variant="h5">Thank you for your purchase!</Typography>
        <Typography
          variant="h6"
          color="primary"
          sx={{
            mt: 1,
            mb: 4
          }}>
          Your order id: 3fa7-69e1-79b4-dbe0d35f5f5d
        </Typography>
        <Image src='/images/products/payment-complete.gif' alt="payment" width={300} height={300} />
        <br />
        <br />
        <Typography variant="body2">
          We will send you a notification <br />
          within 2 days when it ships.
        </Typography>
      </Box>
    </Box>
  </>);
};

export default FinalStep;
