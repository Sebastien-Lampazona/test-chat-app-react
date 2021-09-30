import messagesData from 'src/assets/messages.json';
import {
    SEND_MESSAGE,
    START_SEED_INTERVAL,
    STOP_SEED_INTERVAL,
    addMessage,
} from 'src/actions/tchat';

let randomAddMessageInterval = null;
export default storeAPI => next => action => {
    switch (action.type) {
        case SEND_MESSAGE:
            storeAPI.dispatch(
                addMessage(
                    storeAPI.getState().settings.pseudo,
                    storeAPI.getState().settings.pseudo,
                    storeAPI.getState().settings.avatar,
                    action.message
                )
            )
            return next(action);
        case START_SEED_INTERVAL:
            randomAddMessageInterval = setInterval(() => {
                const citation = messagesData[Math.floor(Math.random() * (messagesData.length - 1))];
                storeAPI.dispatch(
                    addMessage(
                        citation.author.pseudo,
                        citation.author.fullName,
                        citation.author.iconUrl,
                        citation.message
                    )
                );
            }, 3000);
            return next(action);

        case STOP_SEED_INTERVAL:
            // On oublie pas de nettoyer !
            clearInterval(randomAddMessageInterval);
            return next(action);
        default:
            return next(action);
    }
}