import { useState, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Route, Switch, Redirect } from 'react-router-dom';

// Import locaux
import Copyright from './Copyright';
import LogIn from 'src/pages/Login';
import Chat from 'src/pages/Chat';

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
          <CssBaseline />
          <Switch>
            <Route path="/" exact >
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact >
              <LogIn />
            </Route>
            <Route path="/chat" exact >
              {/* <Chat /> */}
            </Route>
          </Switch>
          <Copyright sx={{ mt: 5 }} />
    </ThemeProvider>
  );
}