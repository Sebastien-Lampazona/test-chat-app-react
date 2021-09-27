import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import MessageItem, { AuthorT } from './MessageItem';

export type MessageT = {
    author: AuthorT;
    message: string;
    date: number;
}

interface Props {
    pseudo: string;
    messages?: Array<MessageT>
}


/**
 * Permet d'afficher une liste de messages
 */
const MessagesList: React.FC<Props> = ({ pseudo, messages }: Props) => {
    const containerRef = useRef(null);
    const [stickToBottom, setStickToBottom] = useState(true);

    // Effet permettant de savoir si on est en free scroll ou pas
    useEffect(() => {
        const onDivScroll = () => {
            setStickToBottom(containerRef.current.scrollTop + containerRef.current.clientHeight === containerRef.current.scrollHeight);
        };
        containerRef.current.addEventListener('scroll', onDivScroll);
        return () => {
            containerRef.current.removeEventListener('scroll', onDivScroll);
        }
    }, []);

    // Effet permettant de scroll vers le bas en cas de nouveau message ( si on est déjà en bas sinon c'est relou )
    useEffect(() => {
        if (stickToBottom) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
            setStickToBottom(true);
        }
    }, [messages, stickToBottom]);


    return (
        <Box className="messages-list">
            <Box className="messages-list__header">
                <Typography variant="subtitle2" component="h1">Connecté en tant {pseudo}</Typography>
            </Box>
            <Box className="messages-list__content" ref={containerRef}>
                {
                    messages && messages.length === 0
                        ? <Typography style={{ textAlign: 'center' }} variant="subtitle2">Aucun message à afficher</Typography>
                        : messages.map((message) => (
                            <MessageItem
                                {...message}
                                isMine={message.author.pseudo.trim() === pseudo.trim()}
                                key={message.date}
                            />
                        ))
                }
            </Box>
        </Box>
    );
};

MessagesList.defaultProps = {
    messages: [],
}

export default MessagesList;