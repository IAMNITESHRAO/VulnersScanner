import Menuitems from './MenuItems';
import { usePathname } from "next/navigation";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import { toggleMobileSidebar } from '@/store/customizer/CustomizerSlice';

const SidebarItems = () => {
  const pathname = usePathname();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
  const customizer = useSelector((state) => state.customizer);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const hideMenu = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
  const dispatch = useDispatch();

  return (
    <Box sx={{ px: 1 }}>
      <List
        sx={{
          pt: 0,
          '& .MuiListItem-root': {
            px: 1.5,
            py: 0.5,
            minHeight: 36,
          },
          '& .MuiListItemIcon-root': {
            minWidth: 30,
            mr: 1,
          },
          '& .MuiListItemText-primary': {
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
        }}
        className="sidebarNav"
      >
        {Menuitems.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          } else {
            return (
              <NavItem
                item={item}
                key={item.id}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          }
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
