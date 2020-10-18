import React from 'react';
import MainView from "./MainView";
import { connect } from 'react-redux';
import actionCreators from "../../actionCreators";
import userService from "../../services/userService";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
    ...state.home,
    token: state.mainstate.token,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (articlesFilter, pager, payload) =>
        dispatch(actionCreators.doHomeLoaded(articlesFilter, pager, payload)),
    onUnload: () =>
        dispatch(actionCreators.doHomeUnloaded()),
});

class Home extends React.Component {

    componentDidMount()  {
        //const articlesFilter = this.props.token ? 'userArticles' : 'all';
        const articlesFilter = 'all';
        //const articlesPromise = this.props.token ? userService.articles.userArticles : userService.articles.all;
        const articlesPromise = userService.articles.all;
        this.props.onLoad(
            articlesFilter, articlesPromise, Promise.all([userService.tags.getTags(), articlesPromise()])
        );
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <div className="articlesContainer">
                <MainView />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
