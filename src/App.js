import React, { Suspense, useState } from 'react';
import {
  List,
  ListItem,
  CssBaseline,
  useMediaQuery,
  ThemeProvider,
  unstable_createMuiStrictModeTheme as createMuiTheme,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { blue } from '@mui/material/colors';
import { SnackbarProvider } from 'notistack';
import LoadingIndicator from './components/LoadingIndicator';
import DialogForm from './components/DialogForm';
import { ConnectionProvider } from './utils/connection';

function App() {
  // TODO: add toggle for dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
          primary: blue,
        },
        // TODO consolidate popup dimensions
        ext: '450',
      }),
    [prefersDarkMode]
  );

  // Disallow rendering inside an iframe to prevent clickjacking.
  if (window.self !== window.top) {
    return null;
  }

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ConnectionProvider>
          <SnackbarProvider
            maxSnack={5}
            autoHideDuration={8000}></SnackbarProvider>
        </ConnectionProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
