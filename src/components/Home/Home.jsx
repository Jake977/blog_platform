import React from 'react';
//import ArticlesList from '../Articles/ArticlesList';
import { connect } from 'react-redux';
import actionCreators from "../../actionCreators";

const mapStateToProps = (state) => ({
    ...state.home,
    token: state.mainstate.token,
});

const mapDispatchToProps = dispatch => ({
    onLoad: (payload) =>
        dispatch(actionCreators.doHomeLoaded()),
    onUnload: () =>
        dispatch(actionCreators.doHomeUnloaded()),
});

class Home extends React.Component {
    componentDidMount() {
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
