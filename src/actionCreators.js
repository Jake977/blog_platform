const doSignUp = (payload) => ({ type: 'SIGNUP', payload });
const doLogIn = (payload) => ({ type: 'LOGIN', payload });
const doLogOut = () => ({ type: 'LOGOUT' });
const doUpdateFieldAuth = (key, value) => ({ type: 'UPDATE_FIELD_AUTH', key: key, value });
const doRedirect = (payload) => ({ type: 'REDIRECT', payload });
const doSetPage = (page, payload) => ({ type: 'SET_PAGE', page, payload });

const doAppLoad = (payload, token) => ({ type: 'APP_LOAD', payload, token });
const doHomeLoaded = (tag, pager, payload) => ({ type: 'HOME_PAGE_LOADED', tag, pager, payload });
const doHomeUnloaded = () => ({ type: 'HOME_PAGE_UNLOADED' });
const doFilterByTag = (tag, pager, payloads) => ({ type: 'APPLY_TAG_FILTER', tag, pager, payloads });
const doChangeArticlesList = (tab, pager, payload) => ({ type: 'CHANGE_ARTICLES_LIST', tab, pager, payload });

const doArticlePageLoaded = (payload) => ({ type: 'ARTICLE_PAGE_LOADED', payload });
const doArticlePageUnloaded = () => ({ type: 'ARTICLE_PAGE_UNLOADED' });
const doArticleDelete = (payload) => ({ type: 'DELETE_ARTICLE', payload });

const doArticleLike = (payload) => ({ type: 'ARTICLE_LIKE', payload });
const doArticleUnlike = (payload) => ({ type: 'ARTICLE_UNLIKE', payload });
const doArticleSubmitted = (payload) =>({type: 'ARTICLE_SUBMITTED', payload});
const doUpdateFieldEditor = (key, value) =>({type: 'UPDATE_FIELD_EDITOR', key, value});

//const doAddTag = () => ({ type: 'ADD_TAG' });
//const doRemoveTag = (tag) => ({ type: 'ADD_TAG', tag });

const doEditorLoaded = (payload) => ({ type: 'EDITOR_PAGE_LOADED', payload });
const doEditorUnloaded = () => ({ type: 'EDITOR_PAGE_UNLOADED' });

// export const ADD_TAG = 'ADD_TAG';
// export const REMOVE_TAG = 'REMOVE_TAG';
// export const ARTICLE_LIKE = 'ARTICLE_LIKE';
// export const ARTICLE_UNLIKE = 'ARTICLE_UNLIKE';

export default {
    doSignUp,
    doUpdateFieldAuth,
    doLogIn,
    doLogOut,
    doAppLoad,
    doHomeLoaded,
    doHomeUnloaded,
    doRedirect,
    doSetPage,
    doFilterByTag,
    doChangeArticlesList,
    doArticlePageLoaded,
    doArticlePageUnloaded,
    doArticleDelete,
    doArticleLike,
    doArticleUnlike,
    doArticleSubmitted,
    doUpdateFieldEditor,
    doEditorUnloaded,
    doEditorLoaded,
}
