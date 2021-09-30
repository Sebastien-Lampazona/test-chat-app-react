import { takeMessagesFromData } from 'src/core';


// Action Types
export const FETCH_MESSAGES_BY_PAGE = 'FETCH_MESSAGES_BY_PAGE'
export const ADD_FETCHED_MESSAGES = 'ADD_FETCHED_MESSAGES';
export const SUBMIT_MESSAGE = 'SUBMIT_MESSAGES';
export const SET_PAGE = 'SET_PAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const START_SEED_INTERVAL = 'START_SEED_INTERVAL';
export const STOP_SEED_INTERVAL = 'STOP_SEED_INTERVAL';

// Action creators
export const addFetchedMessages = (messages) => {
    return {
        type: ADD_FETCHED_MESSAGES,
        messages,
    }
}

export const setPage = (page) => {
    return {
        type: SET_PAGE,
        page,
    }
}

export const sendMessage = (message) => {
    return {
        type: SEND_MESSAGE,
        message,
    }
}

export const addMessage = (userPseudo, fullname, iconUrl, message) => {
    return {
        type: SUBMIT_MESSAGE,
        userPseudo, 
        fullname, 
        iconUrl, 
        message
    }
}

export const startSeedInterval = () => {
    return {
        type: START_SEED_INTERVAL,
    }
}

export const stopSeedInterval = () => {
    return {
        type: STOP_SEED_INTERVAL,
    }
}


export const fetchMessagesByPages = (pageToFetch) => {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const fetchedMessages = takeMessagesFromData(pageToFetch);
                dispatch(addFetchedMessages(fetchedMessages));
                dispatch(setPage(pageToFetch));
                resolve(fetchedMessages);
            }, 1000);
        })
    };
}