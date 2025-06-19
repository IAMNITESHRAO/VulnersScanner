// {/* <Drawer anchor="left" open={filterDrawer} onClose={toggleFilterDrawer}>
//             <Box
//               sx={{
//                 width: 230,
//                 p: 2,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '100%',
//                 bgcolor: '#fff',
//               }}
//             >
//               {/* Header */}
//               <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                 <Typography variant="subtitle1" fontWeight={600} sx={{ fontSize: '1.1rem' }}>
//                   Filters
//                 </Typography>

//                 <Button
//                   variant="outlined"
//                   color="error"
//                   size="small"
//                   onClick={() => {
//                     setSelectedCloudTypes([]);
//                     setSelectedRegions([]);
//                     setStatusFilter(null);
//                   }}
//                   sx={{ fontSize: '.7rem' }}
//                 >
//                   Clear All
//                 </Button>
//               </Box>

//               {/* Cloud Type Filter */}
//               <Typography fontWeight={600} mb={0.5} sx={{ fontSize: '.85rem' }}>Cloud Type</Typography>
//               <FormGroup sx={{ mb: 1 }}>
//                 {['aws', 'azure', 'gcp'].map((type) => (
//                   <FormControlLabel
//                     key={type}
//                     control={
//                       <Checkbox
//                         size="small"
//                         checked={selectedCloudTypes.includes(type)}
//                         onChange={() => handleCheckboxChange('cloud', type)}
//                       />
//                     }
//                     label={
//                       <Typography sx={{ fontSize: '.7rem' }}>{type.toUpperCase()}</Typography>
//                     }
//                   />
//                 ))}
//               </FormGroup>

//               {/* Region Filter */}
//               <Typography fontWeight={600} mb={0.5} sx={{ fontSize: '.85rem' }}>Region</Typography>
//               <FormGroup sx={{ mb: 1 }}>
//                 {['east', 'west', 'north', 'south'].map((region) => (
//                   <FormControlLabel
//                     key={region}
//                     control={
//                       <Checkbox
//                         size="small"
//                         checked={selectedRegions.includes(region)}
//                         onChange={() => handleCheckboxChange('region', region)}
//                       />
//                     }
//                     label={
//                       <Typography sx={{ fontSize: '.7rem' }}>{region.toUpperCase()}</Typography>
//                     }
//                   />
//                 ))}
//               </FormGroup>

//               {/* Status Filter */}
//               <Typography fontWeight={600} mb={0.5} sx={{ fontSize: '.85rem' }}>Status</Typography>
//               <FormControlLabel
//                 control={
//                   <Switch
//                     size="small"
//                     checked={statusFilter === true}
//                     onChange={() =>
//                       setStatusFilter(statusFilter === true ? false : statusFilter === false ? null : true)
//                     }
//                   />
//                 }
//                 label={
//                   <Typography sx={{ fontSize: '.7rem' }}>
//                     {statusFilter === null ? 'All' : statusFilter ? 'ACTIVE' : 'INACTIVE'}
//                   </Typography>
//                 }
//               />

//               {/* Apply / Cancel Buttons */}
//               <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between' }}>
//                 <Button
//                   variant="contained"
//                   size="small"
//                   onClick={() => toggleFilterDrawer()}
//                   color="primary"
//                   sx={{
//                     backgroundColor: 'primary', // ensures base color
//                     '&:hover': {
//                       backgroundColor: '#1976d2', // locks hover color
//                     },
//                   }}
//                 >
//                   Apply
//                 </Button>
//                 <Button
//                   size="small"
//                   onClick={toggleFilterDrawer}
//                   sx={{
//                     fontSize: '.7rem',
//                     backgroundColor: '#ffe1d6',
//                     color: '#ff784e',
//                     '&:hover': {
//                       backgroundColor: '#ff784e',
//                       color: '#fff',
//                     },
//                   }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Box>
//           </Drawer> */}