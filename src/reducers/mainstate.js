import {
    APP_LOAD,
    REDIRECT,
    LOGOUT,
    LOGIN,
    SIGNUP,
    LOGIN_PAGE_UNLOADED,
    SIGNUP_PAGE_UNLOADED,
    HOME_PAGE_UNLOADED
} from '../actionTypes';

const defaultState = {
    token: null,
    viewChangeCounter: 0
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case APP_LOAD:
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
            };
        case REDIRECT:
            return { ...state, redirectTo: null };
        case LOGOUT:
            return { ...state, redirectTo: '/', token: null, currentUser: null };
        case LOGIN:
        case SIGNUP:
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                token: action.error ? null : action.payload.user.token,
                currentUser: action.error ? null : action.payload.user
            };
        case HOME_PAGE_UNLOADED:
        case LOGIN_PAGE_UNLOADED:
        case SIGNUP_PAGE_UNLOADED:
            return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
        default:
            return state;
    }
};

