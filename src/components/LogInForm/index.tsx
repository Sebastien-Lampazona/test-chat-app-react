import * as React from 'react'
import { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

interface SettingsProps {
    pseudo: string,
}

interface StateProps {
    settings: SettingsProps
}

interface DispatchProps {}

interface OwnProps {
    onSubmit: (pseudo: string) => void;
}

type Props = SettingsProps & DispatchProps & OwnProps

const mapState = (state: StateProps): SettingsProps => ({
    pseudo: state.settings.pseudo,
})

const mapDispatch = {}

export const LogInForm: React.FC<Props> = ({ pseudo, onSubmit }: Props) => {
    const [error, setError] = useState(null);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = new FormData(event.currentTarget);
            const pseudoValue:string = data.get('pseudo').toString();
            // On vérifie le pseudo
            if (pseudoValue.trim() === '') {
                throw new Error('Euh ... Y\'a pas de pseudo là !')
            }
            // Puis on va vers le tchat
            onSubmit(pseudoValue);
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
                        defaultValue={pseudo}
                        autoComplete="nickname"
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

export default connect<SettingsProps, DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(LogInForm)