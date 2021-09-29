import * as React from 'react'
import { useEffect, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import { CircularProgress, Typography } from '@mui/material';
import classnames from 'classnames';
import MessageItem, { AuthorT } from './MessageItem';

export type MessageT = {
    author: AuthorT;
    message: string;
    date: number;
}

interface Props {
    pseudo: string;
    messages?: Array<MessageT>;
    fetchMessagesPage?: () => Promise<MessageT[]>;
    // fetchMessagesPage?: () => void;
    loading?: boolean;
}


/**
 * Permet d'afficher une liste de messages
 */
const MessagesList: React.FC<Props> = ({ pseudo, messages, fetchMessagesPage, loading }: Props) => {
    const containerRef = useRef(null);
    const [stickedToBottom, setStickedToBottom] = useState(true);
    const [stickedFirstTime, setStickedFirstTime] = useState(false);

    // Effet permettant de scroll vers le bas en cas de nouveau message ( si on est déjà en bas, sinon c'est relou )
    useEffect(() => {
        if (stickedToBottom) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: stickedFirstTime ? 'smooth' : undefined
            });
            if (!stickedFirstTime) {
                setStickedFirstTime(true);
            }
        }
    }, [messages, stickedToBottom]);

    // Le gap permettant de savoir si on a assez scroll vers le bas pour redéclencher le fetch en remontant
    const [fetchGapRaised, setFetchGapRaised] = useState(false);
    useEffect(() => {
        const onDivScroll = () => {
            const fetchGap = 50;
            let stickedToBottom = containerRef.current.scrollTop + containerRef.current.clientHeight >= containerRef.current.scrollHeight
            setStickedToBottom(stickedToBottom);
            if (!stickedFirstTime && stickedToBottom) {
                setStickedFirstTime(true);
            }
            if (containerRef.current.scrollTop <= fetchGap && stickedFirstTime && !fetchGapRaised) {
                setFetchGapRaised(true);
            }
            else if (fetchGapRaised && containerRef.current.scrollTop >= fetchGap) {
                setFetchGapRaised(false);
            }
        };
        containerRef.current.addEventListener('scroll', onDivScroll);
        return () => {
            containerRef.current.removeEventListener('scroll', onDivScroll);
        }
    }, [fetchGapRaised, stickedFirstTime]);

    // Permet de lancer le fetch que quand y'en a besoin
    useEffect(() => {
        if (fetchGapRaised) {
            // On enregistre la position d'avant le fetch
            const scrollHeightBeforeFetch = containerRef.current.scrollHeight;
            fetchMessagesPage().then((messages) => {
                if (messages.length) {
                    // Pour venir si y'a eu des résultats se remettre là ou on été afin de pouvoir continuer à scroll vers le haut
                    containerRef.current.scrollTop = containerRef.current.scrollHeight - scrollHeightBeforeFetch;
                }
            });
        }
    }, [fetchGapRaised])




    return (
        <Box className="messages-list">
            <Box className="messages-list__header">
                <Typography variant="subtitle2" component="h1">Connecté en tant {pseudo}</Typography>
            </Box>
            <Box className="messages-list__content" ref={containerRef}>
                <Box className={classnames('messages-list__loading', {'messages-list__loading--visible': loading})}>
                    <CircularProgress size={20} style={{ marginRight: 15 }} /> Récupération en cours
                </Box>
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
    loading: false,
}

export default React.memo(MessagesList);