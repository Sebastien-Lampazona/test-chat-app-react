import * as React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

interface Props {
    pseudo: string;
}

/**
 * Permet d'afficher une liste de messages
 */
const MessagesList: React.FC<Props> = ({ pseudo }: Props) => {
    return (
        <Box className="messages-list">
            <Box className="messages-list__header">
                <Typography variant="subtitle2" component="h1">Connecté en tant {pseudo}</Typography>
            </Box>
            <Box className="messages-list__content"></Box>
        </Box>
    );
};

export default MessagesList;