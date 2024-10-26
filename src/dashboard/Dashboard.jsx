import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import TableChartIcon from '@mui/icons-material/TableChart';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import Simulation from './Simulation';
import Config from './Settings';
import TableView from './TableView';


const NAVIGATION = [
  // {
  //   segment: 'table',
  //   title: 'Table',
  //   icon: <TableChartIcon />,
  // },
  {
    kind: 'divider',
  },
  {
    segment: 'settings',
    title: 'Settings',
    icon: <SettingsIcon />,
  },
];

const demoTheme = createTheme({
    cssVariables: {
      colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    colorSchemes: { light: true, dark: true },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 600,
        lg: 1200,
        xl: 1536,
      },
    },
  });

function DemoPageContent({ pathname }) {

  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
      {pathname === '/' && <Simulation />}
      {pathname === '/settings' && <Config />}
      {/* {pathname === '/table' && <TableView />} */}
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBasic(props) {

  const [pathname, setPathname] = React.useState('/');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  // Remove this const when copying and pasting into your project.
  // const demoWindow = window !== undefined ? window() : undefined;

  return (
    // preview-start
    <AppProvider
      navigation={NAVIGATION}
      branding={{
        logo: <img src="./catlogo.png" alt="Caterpillar logo" />,
        title: 'CATERPILLAR',
      }}
      router={router}
      theme={demoTheme}
      // window={demoWindow}
    >
      <DashboardLayout 
        defaultSidebarCollapsed={true}
        sx={{
          height: '100%',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Box
          sx={{width: '100%'}}
        >
          <DemoPageContent 
            pathname={pathname}
          />
        </Box>
        
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}

// DashboardLayoutBasic.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * Remove this when copying and pasting into your project.
//    */
//   // window: PropTypes.func,
// };

export default DashboardLayoutBasic;
