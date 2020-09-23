import React from 'react';
import ArticlesList from '../Articles/ArticlesList';
import { connect } from 'react-redux';
import { HOME_PAGE_LOADED, HOME_PAGE_UNLOADED } from '../../actionTypes';

const mapStateToProps = (state) => ({
    ...state.home,
    token: state.mainstate.token,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
        dispatch({ type: HOME_PAGE_LOADED }),
    onUnload: () =>
        dispatch({ type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
    UNSAFE_componentWillMount() {
        this.props.onLoad();
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <div className="articlesContainer">
                ArticlesList
                {/*<ArticlesList*/}
                {/*    articles={props.articles}*/}
                {/*    articlesCounter={props.articlesCounter}*/}
                {/*/>*/}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
