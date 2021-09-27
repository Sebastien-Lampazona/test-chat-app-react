import * as React from 'react'
import { useState } from 'react';
import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { Typography } from '@mui/material';

interface Props {
    onSubmit?: (message: string) => void;
}

/**
 * Permet d'afficher un formulaire d'envoie de message
 */
const SendMessageForm: React.FC<Props> = ({ onSubmit }: Props) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = (event: React.FormEvent) => {
        // Pour éviter le rechargement de la page
        event.preventDefault();
        try {
            // Puis on transmet au parent si la fonction existe
            onSubmit && onSubmit(message);
            setMessage('');
            setError(null);
        }
        catch (e) {
            setError(e);
        }
    }

    return (
        <Box component="form" noValidate className="send-message-form" onSubmit={handleSubmit}>
            <InputBase
                placeholder="Votre message ici ..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                error={error !== null}
            />
            <ButtonUnstyled type="submit">
                <SendIcon />
            </ButtonUnstyled>
        </Box>
    );
};

export default SendMessageForm;