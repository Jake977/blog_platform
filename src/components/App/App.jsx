import React from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import userService from '../../services/userService';
import { APP_LOAD, REDIRECT } from '../../actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Users/Login';
import Signup from '../Users/Signup';
import { store } from '../../store';
import { push } from 'react-router-redux';
import 'antd/dist/antd.css';
import '../../styles.scss';

const mapStateToProps = (state) => {
    return {
        currentUser: state.mainstate.currentUser,
        appLoaded: state.mainstate.appLoaded,
        redirectTo: state.mainstate.redirectTo
    }};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT })
});

class App extends React.Component {

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            store.dispatch( push(nextProps.redirectTo) );
            this.props.onRedirect();
        }
    }

    UNSAFE_componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            userService.setToken(token);
        }

        this.props.onLoad(token ? userService.authorization.current() : null, token);
    }

    render() {
        const { currentUser, appLoaded } = this.props;
        if (appLoaded) {
            return (
                <div className="app">
                    <NavBar
                        currentUser={currentUser} />
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route path="/login" component={Login} />
                        <Route path="/signup" component={Signup} />
                    </Switch>
                </div>
            );
        }
        return (
            <div className="app">
                <NavBar currentUser={currentUser} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
