import React from 'react';
//import ArticlesList from '../Articles/ArticlesList';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    ...state.home,
    token: state.mainstate.token,
});


class Home extends React.Component {
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

export default connect(mapStateToProps)(Home);
