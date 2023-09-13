import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import { BsTable } from 'react-icons/bs';
import { MdAutoGraph } from 'react-icons/md';
import { Link } from 'react-router-dom';

const drawerWidth = 300;
const navItems = [
  { label: 'Charts', path: '/charts', icon: <MdAutoGraph /> },
  { label: 'Table', path: '/table', icon: <BsTable /> },
]


type Props = {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

export const SideBar = ({ mobileOpen, handleDrawerToggle }: Props) => {


  const drawer = ( 
    <>
      <Toolbar />
      <Divider />
      <List>
        {
          navItems.map( ({ icon, path, label }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton>
                <Link 
                  to={path} 
                  style={{ 
                    display:'flex', 
                    alignItems: 'center',
                    width: "100%",
                    height: "100%",
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                >
                  <ListItemIcon>
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </Link>
              </ListItemButton>
            </ListItem>
          ))
        }
      </List>
    </>
  )

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        { drawer }
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
