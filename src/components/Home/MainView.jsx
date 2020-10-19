import React from "react";
import ArticlesList from "../Articles/ArticlesList";
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
    ...state.articlesList,
    token: state.mainstate.token,
});

const MainView = (props) => {
    return (
        <div>
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

export default connect(mapStateToProps)(MainView);
