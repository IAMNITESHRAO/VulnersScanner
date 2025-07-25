'use client';
import React from "react";
import { Box, Typography, Container, Grid2 as Grid, MenuItem, Button, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const ShapeBg = styled(Box)(() => ({
    position: 'absolute',
    right: 0,
    top: 0
}));

const Address = () => {

    return (
        (<Box
            sx={{
                bgcolor: "primary.main",
                borderRadius: "12px",
                position: "relative"
            }}>
            <ShapeBg>
                <Image src='/images/frontend-pages/contact/shape1.png' alt="img" width={200} height={250} />
            </ShapeBg>
            <Box
                sx={{
                    p: "30px",
                    zIndex: 1
                }}>
                <Typography
                    color="white"
                    sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        mb: 2
                    }}>Reach Out Today</Typography>
                <Typography variant="body1" color="white" sx={{
                    lineHeight: 1.6
                }}>Have questions or need assistance? We're just a message away.</Typography>

                <Divider sx={{ opacity: 0.3, my: "40px" }} />

                <Typography
                    color="white"
                    sx={{
                        fontSize: "20px",
                        fontWeight: 700,
                        mb: 2
                    }}>Our Location</Typography>
                <Typography variant="body1" color="white" sx={{
                    lineHeight: 1.6
                }}>Visit us in person or find our contact details to connect with us directly.</Typography>

            </Box>
        </Box>)
    );
};

export default Address;
