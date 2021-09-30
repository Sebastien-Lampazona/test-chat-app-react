import messagesData from 'src/assets/messages.json';
import { MessageT } from 'src/components/MessagesList';

export const takeMessagesFromData = (pageToFetch: number) => {
    const nbToFetch = 5;
    let start = messagesData.length - (pageToFetch * nbToFetch) - nbToFetch + 1;
    const end = messagesData.length - (pageToFetch * nbToFetch) + 1;

    if (end <= 0){
        return [];
    }
    // Si le début est inférieur à 0 c'est qu'on a y'a moins de chose à afficher que ce qu'on veut récupérer
    if (start <= 0) {
        // Du coup on ramène à 0 ( pour pas avoir d'erreur et avoir tous les éléments )
        start = 0;
    }
    console.log("end", end);
    // Et biensure on classe les messages
    return sortMessages(messagesData).slice(start, end)
}


export const sortMessages = (unsortedMessages: Array<MessageT>) => {
    return unsortedMessages.sort((a: MessageT, b: MessageT) => a.date - b.date)
};