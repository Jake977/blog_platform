const doSignUp = (payload) => ({ type: 'SIGNUP', payload });
const doLogIn = (payload) => ({ type: 'LOGIN', payload });
const doLogOut = () => ({ type: 'LOGOUT' });
const doUpdateFieldAuth = (key, value) => ({ type: 'UPDATE_FIELD_AUTH', key: key, value });
const doAppLoad = (payload, token) => ({ type: 'APP_LOAD', payload, token });
const doRedirect = (payload) => ({ type: 'REDIRECT', payload });

export default {
    doSignUp,
    doUpdateFieldAuth,
    doLogIn,
    doLogOut,
    doAppLoad,
    doRedirect,
}
