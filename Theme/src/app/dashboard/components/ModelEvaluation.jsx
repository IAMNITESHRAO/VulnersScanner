// import {
//   IconArrowGuide,
//   IconUsersGroup,
//   IconChecklist,
//   IconBrandStackoverflow,
// } from "@tabler/icons-react";
// import React from "react";

// const steps = [
//   {
//     title: "Model assessment and strategy",
//     description:
//       "Our in-house solution architects and experts perform a curated evaluation and analysis, then provide you with a recommended path to enhanced performance and more.",
//     icon: <IconArrowGuide className="text-blue-400 w-6 h-6" />,
//   },
//   {
//     title: "Fully-managed large language model training",
//     description:
//       "Using our vetted technical professionals, we build your fully managed team of model trainers and more—with additional customized vetting, if necessary.",
//     icon: <IconUsersGroup className="text-blue-400 w-6 h-6" />,
//   },
//   {
//     title: "LLM data and training tasking",
//     description:
//       "You focus solely on task design while we handle coordination and operation of your dedicated training team.",
//     icon: <IconChecklist className="text-blue-400 w-6 h-6" />,
//   },
//   {
//     title: "Scale on demand",
//     description:
//       "Maintain consistent quality control with iterative workflow adaptation and agility as your training needs change.",
//     icon: <IconBrandStackoverflow className="text-blue-400 w-6 h-6" />,
//   },
// ];

// const ModelEvaluation = () => {
//   return (
//     <div className="bg-black text-white px-6 py-16 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
//       <div className="flex items-start">
//         <h2 className="text-4xl font-bold leading-tight">
//           Comprehensive model evaluation <br /> and evolution starts here
//         </h2>
//       </div>

//       <div className="relative">
//         {/* vertical line */}
//         <div className="absolute top-0 left-6 bottom-0 w-px bg-gray-700 z-0" />

//         <div className="flex flex-col space-y-12 pl-12">
//           {steps.map((step, index) => (
//             <div key={index} className="flex items-start space-x-6 relative z-10">
//               <div className="bg-[#1f1f1f] p-3 rounded-full z-10 relative">
//                 {step.icon}
//               </div>
//               <div>
//                 <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
//                 <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelEvaluation;

import React from 'react';
import { Box, Typography, Stack, Divider, Grid } from '@mui/material';
import { IconArrowGuide, IconBrandStackoverflow, IconChecklist, IconUsersGroup } from '@tabler/icons-react';

const Item = ({ title, description, icon: IconComponent, showLine }) => (
  <Box sx={{ display: 'flex', flexDirection: 'row', mb: 5 }}>
    {/* Icon Section */}
    <Box
      sx={{
        minWidth: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
     <Box sx={{ position: 'relative', minWidth: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  <Box
    sx={{
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: '#1e1f3f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2,
    }}
  >
    <IconComponent style={{ color: 'white', fontSize: '1.5rem' }} />
  </Box>

  {showLine && (
    <Box
      sx={{
        position: 'absolute',
        top: '40px', // just below the icon
        left: '50%', // center horizontally
        transform: 'translateX(0px)', // push right slightly
        width: '2px',
        height: 100,
        backgroundColor: '#1e1f3f',
      }}
    />
  )}
</Box>


    </Box>

    {/* Text Section */}
    <Box sx={{ textAlign: 'left', maxWidth: 600, ml: 2 }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.5 }}>
        {description}
      </Typography>
    </Box>
  </Box>
);



const ModelEvaluation = () => {
  return (
    <Box sx={{ p: 5 }}>
      <Grid container spacing={5} alignItems="flex-start">
        {/* Left Side - 4 Columns */}
        <Grid item xs={12} md={4}>
          <Typography variant="h4" fontWeight="bold">
            Comprehensive model evaluation and evolution starts here
          </Typography>
        </Grid>

        {/* Right Side - 8 Columns */}
        <Grid item xs={12} md={8}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Item
              icon={IconArrowGuide}
              title="Model assessment and strategy"
              description="Our in-house solution architects and experts perform a curated evaluation and analysis, then provide you with a recommended path to enhanced performance and more."
              showLine={true}
            />
            <Item
              icon={IconUsersGroup}
              title="Fully-managed large language model training"
              description="Using our vetted technical professionals, we build your fully managed team of model trainers and more—with additional customized vetting, if necessary."
              showLine={true}
            />
            <Item
              icon={IconChecklist}
              title="LLM data and training tasking"
              description="You focus solely on task design while we handle coordination and operation of your dedicated training team."
              showLine={true}
            />
            <Item
              icon={IconBrandStackoverflow}
              title="Scale on demand"
              description="Maintain consistent quality control with iterative workflow adaptation and agility as your training needs change."
              showLine={false}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModelEvaluation;
