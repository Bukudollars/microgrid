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
 import Home from './Home';
 import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const drawerWidth = 240;
const navItems = ['Home', 'Settings', 'Simulation']

export default function Dashboard() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
            <Typography variant="h6" sx={{my: 2}}>CAT</Typography>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: 'center'}}>
                        <ListItemText primary="Home" />
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
                <Home />

            </Box>
        </Box>
    );
};