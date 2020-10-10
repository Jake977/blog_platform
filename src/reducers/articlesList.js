import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    SET_PAGE,
    APPLY_TAG_FILTER,
    CHANGE_ARTICLES_LIST
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
        case APPLY_TAG_FILTER:
            return {
                ...state,
                pager: action.pager,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                tab: null,
                tag: action.tag,
                currentPage: 0
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
        case CHANGE_ARTICLES_LIST:
            return {
                ...state,
                articles: action.payload.articles,
                articlesCount: action.payload.articlesCount,
                tab: action.tab,
                pager: action.pager,
                currentPage: 0,
                tag: null
            };
        default:
            return state;
    }
};
