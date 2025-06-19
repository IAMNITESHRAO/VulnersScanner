'use client';

import React, { useEffect, useState } from 'react';
import PageContainer from '@/app/components/container/PageContainer';
import Breadcrumb from '../../layout/shared/breadcrumb/Breadcrumb';
import CloudCards from '../../cloud-scan/asset-management/CloudCards';
import { Box, CircularProgress } from '@mui/material';
import ReportsCard from './components/ReportsCard';

export default function Reports() {

  return (
    <>
      <PageContainer title="Reports" description="This is reports">
        <Breadcrumb title="Reports" subtitle="List of all reports" />
      </PageContainer>
      <Box sx={{paddingTop: 0}}>
      <ReportsCard />
      </Box>
    </>
  );
}
