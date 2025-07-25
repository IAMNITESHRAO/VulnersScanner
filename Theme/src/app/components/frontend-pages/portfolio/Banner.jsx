'use client';
import React from "react";
import { Box, Typography, Container, Grid2 as Grid } from "@mui/material";

const Banner = () => {

    return (<>
        <Box
            sx={{
                bgcolor: "primary.light",

                paddingTop: {
                    xs: '40px',
                    lg: '100px',
                },

                paddingBottom: {
                    xs: '40px',
                    lg: '100px',
                }
            }}>
            <Container maxWidth="lg">
                <Grid container spacing={3} sx={{
                    justifyContent: "center"
                }}>
                    <Grid
                        size={{
                            xs: 12,
                            lg: 8
                        }}
                        sx={{
                            alignItems: "center",
                            textAlign: "center"
                        }}>
                        <Typography
                            sx={{
                                color: "primary.main",
                                textTransform: "uppercase",
                                fontSize: "13px"
                            }}>Portfolio</Typography>
                        <Typography
                            variant="h1"
                            sx={{
                                mb: 3,
                                lineHeight: 1.4,
                                fontWeight: 700,

                                fontSize: {
                                    xs: '34px', sm: '48px', lg: '56px'
                                }
                            }}>Explore Our Latest Works</Typography>
                    </Grid>
                </Grid>

            </Container>

        </Box>
    </>);
};

export default Banner;
