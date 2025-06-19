// 'use client';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid2';
// import { useEffect, useState } from 'react';

// import PageContainer from '@/app/components/container/PageContainer';
// // components
// import YearlyBreakup from '@/app/components/dashboards/modern/YearlyBreakup';
// import MonthlyEarnings from '@/app/components/dashboards/modern/MonthlyEarnings';
// import TopCards from '@/app/components/dashboards/modern/TopCards';
// import RevenueUpdates from '@/app/components/dashboards/modern/RevenueUpdates';
// import EmployeeSalary from '@/app/components/dashboards/modern/EmployeeSalary';
// import Customers from '@/app/components/dashboards/modern/Customers';
// import Projects from '@/app/components/dashboards/modern/Projects';
// import Social from '@/app/components/dashboards/modern/Social';
// import SellingProducts from '@/app/components/dashboards/modern/SellingProducts';
// import WeeklyStats from '@/app/components/dashboards/modern/WeeklyStats';
// import TopPerformers from '@/app/components/dashboards/modern/TopPerformers';
// import IntegrationGrid from './components/IntegrationGrid';
// import ModelEvaluation from './components/ModelEvaluation';
// import SnykFeatures from './components/SnykFeatures';
// import ApiScanningSection from './components/ApiScanningSection';
// import { useRouter } from 'next/navigation';
// import PageCarousel from './components/DozensCarousel';
// import DozensCarousel from './components/DozensCarousel';
// import LatestReports from './components/LatestReports';

// export default function Dashboard() {
//   const router = useRouter();

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');

//    const jwtToken = sessionStorage.getItem('jwtToken');
//     const username = sessionStorage.getItem('username');
//     const roles = sessionStorage.getItem('roles');

//     if (jwtToken && username && roles) {
//       localStorage.setItem('token', jwtToken);
//       localStorage.setItem('username', username);
//       localStorage.setItem('roles', roles);

//       // Optional: clear sessionStorage to avoid duplicate handling
//       sessionStorage.removeItem('jwtToken');
//       sessionStorage.removeItem('username');
//       sessionStorage.removeItem('roles');
//     }
//   }, []);

//   return (
//     <PageContainer title="Dashboard" description="this is Dashboard">
//       <Box sx={{ mt: 3 }}>
//         <Grid container spacing={3}>
//           <Grid size={{ xs: 12, lg: 12 }}>
//             {/* <TopCards /> */}
//           </Grid>
//           <LatestReports/>
//           {/* <DozensCarousel/> */}
//           {/* <IntegrationGrid/>
//           <ApiScanningSection/>
//           <SnykFeatures/>
//           <ModelEvaluation/> */}
//           {/* <Grid size={{ xs: 12, lg: 8 }}>
//             <RevenueUpdates isLoading={isLoading} />
//           </Grid>
//           <Grid size={{ xs: 12, lg: 4 }}>
//             <Grid container spacing={3}>
//               <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
//                 <YearlyBreakup isLoading={isLoading} />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6, lg: 12 }}>
//                 <MonthlyEarnings isLoading={isLoading} />
//               </Grid>
//             </Grid >
//           </Grid>
//           <Grid size={{ xs: 12, lg: 4 }}>
//             <EmployeeSalary isLoading={isLoading} />
//           </Grid>
//           <Grid size={{ xs: 12, lg: 4 }}>
//             <Grid container spacing={3}>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Customers isLoading={isLoading} />
//               </Grid>
//               <Grid size={{ xs: 12, sm: 6 }}>
//                 <Projects isLoading={isLoading} />
//               </Grid>
//               <Grid size={12}>
//                 <Social />
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid size={{ xs: 12, lg: 4 }}>
//             <SellingProducts />
//           </Grid>
//           <Grid size={{ xs: 12, lg: 4 }}>
//             <WeeklyStats isLoading={isLoading} />
//           </Grid>
//           <Grid size={{ xs: 12, lg: 8 }}>
//             <TopPerformers />
//           </Grid> */}
//         </Grid>
//       </Box>
//     </PageContainer >
//   );
// }


'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useEffect, useState } from 'react';

import PageContainer from '@/app/components/container/PageContainer';
import { useRouter } from 'next/navigation';
import LatestReports from './components/LatestReports';


export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const jwtToken = sessionStorage.getItem('jwtToken');
    const username = sessionStorage.getItem('username');
    const roles = sessionStorage.getItem('roles');

    if (jwtToken && username && roles) {
      localStorage.setItem('token', jwtToken);
      localStorage.setItem('username', username);
      localStorage.setItem('roles', roles);

      // Optional: clear sessionStorage to avoid duplicate handling
      sessionStorage.removeItem('jwtToken');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('roles');
    }
  }, []);

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 12 }}>
            {/* <TopCards /> */}
          </Grid>
          <div style={{ padding: 20 }}>
            <LatestReports />
          </div>
        </Grid>
      </Box>
    </PageContainer >
  );
}