import React from 'react';
import userService from "../../services/userService";
import actionCreators from "../../actionCreators";
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => ({
    onSetPage: (page, payload) =>
        dispatch(actionCreators.doSetPage(page, payload))
});

const ArticlesPagination = (props) => {
    if (props.articlesCount <= 10) {
        return null;
    }

    const range = [];
    for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
        range.push(i);
    }

    const setPage = (page) => {
        if(props.pager) {
            props.onSetPage(page, props.pager(page));
        }else {
            props.onSetPage(page, userService.articles.all(page))
        }
    };

    return (
        <nav>
            <ul className="pagination">
                {
                    range.map(v => {
                        const isCurrent = v === props.currentPage;
                        const onClick = (e) => {
                            e.preventDefault();
                            setPage(v);
                        };
                        return (
                            <li
                                className={ isCurrent ? 'pagination-item active' : 'pagination-item' }
                                onClick={onClick}
                                key={v.toString()}>
                                <a className="pagination-link" href="">{v + 1}</a>
                            </li>
                        );
                    })
                }

            </ul>
        </nav>
    );
};

export default connect(() => ({}), mapDispatchToProps)(ArticlesPagination);
