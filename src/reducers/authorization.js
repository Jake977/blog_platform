import {
    LOGIN,
    SIGNUP,
    UPDATE_FIELD_AUTH
} from '../actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN:
        case SIGNUP:
            return {
                ...state,
                inProgress: false,
                errors: action.error ? action.payload.errors : null
            };
        case UPDATE_FIELD_AUTH:
            return { ...state, [action.key]: action.value };
        default:
            return state;
    }
};
