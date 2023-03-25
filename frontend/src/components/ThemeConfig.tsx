import { createTheme as cadsCreateTheme, ThemeProvider as CadsThemeProvider } from '@cads-ui/core';
import { createTheme as muiCreateTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import '@cads-ui/core/index.css';
import '@cads-ui/x/index.css';
import 'react-toastify/dist/ReactToastify.css';

import '@cads-ui/core/override/react-toastify.css';

// -----------------------------
interface ThemeConfigProps {
  children: React.ReactNode;
}

// -----------------------------
const ThemeConfig: React.FC<ThemeConfigProps> = ({ children }) => {
  const cadsTheme = React.useMemo(() => cadsCreateTheme({}), []);
  const muiTheme = React.useMemo(() => muiCreateTheme({ palette: { ...cadsTheme.palette } }), [cadsTheme]);

  return (
    <CadsThemeProvider theme={cadsTheme}>
      <ToastContainer autoClose={5000} limit={3} pauseOnHover position="bottom-right" />
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </CadsThemeProvider>
  );
};

export default ThemeConfig;
