import React from 'react';
import userService from '../../services/userService';
import actionCreators from "../../actionCreators";
import ArticleData from './ArticleData';
import ArticleActions from './ArticleActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    ...state.article,
    currentUser: state.mainstate.currentUser
});

const mapDispatchToProps = (dispatch) => ({
    onLoad: (payload) =>
        dispatch(actionCreators.doArticlePageLoaded(payload)),
    onUnload: () =>
        dispatch(actionCreators.doArticlePageUnloaded()),
});

class Article extends React.Component {
    componentDidMount() {
        this.props.onLoad(Promise.all([
            userService.articles.get(this.props.match.params.id),
        ]));
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        const {article, currentUser} = this.props;
        if (!article) return null;

        const canEdit = currentUser && currentUser.username === article.author.username;

        return (
            <div className="container">
                <div className="articlePage">
                    <div className="articlePage__header">
                        <ArticleData article={article} />
                    </div>
                    {canEdit ?
                        <ArticleActions article={article} />
                        : null
                    }
                    <div className="articleContent">
                        <div>{article.body}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
