import * as React from 'react'
import { useCallback } from 'react'
import { Redirect } from 'react-router-dom';
import Paper from '@mui/material/Paper';

// Ajout du CSS
import './styles.scss';
import MessagesList from 'src/components/MessagesList';
import SendMessageForm from 'src/components/SendMessageForm';

interface Props {
    pseudo: string;
}

const Chat: React.FC<Props> = ({ pseudo }: Props) => {
    if (!pseudo) {
        return <Redirect to="/" />
    }

    const sendNewMessage = useCallback((message) => {
        console.log('Ajout d\'un nouveau message', message)
    }, []);

    return (
        <Paper className="chat" elevation={3}>
            <MessagesList pseudo={pseudo} />
            <SendMessageForm onSubmit={sendNewMessage} />
        </Paper>
    );
};

export default Chat;