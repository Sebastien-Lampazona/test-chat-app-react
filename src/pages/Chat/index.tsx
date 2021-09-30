import * as React from 'react'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {
    fetchMessagesByPages,
    startSeedInterval,
    stopSeedInterval,
} from 'src/actions/tchat';

import { RootState } from 'src/reducers';
import MessagesList, { MessageT } from 'src/components/MessagesList';
import SendMessageForm from 'src/components/SendMessageForm';

// Ajout du CSS
import './styles.scss';


// Page principale représentant le t'chat
const Chat: React.FC = () => {
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.tchat.page);
    const pseudo = useSelector((state: RootState) => state.settings.pseudo);

    // Si jamais on a pas de pseudo, on se fait rediriger vers la page de "login"
    if (!pseudo) {
        return <Redirect to="/" />
    }

    // Initialisation des states
    const [fetchedAllMessages, setFetchedAllMessages] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fonction permettant de récupérer les messages par page et d'incrémenter la page 
    // uniquement quand la récupération s'est bien passée
    const fetchMessages = useCallback(() => {
        if (!loading && !fetchedAllMessages) {
            setLoading(true);
            return dispatch(fetchMessagesByPages(page + 1))
                // @ts-ignore
                .then((fetchedMessages) => {
                    if (fetchedMessages?.length === 0) {
                        // Et on dit qu'on a tout récupéré, pour éviter d'avoir à faire des requetes inutiles 
                        // puisqu'on sait que y'a plus rien à récupérer
                        setFetchedAllMessages(true);
                    }
                    return fetchedMessages;
                })
                .finally(() => {
                    setLoading(false);
                })
        }
        else return Promise.resolve([]);
    }, [page, loading, fetchedAllMessages]);

    // Effet permettant de simuler un tchat avec plein de gens dedans
    // Des chevaliers pour la plupart qui plus est !
    useEffect(() => {
        dispatch(startSeedInterval());
        return () => {
            // On oublie pas de nettoyer !
            dispatch(stopSeedInterval());
        }
    }, []);

    return (
        <Paper className="chat" elevation={3}>
            <MessagesList
                onTopReach={fetchMessages}
                loading={loading}
            />
            <SendMessageForm />
        </Paper>
    );
};

export default React.memo(Chat);