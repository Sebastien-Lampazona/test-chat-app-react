import { useState, useCallback } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

// Import locaux
import Copyright from './Copyright';
import LogIn from 'src/pages/Login';
import Chat from 'src/pages/Chat';

const theme = createTheme();

export default function App() {
  // Initialisation du pseudo
  const [pseudo, setPseudo] = useState(localStorage.getItem('pseudo'))
  // Fonction permettant de mettre à jour le state du pseudo et de le persister dans le localstorage
  // au cas ou on revient sur la page pour pas avoir à le resaisir
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