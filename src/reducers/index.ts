import { combineReducers } from 'redux'
import settings from './settings'
import tchat from './tchat'

const rootReducer = combineReducers({
    settings,
    tchat
});

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;
