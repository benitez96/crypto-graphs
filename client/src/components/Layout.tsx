import { FC, PropsWithChildren } from "react"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { SideBar } from './SideBar';
import { ToggleButton } from './ToggleButton';
import { Link } from "react-router-dom";


const drawerWidth = 300;

export const Layout: FC<PropsWithChildren> = ({ children }) => {

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            textAlign="end"
            fontWeight="bold"
            sx={{ flexGrow: 1 }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Mutt Challenge
            </Link>
          </Typography>
          <ToggleButton />
        </Toolbar>
      </AppBar>
      <SideBar 
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        { children }
      </Box>
    </Box>
  );
}
