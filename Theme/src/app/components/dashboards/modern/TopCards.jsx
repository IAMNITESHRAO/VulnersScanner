'use client';
import { Box, CardContent, Grid, Stack, Typography } from "@mui/material";
import { Cloud, CheckCircle, HourglassEmpty, Cancel, Error, ReportProblem } from '@mui/icons-material';

const TopCards = ({ statusDataWidgets, onCardClick }) => {

  const topcards = [
    {
      title: "All",
      status: null, // No filtering for "All"
      digits: statusDataWidgets?.total || 0,
      bgcolor: "primary",
      icon: <Cloud />
    },
    {
      title: "Compliant",
      status: "COMPLIANT",
      digits: statusDataWidgets?.compliant || 0,
      bgcolor: "success",
      icon: <CheckCircle />
    },
    {
      title: "Pending",
      status: "PENDING",
      digits: statusDataWidgets?.pending || 0,
      bgcolor: "#FFFF8F",
      textColor: "#FFBF00",
      icon: <HourglassEmpty />
    },
    {
      title: "Not Applicable",
      status: "NOT_APPLICABLE",
      digits: statusDataWidgets?.notApplicable || 0,
      bgcolor: "info",
      icon: <Cancel />
    },
    {
      title: "Error",
      status: "ERROR",
      digits: statusDataWidgets?.error || 0,
      bgcolor: "warning",
      icon: <Error />
    },
    {
      title: "Non Compliant",
      status: "NON_COMPLIANT",
      digits: statusDataWidgets?.nonCompliant || 0,
      bgcolor: "error",
      icon: <ReportProblem />
    },
  ];

  return (
    <Grid container spacing={2}>
      {topcards.map((topcard, i) => {
        const backgroundColor = topcard.bgcolor.startsWith("#") ? topcard.bgcolor : `${topcard.bgcolor}.light`;
        const textColor = topcard.textColor || `${topcard.bgcolor}.main`;

        return (
          <Grid item key={i} xs={12} sm={6} md={4} lg={2}>
            <Box 
              bgcolor={backgroundColor} 
              textAlign="center" 
              borderRadius={2} 
              sx={{ cursor: "pointer" }} 
              onClick={() => onCardClick(topcard.status)}
            >
              <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Stack color={textColor} width={'50px'} display={'flex'} justifyContent={'center'} alignItems={'center'} sx={{ marginRight: '.5rem' }}>
                  {topcard.icon}
                </Stack>

                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} width={"100%"}>
                  <Typography
                    color={textColor}
                    mt={1}
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ fontSize: '.7rem' }}
                  >
                    {topcard.title}
                  </Typography>
                  <Typography
                    color={textColor}
                    variant="subtitle2"
                    fontWeight={600}
                    sx={{ fontSize: '.7rem' }}
                  >
                    {topcard.digits}
                  </Typography>
                </Box>

              </CardContent>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopCards;