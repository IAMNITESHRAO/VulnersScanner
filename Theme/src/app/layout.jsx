import React from "react";
import { Providers } from "@/store/providers";
import NextTopLoader from 'nextjs-toploader';
import MyApp from './app';
import "./global.css";


export const metadata = {
  title: 'Dhanush Guard',
  description: 'Dhanush Guard',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextTopLoader color="#5D87FF" />
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}