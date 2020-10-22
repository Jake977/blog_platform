import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    SET_PAGE,
} from '../actionTypes';

export default (state = {}, action) => {
    switch (action.type) {
        case SET_PAGE:
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                currentPage: action.page
            };
        case HOME_PAGE_LOADED:
            return {
                ...state,
                articles: action.payload[1].articles,
                articlesCount: action.payload[1].articlesCount,
                pager: action.pager,
                currentPage: 0,
            };
        case HOME_PAGE_UNLOADED:
            return {};
        default:
            return state;
    }
};
