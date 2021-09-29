import * as React from 'react'
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface Props {
    onSubmit: (pseudo:string) => void;
}

const LogInForm: React.FC<Props> = ({ onSubmit }: Props) => {
    const [error, setError] = useState(null);
    const [pseudo, setPseudo] = useState(localStorage.getItem('pseudo') || '');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // On vérifie le pseudo
            if (pseudo.trim() === '') {
                throw new Error('Euh ... Y\'a pas de pseudo là !')
            }

            // Si le pseudo est bien là, alors on l'ajoute en localstorage
            localStorage.setItem('pseudo', pseudo);
            // Puis on va vers le tchat
            onSubmit(pseudo);
        }
        catch (e) {
            setError(e.message);
        }
    };

    return (
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} textAlign="center">
                    Hello ! Avant de commencer il va me falloir ton pseudo, sinon ça risque d'être compliqué de te reconnaître !
                </Grid>
                <Grid item xs={12}>
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        {
                            error && <Alert severity="error">{error}</Alert>
                        }
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        name="pseudo"
                        label="Pseudo"
                        type="text"
                        id="pseudo"
                        autoComplete="nickname"
                        value={pseudo}
                        onChange={(event) => setPseudo(event.target.value)}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Allons t'chater !
            </Button>
        </Box>
    );
};

export default LogInForm;