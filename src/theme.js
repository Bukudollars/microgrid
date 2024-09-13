import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCC00',
      dark: '#FF9900',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;