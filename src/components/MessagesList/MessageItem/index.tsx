import * as React from 'react'
import * as dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import classnames from 'classnames';
import { Typography } from '@mui/material';

type Props = {
    author: AuthorT;
    message: string;
    date: number;
    isMine?: boolean;
}

export type AuthorT = {
    pseudo: string,
    fullName: string,
    iconUrl: string,
}


/**
 * Permet d'afficher une liste de messages
 */
const MessageItem: React.FC<Props> = ({ author, message, date, isMine }: Props) => {
    return (
        <Box className={classnames('message', { 'message--is-mine': isMine })}>
            <Avatar
                className="message__avatar"
                alt={author.fullName}
                src={author.iconUrl}
                sx={{ width: 56, height: 56 }}
            />
            <Box className="message__container">
                <Box className="message__pseudo">
                    {author.pseudo}
                </Box>
                <Box className="message__content">
                    {message}
                </Box>
                <Box className="message__date">
                    {dayjs(date).calendar()}
                </Box>
            </Box>


        </Box>
    );
};

export default MessageItem;