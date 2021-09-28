import * as React from 'react'
import { useCallback, useState, useMemo, useEffect } from 'react'
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
    const sortMessages = useCallback((unsortedMessages: Array<MessageT>) => {
        return unsortedMessages.sort((a: MessageT, b: MessageT) => a.date - b.date)
    }, []);

    const [page, setPage] = useState(1);
    const [fetchedAllMessages, setFetchedAllMessages] = useState(false);
    const [loading, setLoading] = useState(false);

    const takeMessagesFromData = useCallback((pageToFetch) => {
        const nbToFetch = 3;
        let start = messagesData.length - (pageToFetch * nbToFetch) - nbToFetch + 1;
        const end = messagesData.length - (pageToFetch * nbToFetch) + 1;

        if (start <= 0) {
            start = 0;
            setFetchedAllMessages(true);
        }
        return sortMessages(messagesData).slice(start, end)
    }, [page]);

    const initMessages = useMemo(() => takeMessagesFromData(page), []);
    const [messages, setMessages] = useState(initMessages);

    const fetchMessagesPage = useCallback(() => {
        if (!loading && !fetchedAllMessages) {
            setLoading(true);
            return (new Promise((resolve, reject) => {
                const pageToFetch = page + 1;
                setTimeout(() => {
                    const fetchedMessages = takeMessagesFromData(pageToFetch);
                    setMessages([
                        ...fetchedMessages,
                        ...messages,
                    ]);
                    setPage(pageToFetch);
                    resolve(fetchedMessages);
                }, 1000);
            })).finally(() => {
                setLoading(false);
            })
        }
    }, [loading, page]);

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

    const sortedMessages = useMemo(() => sortMessages(messages), [messages]);

    return (
        <Paper className="chat" elevation={3}>
            <MessagesList
                pseudo={pseudo}
                messages={sortedMessages}
                fetchMessagesPage={fetchMessagesPage}
                loading={loading}
            />
            <SendMessageForm onSubmit={sendNewMessage} />
        </Paper>
    );
};

export default React.memo(Chat);