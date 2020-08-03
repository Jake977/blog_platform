import React from 'react';
import { Route, Switch } from 'react-router-dom';
import UsersList from './UsersList';
import RegFormView from './AddUser';

const Users = ({ match }) => {
    const { path } = match;

    return (
        <Switch>
            <Route exact path={path} component={UsersList} />
            <Route exact path={path} component={RegFormView} />
        </Switch>
    );
};

export default Users;
