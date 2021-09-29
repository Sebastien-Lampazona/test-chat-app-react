import * as React from 'react'
import { useCallback, useState, useMemo, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import messagesData from 'src/assets/messages.json';

import api from 'src/api';
import MessagesList, { MessageT } from 'src/components/MessagesList';
import SendMessageForm from 'src/components/SendMessageForm';

// Ajout du CSS
import './styles.scss';

interface Props {
    pseudo: string;
}

// Page principale représentant le t'chat
const Chat: React.FC<Props> = ({ pseudo }: Props) => {
    // Si jamais on a pas de pseudo, on se fait rediriger vers la page de "login"
    if (!pseudo) {
        return <Redirect to="/" />
    }
    // Fonction permettant de classer les message par date d'envoie
    // Vaut mieux être sur que les messages sont toujours dans l'ordre au début 
    // ( on pourrait faire cette vérification coté api ... Si y'avais un API ! )
    const sortMessages = useCallback((unsortedMessages: Array<MessageT>) => {
        return unsortedMessages.sort((a: MessageT, b: MessageT) => a.date - b.date)
    }, []);

    // Initialisation des states
    const [page, setPage] = useState(1);
    const [fetchedAllMessages, setFetchedAllMessages] = useState(false);
    const [loading, setLoading] = useState(false);

    // Fonction permettant d'extraire les messages depuis le fichier de date
    // Prend la page à récupérer en paramètre
    // On pourrait aussi le faire coté API si y'avait un API
    const takeMessagesFromData = useCallback((pageToFetch) => {
        const nbToFetch = 5;
        let start = messagesData.length - (pageToFetch * nbToFetch) - nbToFetch + 1;
        const end = messagesData.length - (pageToFetch * nbToFetch) + 1;

        // Si le début est inférieur à 0 c'est qu'on a y'a moins de chose à afficher que ce qu'on veut récupérer
        if (start <= 0) {
            // Du coup on ramène à 0 ( pour pas avoir d'erreur et avoir tous les éléments )
            start = 0;
            // Et on dit qu'on a tout récupéré, pour éviter d'avoir à faire des requetes inutiles 
            // puisqu'on sait que y'a plus rien à récupérer
            setFetchedAllMessages(true);
        }
        // Et biensure on classe les messages
        return sortMessages(messagesData).slice(start, end)
    }, [page]);

    // On récupère les messages initiaux et on les mémoize afin d'éviter de faire ça à chaque render
    const initMessages = useMemo(() => takeMessagesFromData(page), []);
    const [messages, setMessages] = useState(initMessages);

    // Fonction permettant de récupérer les messages par page et d'incrémenter la page 
    // uniquement quand la récupération s'est bien passée
    const fetchMessagesPage = useCallback(() => {
        return (new Promise<MessageT[]>((resolve, reject) => {
            if (!loading && !fetchedAllMessages) {
                setLoading(true);
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
            }
            else resolve([]);
        })).finally(() => {
            setLoading(false);
        })
    }, [loading, page, messages]);

    // Fonction permettant l'envoi d'un nouveau message
    // En gros elle récupére les informations necessaire pour créer un message
    // Et elle l'ajoute à la fin du tableau de messages
    const sendNewMessage = useCallback((userPseudo: string, fullname: string, iconUrl: string, message: string) => {
        if (!message.trim()) {
            throw new Error('Impossible d\'envoyer un message vide')
        }
        setMessages([
            ...messages,
            {
                author: {
                    pseudo: userPseudo,
                    fullName: fullname,
                    iconUrl: iconUrl
                },
                date: Date.now(),
                message,
            }
        ])
    }, [messages]);

    // Réaction à la soumission du formulaire d'envoi de message
    const handleOnSubmitSendMessageForm = useCallback((message: string) => {
        return sendNewMessage(
            pseudo,
            pseudo,
            // Image en dur ( toujours pas d'api et le store est à venir ;) )
            "https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1130/cached.offlinehbpl.hbpl.co.uk/news/OMC/Trumpinflames820-2017011311472757.jpg",
            message,
        )
    }, [pseudo, messages]);

    // Récupération des messages classés toujours dans un memo pour éviter de sort à chaque render
    const sortedMessages = useMemo(() => sortMessages(messages), [messages]);

    // Effet permettant de simuler un tchat avec plein de gens dedans
    // Des chevaliers pour la plupart qui plus est !
    useEffect(() => {
        const randomAddMessageInterval = setInterval(() => {
            // Récupération d'un message aléatoire pour le fun !
            const citation = messagesData[Math.floor(Math.random() * (messagesData.length - 1))];
            return sendNewMessage(
                citation.author.pseudo,
                citation.author.fullName,
                citation.author.iconUrl,
                citation.message
            );
        }, 3000);
        return () => {
            // On oublie pas de nettoyer !
            clearInterval(randomAddMessageInterval);
        }
    }, [messages]);

    return (
        <Paper className="chat" elevation={3}>
            <MessagesList
                pseudo={pseudo}
                messages={sortedMessages}
                fetchMessagesPage={fetchMessagesPage}
                loading={loading}
            />
            <SendMessageForm onSubmit={handleOnSubmitSendMessageForm} />
        </Paper>
    );
};

export default React.memo(Chat);