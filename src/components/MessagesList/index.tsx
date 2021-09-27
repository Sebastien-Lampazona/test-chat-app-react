import * as React from 'react'
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
    return (
        <Box className="messages-list">
            <Box className="messages-list__header">
                <Typography variant="subtitle2" component="h1">Connecté en tant {pseudo}</Typography>
            </Box>
            <Box className="messages-list__content">
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