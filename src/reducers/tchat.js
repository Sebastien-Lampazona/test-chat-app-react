import {
  ADD_FETCHED_MESSAGES,
  SET_PAGE,
  SUBMIT_MESSAGE,
} from 'src/actions/tchat';
import { takeMessagesFromData } from 'src/core';

const INITIAL_STATE = {
  messages: takeMessagesFromData(1),
  page: 1,
}
export default function settings(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case ADD_FETCHED_MESSAGES:
      return {
        ...state,
        messages: [
          ...action.messages,
          ...state.messages,
        ],
      }
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      }
    case SUBMIT_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            author: {
              pseudo: action.userPseudo,
              fullName: action.fullname,
              iconUrl: action.iconUrl
            },
            date: Date.now(),
            message: action.message,
          }
        ]
      };
    default:
      return state;
  }
}