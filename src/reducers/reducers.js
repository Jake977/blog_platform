import authorization from './authorization';
import mainstate from './mainstate';
import home from './home';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
    authorization,
    mainstate,
    home,
    router: connectRouter(history)
});



