import userService from './services/userService';
import storageService from './services/storageService'
import { SIGNUP, LOGIN, LOGOUT } from './actionTypes';

const promiseMiddleware = (store) => (next) => (action) => {
    if (isPromise(action.payload)) {
        action.payload.then(
            res => {
                console.log('RESULT', res);
                action.payload = res;
                store.dispatch(action);
            },
            error => {
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.response.body;
                store.dispatch(action);
            }
        );
        return;
    }
    next(action);
};

const localStorageMiddleware = (store) => (next) => (action) => {
    if (action.type === LOGOUT) {
        storageService.setToLocalStorage('jwt', '');
        userService.setToken(null);
    }

    if (action.type === SIGNUP || action.type === LOGIN) {
        if (!action.error) {
            storageService.setToLocalStorage('jwt', action.payload.user.token);
            userService.setToken(action.payload.user.token);
        }
    }
    next(action);
};

function isPromise(val) {
    return val && typeof val.then === 'function';
}

export { promiseMiddleware, localStorageMiddleware }
