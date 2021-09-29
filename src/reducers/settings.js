import {
  SAVE_PSEUDO
} from 'src/actions/settings';

const INITIAL_STATE = {
  pseudo: localStorage.getItem('pseudo'),
  avatar: 'https://avatarfiles.alphacoders.com/798/79894.jpg'
}
export default function settings(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SAVE_PSEUDO:
      return {
        ...state,
        pseudo: action.pseudo,
      }
    default:
      return state
  }
}