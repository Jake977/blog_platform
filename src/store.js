import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducer from './reducers/reducers';

//import { routerMiddleware } from 'react-router-redux'
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();
const myRouterMiddleware = routerMiddleware(history);

const getMiddleware = () => applyMiddleware(
    myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger()
);

// const getMiddleware = () => {
//     if (process.env.NODE_ENV === 'production') {
//         return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware);
//     } else {
//         // Enable additional logging in non-production environments.
//         return applyMiddleware(myRouterMiddleware, promiseMiddleware, localStorageMiddleware, createLogger())
//     }
// };

export const store = createStore(
    reducer(history),
    {},
    getMiddleware()
);
