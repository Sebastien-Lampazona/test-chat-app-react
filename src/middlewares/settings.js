import {
    SAVE_PSEUDO
} from 'src/actions/settings';

export default storeAPI => next => action => {
    switch(action.type){
        case SAVE_PSEUDO:
            localStorage.setItem('pseudo', action.pseudo);
            return next(action);
        default:
            return next(action);
    }
  }