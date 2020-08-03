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

const mapStateToProps = (state) => {
    return {
        //appLoaded: state.common.appLoaded,
        //appName: state.common.appName,
        currentUser: state.mainstate.currentUser,
        //redirectTo: state.common.redirectTo
    }};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
        dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT })
});

class App extends React.Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            // this.context.router.replace(nextProps.redirectTo);
            store.dispatch(push(nextProps.redirectTo));
            this.props.onRedirect();
        }
    }

    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            userService.setToken(token);
        }

        this.props.onLoad(token ? userService.Authorization.current() : null, token);
    }

    render() {
        const { currentUser, appName, appLoaded } = this.props;
        if (appLoaded) {
            return (
                <div>
                    <NavBar
                        appName={appName}
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
            <div>
                <NavBar
                    appName={appName}
                    currentUser={currentUser} />
            </div>
        );
    }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);


//<Route exact path="/" component={Home}/>

// const App = () => {
//     return (
//         <div className="app-container">
//             <NavBar currentUser={this.props.currentUser} />
//             <div className="form-container">
//                 <Switch>
//                     <Route path="/login" component={Login} />
//                     <Route path="/signup" component={Signup} />
//                     <Redirect from="*" to="/" />
//                 </Switch>
//             </div>
//         </div>
//     );
// };
//export default App;
