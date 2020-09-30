//import { bindActionCreators } from 'redux'

const doSignUp = (payload) => ({ type: 'SIGNUP', payload });
const doSignUpUnloaded = () => ({ type: 'SIGNUP_PAGE_UNLOADED' });

const doLogIn = (payload) => ({ type: 'LOGIN', payload });
const doLogOut = () => ({ type: 'LOGOUT' });
const doLoginUnloaded = () => ({ type: 'LOGIN_PAGE_UNLOADED'});

const doUpdateFieldAuth = (key, value) => ({ type: 'UPDATE_FIELD_AUTH', key: key, value });

const doAsyncStart = (subtype) => ({ type: 'ASYNC_START', subtype: subtype });
const doAsyncEnd = (promise) => ({ type: 'ASYNC_END', promise: promise });

const doAppLoad = (payload, token) => ({ type: 'APP_LOAD', payload, token, skipTracking: true });

const doRedirect = (payload) => ({ type: 'REDIRECT', payload });

const doHomeLoaded = (payload) => ({ type: 'HOME_PAGE_LOADED', payload });
const doHomeUnloaded = () => ({ type: 'HOME_PAGE_UNLOADED' });

//const boundUpdateFieldAuth = bindActionCreators(doUpdateFieldAuth, store.dispatch);

export default {
    doSignUp,
    doUpdateFieldAuth,
    doSignUpUnloaded,
    doLogIn,
    doLogOut,
    doLoginUnloaded,
    doAsyncStart,
    doAsyncEnd,
    doAppLoad,
    doRedirect,
    doHomeLoaded,
    doHomeUnloaded
}
