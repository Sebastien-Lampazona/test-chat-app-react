import { createStore, applyMiddleware, compose } from 'redux';
import settingsMiddleware from 'src/middlewares/settings';
import reducer from 'src/reducers';

const composeEnhancers = (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(
            settingsMiddleware
        )
    )
);