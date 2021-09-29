import { combineReducers } from 'redux'
import settings from './settings'
import tchat from './tchat'

export default combineReducers({
    settings,
    tchat
})