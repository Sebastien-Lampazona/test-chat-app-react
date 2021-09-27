import * as React from 'react'
import { useHistory } from 'react-router-dom';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import LogInForm from 'src/components/LogInForm';
import VerifiedUserOutlined from '@mui/icons-material/VerifiedUserOutlined';
import Container from '@mui/material/Container';

interface Props {
    onFormSuccess: (pseudo:string) => void;
}

const Login: React.FC<Props> = ({onFormSuccess}:Props) => {
    let history = useHistory();

    const handleSubmitForm = (pseudo: string) => {
        // On vérifie le pseudo
        if (pseudo.trim() === '') {
            throw new Error('Euh ... Y\'a pas de pseudo là !')
        }

        // Si le pseudo est bien là, alors on le remonte
        onFormSuccess(pseudo);

        // Puis on va vers le tchat
        history.push("/chat");
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                <Avatar sx={{ width: 125, height: 125 }} src="http://adopteundev.fr/wp-content/uploads/2020/01/matronche-scaled.jpg" />
                <Typography component="div" variant="subtitle2">
                    Oué c'est moi !
                </Typography>
            </div>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <VerifiedUserOutlined />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <LogInForm onSubmit={handleSubmitForm} />
                </Box>
            </Paper>
        </Container>
    );
};

export default Login;