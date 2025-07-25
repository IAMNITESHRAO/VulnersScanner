'use client';
import {
  Box,
  CardContent,
  Chip,
  Paper,
  Stack,
  Typography,
  LinearProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";

const sells = [
  {
    product: "MaterialPro",
    price: "23,568",
    percent: 55,
    color: "primary",
  },
  {
    product: "Flexy Admin",
    price: "23,568",
    percent: 20,
    color: "secondary",
  },
];

const SellingProducts = () => {
  const theme = useTheme();
  const secondarylight = theme.palette.secondary.light;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.secondary.main;
  const primary = theme.palette.primary.main;
  const borderColor = theme.palette.divider;

  return (
    (<Paper
      sx={{ bgcolor: "primary.main", border: `1px solid ${borderColor}` }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" color="white">
          Best selling products
        </Typography>
        <Typography variant="subtitle1" color="white" sx={{
          mb: 4
        }}>
          Overview 2025
        </Typography>

        <Box
          sx={{
            textAlign: "center",
            mt: 2,
            mb: "-40px"
          }}>
          <Image src='/images/backgrounds/piggy.png' alt={"SavingsImg"} width="270" height="200" />
        </Box>
      </CardContent>
      <Paper
        sx={{
          overflow: "hidden",
          zIndex: "1",
          position: "relative",
          margin: "10px",
          mt: "-43px"
        }}
      >
        <Box sx={{
          p: 3
        }}>
          <Stack spacing={3}>
            {sells.map((sell, i) => (
              <Box key={i}>
                <Stack
                  direction="row"
                  spacing={2}
                  sx={{
                    mb: 1,
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}>
                  <Box>
                    <Typography variant="h6">{sell.product}</Typography>
                    <Typography variant="subtitle2" color="textSecondary">
                      ${sell.price}
                    </Typography>
                  </Box>
                  <Chip
                    sx={{
                      backgroundColor:
                        sell.color === "primary"
                          ? primarylight
                          : secondarylight,
                      color: sell.color === "primary" ? primary : secondary,
                      borderRadius: "4px",
                      width: 55,
                      height: 24,
                    }}
                    label={sell.percent + "%"}
                  />
                </Stack>
                <LinearProgress
                  value={sell.percent}
                  variant="determinate"
                  color={sell.color}
                />
              </Box>
            ))}
          </Stack>
        </Box>
      </Paper>
    </Paper>)
  );
};

export default SellingProducts;
