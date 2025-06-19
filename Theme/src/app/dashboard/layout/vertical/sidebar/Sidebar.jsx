import Scrollbar from '@/app/components/custom-scroll/Scrollbar';
import { hoverSidebar, toggleMobileSidebar } from '@/store/customizer/CustomizerSlice';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { Profile } from './SidebarProfile/Profile';

const Sidebar = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  const customizer = useSelector((state) => state.customizer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const toggleWidth = customizer.isCollapse && !customizer.isSidebarHover ? customizer.MiniSidebarWidth : customizer.SidebarWidth;

  const onHoverEnter = () => {
    if (customizer.isCollapse) {
      dispatch(hoverSidebar(true));
    }
  };

  const onHoverLeave = () => {
    dispatch(hoverSidebar(false));
  };

  return (<>
    {!lgUp ?
      <Box
        sx={{
          zIndex: 100,
          width: toggleWidth,
          flexShrink: 0,
          ...(customizer.isCollapse && {
            position: 'absolute',
          }),
        }}
      >
        {/* ------------------------------------------- */}
        {/* Sidebar for desktop */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="left"
          open
          onMouseEnter={onHoverEnter}
          onMouseLeave={onHoverLeave}
          variant="permanent"
          PaperProps={{
            sx: {
              transition: theme.transitions.create('width', {
                duration: theme.transitions.duration.shortest,
              }),
              width: toggleWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          {/* ------------------------------------------- */}
          {/* Sidebar Box */}
          {/* ------------------------------------------- */}
          <Box
            sx={{
              height: '100%',
            }}
          >
            {/* ------------------------------------------- */}
            {/* Logo */}
            {/* ------------------------------------------- */}
            <Box sx={{
              px: 3
            }}>
              <Logo />
            </Box>
            <Scrollbar sx={{ height: 'calc(100% - 90px)' }}>
              {/* ------------------------------------------- */}
              {/* Sidebar Items */}
              {/* ------------------------------------------- */}
              <SidebarItems />
            </Scrollbar>
            {/* <Profile /> */}
          </Box>
        </Drawer>
      </Box>
      :
      <Drawer
        anchor="left"
        open={customizer.isMobileSidebar}
        onClose={() => dispatch(toggleMobileSidebar())}
        variant="temporary"
        PaperProps={{
          sx: {
            width: customizer.SidebarWidth,
            border: '0 !important',
            boxShadow: (theme) => theme.shadows[8],
          },
        }}
      >
        {/* ------------------------------------------- */}
        {/* Logo */}
        {/* ------------------------------------------- */}
        <Box sx={{
          px: 2
        }}>
          <Logo />
        </Box>
        {/* ------------------------------------------- */}
        {/* Sidebar For Mobile */}
        {/* ------------------------------------------- */}
        <SidebarItems />
      </Drawer>
    }
  </>);
};

export default Sidebar;
