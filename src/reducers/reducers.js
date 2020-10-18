import authorization from './authorization';
import articlesList from "./articlesList";
import editor from "./editor";

import article from "./article";
import mainstate from './mainstate';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    authorization,
    article,
    articlesList,
    editor,
    mainstate,
    router: connectRouter(history)
});



