import { render } from 'react-dom';
import { Provider, ReactReduxContext } from 'react-redux';
import React from 'react';
import { store, history} from './store';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
import App from './components/App/App';

render(
    <Provider store={store}>
        <ConnectedRouter history={history} context={ReactReduxContext}>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
