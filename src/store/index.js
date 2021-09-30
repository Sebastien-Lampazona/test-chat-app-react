import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import settingsMiddleware from 'src/middlewares/settings';
import tchatMiddleware from 'src/middlewares/tchat';
import reducer from 'src/reducers';

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(
            tchatMiddleware,
            settingsMiddleware,
            thunk,
        )
    )
);