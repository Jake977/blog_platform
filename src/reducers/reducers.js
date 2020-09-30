import authorization from './authorization';
import mainstate from './mainstate';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    authorization,
    mainstate,
    router: connectRouter(history)
});



