import React from 'react';
import ArticlesList from '../Articles/ArticlesList';
import MainView from "./MainView";
import Tags from './Tags';
import { connect } from 'react-redux';
import actionCreators from "../../actionCreators";
import userService from "../../services/userService";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
    ...state.home,
    token: state.mainstate.token,
});

const mapDispatchToProps = dispatch => ({
    onClickTag: (tag, pager, payload) =>
        dispatch(actionCreators.doFilterByTag(tag, pager, payload)),
    onLoad: (tab, pager, payload) =>
        dispatch(actionCreators.doHomeLoaded(tab, pager, payload)),
    onUnload: () =>
        dispatch(actionCreators.doHomeUnloaded()),
});

class Home extends React.Component {
    componentDidMount()  {
        const tab = this.props.token ? 'userArticles' : 'all';
        const articlesPromise = this.props.token ? userService.articles.userArticles : userService.articles.all;
        this.props.onLoad(tab, articlesPromise, Promise.all([userService.tags.getTags(), articlesPromise()]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const {tab, tags, onClickTag} = this.props;
        return (
            <div className="articlesContainer">
                <MainView  tab={tab} />
                <div className="">
                    <div className="sidebar">
                        <p>Tags</p>
                        <Tags tags={tags} onClickTag={onClickTag} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
