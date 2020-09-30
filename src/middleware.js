import userService from './services/userService';
import storageService from './services/storageService'
import { SIGNUP, LOGIN, LOGOUT } from './actionTypes';
import actionCreators from "./actionCreators";

const promiseMiddleware = (store) => (next) => (action) => {
    if (isPromise(action.payload)) {
        store.dispatch(actionCreators.doAsyncStart(action.type));

        const currentView = store.getState().viewChangeCounter;
        const skipTracking = action.skipTracking;

        action.payload.then(
            res => {
                const currentState = store.getState();
                 if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                     return
                }
                console.log('RESULT1:', res);
                action.payload = res;
                store.dispatch(actionCreators.doAsyncEnd(action.payload));
                store.dispatch(action);
            },
            error => {
               const currentState = store.getState();
                if (!skipTracking && currentState.viewChangeCounter !== currentView) {
                    return
                 }
                console.log('ERROR', error);
                action.error = true;
                action.payload = error.response.body;
                if (!action.skipTracking) {
                    store.dispatch(actionCreators.doAsyncEnd(action.payload));
                }
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
