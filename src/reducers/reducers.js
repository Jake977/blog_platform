import authorization from './authorization';
import mainstate from './mainstate';
import home from './home';

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
//import { routerReducer } from 'react-router-redux';

// export default combineReducers({
//     authorization,
//     mainstate,
//     home,
//     router: routerReducer
// });

export default (history) => combineReducers({
    authorization,
    mainstate,
    home,
    router: connectRouter(history)
});



