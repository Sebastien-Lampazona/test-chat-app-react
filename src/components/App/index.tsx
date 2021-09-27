import { useState, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Import locaux
import LogIn from 'src/pages/Login';
import Chat from 'src/pages/Chat';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="http://adopteundev.fr">
        Adopteundev.fr
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [pseudo, setPseudo] = useState(localStorage.getItem('pseudo'))
  const persistPseudo = useCallback((validatedPseudo) => {
    setPseudo(validatedPseudo);
    localStorage.setItem('pseudo', validatedPseudo);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
          <CssBaseline />
          <Switch>
            <Route path="/" exact >
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact >
              <LogIn onFormSuccess={persistPseudo} />
            </Route>
            <Route path="/chat" exact >
              <Chat pseudo={pseudo} />
            </Route>
          </Switch>
          <Copyright sx={{ mt: 5 }} />
      </BrowserRouter>
    </ThemeProvider>
  );
}