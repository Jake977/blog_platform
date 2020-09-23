import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducers/reducers';

import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => applyMiddleware(
    myRouterMiddleware,
    promiseMiddleware,
    localStorageMiddleware,
    createLogger(),
);

export const store = createStore(
    reducer(history),
    {},
    getMiddleware(),
);
