
"use client";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useSelector } from "react-redux";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { useSearchParams } from "next/navigation";
import RTL from "./dashboard/layout/shared/customizer/RTL";
import { Toaster } from "react-hot-toast";

const MyApp = ({ children }) => {
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        console.log("Token loaded from localStorage:", token);
        // You can optionally attach token to a global fetch wrapper here
      }
    }
  }, []);

  return (
    <>
      <Toaster />
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            {children}
          </RTL>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
};

export default MyApp;
