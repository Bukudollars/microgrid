import * as React from 'react';
import { Box, AppBar, Typography, Divider,
    List, ListItem, ListItemButton, ListItemText,
    Toolbar,
    Icon,
    IconButton,
    Menu,
    Button,
    Drawer
 } from '@mui/material';
 import MenuIcon from '@mui/icons-material/Menu';
 import HomeIcon from '@mui/icons-material/Home';
 import SpeedIcon from '@mui/icons-material/Speed';
 import SettingsIcon from '@mui/icons-material/Settings';
 import Home from './Home';
 import { Routes, Route, useNavigate } from 'react-router-dom';
 import Simulation from './Simulation';
 import Settings from './Settings';

const drawerWidth = 240;

export default function Dashboard() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const navigate = useNavigate();

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}} width={drawerWidth}>
            <Typography variant="h6" sx={{my: 2}}>Menu</Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => navigate('./')}
                            sx={{ textAlign: 'center'}}
                        >
                            <HomeIcon />    
                            <ListItemText primary="Home" sx={{px: 2}}/>
                        </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => navigate('./simulation')}
                            sx={{ textAlign: 'center'}}
                        >
                            <SpeedIcon />
                            <ListItemText primary="Simulation" sx={{px: 2}}/>
                        </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                        <ListItemButton 
                            onClick={() => navigate('./settings')}
                            sx={{ textAlign: 'center'}}
                        >
                            <SettingsIcon />
                            <ListItemText primary="Settings" sx={{px: 2}}/>
                        </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (

            <Box sx={{ display: 'flex'}}>
                <AppBar component="nav">
                    <Toolbar>
                        <IconButton
                            color='inherit'
                            aria-label='open drawer'
                            edge='start'
                            onClick={handleDrawerToggle}
                            sx={{ 
                                mr: 2, 
                                // display: { sm: 'none' } 
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img src="./cat-logo.svg" alt="logo" width="50" height="50" />
                        <Typography 
                        variant='h6' 
                        component="div"
                        sx={{flexGrow: 1, 
                            pl: 2,
                            display: { 
                            // xs: 'none', 
                            // sm: 'block'
                            }}}>
                            MICROGRID
                        </Typography>
                        <Box>
                            <Button>Home</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <nav>
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            '&.MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </nav>
                <Box component="main" sx={{p: 3}}>
                    <Toolbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/simulation" element={<Simulation />} />
                        <Route path="/settings" element={<Settings />} />
                    </Routes>

                </Box>
            </Box>

    );
};