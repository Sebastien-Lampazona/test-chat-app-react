import * as React from 'react'
import { useCallback, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import messagesData from 'src/assets/messages.json';

// Ajout du CSS
import './styles.scss';
import MessagesList, { MessageT } from 'src/components/MessagesList';
import SendMessageForm from 'src/components/SendMessageForm';

interface Props {
    pseudo: string;
}

const Chat: React.FC<Props> = ({ pseudo }: Props) => {
    if (!pseudo) {
        return <Redirect to="/" />
    }

    const [messages, setMessages] = useState(messagesData);

    const sortMessages = useCallback((unsortedMessages: Array<MessageT>) => {
        return unsortedMessages.sort((a: MessageT, b: MessageT) => a.date - b.date)
    }, []);

    const sendNewMessage = useCallback((message) => {
        if (!message.trim()) {
            throw new Error('Impossible d\'envoyer un message vide')
        }
        setMessages([
            ...messages,
            {
                author: {
                    pseudo,
                    fullName: pseudo,
                    iconUrl: "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1130/cached.offlinehbpl.hbpl.co.uk/news/OMC/Trumpinflames820-2017011311472757.jpg"
                },
                date: Date.now(),
                message,
            }
        ])
    }, [messages]);

    return (
        <Paper className="chat" elevation={3}>
            <MessagesList pseudo={pseudo} messages={sortMessages(messages)} />
            <SendMessageForm onSubmit={sendNewMessage} />
        </Paper>
    );
};

export default Chat;