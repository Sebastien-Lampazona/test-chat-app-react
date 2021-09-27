import * as React from 'react'
import { useState } from 'react';
import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';

interface Props {
    onSubmit?: (message: string) => void;
}

/**
 * Permet d'afficher un formulaire d'envoie de message
 */
const SendMessageForm: React.FC<Props> = ({ onSubmit }: Props) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        // Pour éviter le rechargement de la page
        event.preventDefault();
        // Puis on transmet au parent si la fonction existe
        onSubmit && onSubmit(message);
        setMessage('');
    }

    return (
        <Box component="form" noValidate className="send-message-form" onSubmit={handleSubmit}>
            <InputBase
                placeholder="Votre message ici ..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
            />
            <ButtonUnstyled type="submit">
                <SendIcon />
            </ButtonUnstyled>
        </Box>
    );
};

export default SendMessageForm;