import * as React from 'react'
import { useState, useCallback } from 'react';
import ButtonUnstyled from '@mui/core/ButtonUnstyled';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import { sendMessage } from 'src/actions/tchat';
import { connect } from 'react-redux';

interface DispatchProps { }

interface OwnProps {
    onSubmit: (message: string) => void;
}

type Props = DispatchProps & OwnProps

const mapState: null = null;

const mapDispatch = (dispatch: (arg0: any) => any) => ({
    onSubmit: (message: string) => dispatch(sendMessage(message)),
});

/**
 * Permet d'afficher un formulaire d'envoie de message
 */
export const SendMessageForm: React.FC<Props> = ({ onSubmit }: Props) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // A la soumission du formulaire d'envoie de message
    const handleSubmit = (event: React.FormEvent) => {
        // Pour éviter le rechargement de la page
        event.preventDefault();
        try {
            // Puis on transmet au parent si la fonction existe
            if (!message.trim()) {
                throw new Error('Impossible d\'envoyer un message vide')
            }
            onSubmit(message);
            setMessage('');
            setError(null);
        }
        catch (e) {
            console.warn(e.message);
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

export default connect<DispatchProps, OwnProps>(
    mapState,
    mapDispatch
)(SendMessageForm)