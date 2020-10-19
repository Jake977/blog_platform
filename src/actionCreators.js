const doSignUp = (payload) => ({ type: 'SIGNUP', payload });
const doLogIn = (payload) => ({ type: 'LOGIN', payload });
const doLogOut = () => ({ type: 'LOGOUT' });
const doUpdateFieldAuth = (key, value) => ({ type: 'UPDATE_FIELD_AUTH', key: key, value });
const doRedirect = (payload) => ({ type: 'REDIRECT', payload });
const doSetPage = (page, payload) => ({ type: 'SET_PAGE', page, payload });

const doAppLoad = (payload, token) => ({ type: 'APP_LOAD', payload, token });
const doHomeLoaded = (tag, pager, payload) => ({ type: 'HOME_PAGE_LOADED', tag, pager, payload });
const doHomeUnloaded = () => ({ type: 'HOME_PAGE_UNLOADED' });

const doArticlePageLoaded = (payload) => ({ type: 'ARTICLE_PAGE_LOADED', payload });
const doArticlePageUnloaded = () => ({ type: 'ARTICLE_PAGE_UNLOADED' });
const doArticleDelete = (payload) => ({ type: 'DELETE_ARTICLE', payload });

const doArticleLike = (payload) => ({ type: 'ARTICLE_LIKE', payload });
const doArticleUnlike = (payload) => ({ type: 'ARTICLE_UNLIKE', payload });
const doArticleSubmitted = (payload) =>({type: 'ARTICLE_SUBMITTED', payload});
const doUpdateFieldEditor = (key, value) =>({type: 'UPDATE_FIELD_EDITOR', key, value});

const doEditorLoaded = (payload) => ({ type: 'EDITOR_PAGE_LOADED', payload });
const doEditorUnloaded = () => ({ type: 'EDITOR_PAGE_UNLOADED' });

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
