import React from "react";
import ArticlesList from "../Articles/ArticlesList";
import userService from '../../services/userService';
import actionCreators from "../../actionCreators";
import {connect} from 'react-redux';

const YourFeedTab = (props) => {
    const { token, tab } = this.props;
    if (token) {
        const clickHandler = (e) => {
            e.preventDefault();
            props.onTabClick(
                'userArticles', userService.articles.userArticles, userService.articles.userArticles()
            );
        };

        return (
            <li className="nav-item">
                <a  href="#"
                    className={ tab === 'userArticles' ? 'nav-link active' : 'nav-link' }
                    onClick={clickHandler}>
                    Your Articles
                </a>
            </li>
        );
    }
    return null;
};

const AllArticlesLink = (props) => {
    const clickHandler = (e) => {
        e.preventDefault();
        props.onTabClick('all', userService.articles.all, userService.articles.all());
    };
    return (
        <li className="nav-item">
            <a
                href=""
                onClick={clickHandler}>
                All articles
            </a>
        </li>
    );
};

const ByTagLink = props => {
    if (!props.tag) {
        return null;
    }

    return (
        <li className="nav-item">
            <a href="" className="nav-link active">
                <i className="ion-pound"></i> {props.tag}
            </a>
        </li>
    );
};

const mapStateToProps = (state) => ({
    ...state.articlesList,
    tags: state.tags,
    token: state.mainstate.token,
});

const mapDispatchToProps = (dispatch) => ({
    onTabClick: (tab, pager, payload) => dispatch(actionCreators.doChangeArticlesList(tab, pager, payload))
});

const MainView = (props) => {
    console.log('MainView props:', props);
    return (
        <div className="">
            <div className="feed-toggle">
                <AllArticlesLink tab={props.tab} onTabClick={props.onTabClick} />
            </div>
            <ArticlesList
                loading={props.loading}
                articles={props.articles}
                pager={props.pager}
                articlesCount={props.articlesCount}
                currentPage={props.currentPage}
            />
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);

