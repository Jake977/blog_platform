import React from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import userService from '../../services/userService';
import storageService from "../../services/storageService";
import actionCreators from "../../actionCreators";
import { Route, Switch } from 'react-router-dom';
import Home from '../Home/Home';
import Article from '../Articles/Article';
import Login from '../Users/Login';
import Signup from '../Users/Signup';
import { store } from '../../store';
import { push } from 'react-router-redux';
import 'antd/dist/antd.css';
import '../../styles.scss';
import ArticleEditor from "../Articles/ArticleEditor";

const mapStateToProps = (state) => {
    return {
        currentUser: state.mainstate.currentUser,
        appLoaded: state.mainstate.appLoaded,
        redirectTo: state.mainstate.redirectTo
    }};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch(actionCreators.doAppLoad(payload, token)),
    onRedirect: () =>
        dispatch(actionCreators.doRedirect())
});

class App extends React.Component {

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.redirectTo) {
            store.dispatch( push(prevProps.redirectTo) );
            this.props.onRedirect();
        }
    }

    componentDidMount() {
        const token = storageService.getFromLocalStorage('jwt');
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
                        <Route exact path="/" component={ Home } />
                        <Route path="/login" component={ !currentUser ? Login : Home } />
                        <Route path="/add" component={ !currentUser ? Login : ArticleEditor } />
                        <Route path="/article/:id/edit" component={ !currentUser ? Login : ArticleEditor } />
                        <Route path="/signup" component={ !currentUser ? Signup : Home} />
                        <Route path="/article/:id" component={ !currentUser ? Login : Article } />
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
