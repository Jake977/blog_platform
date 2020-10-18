import React from 'react';
import ArticlesPreview from './ArticlesPreview';
import ArticlesPagination from "./ArticlesPagination";

const ArticlesList = (props) => {
    const articles = props.articles;
    const {pager, articlesCount, currentPage} = props;
    if (!articles) {
        return (
            <div className="articlePreview">Loading...</div>
        );
    }

    if (articles.length === 0) {
        return (
            <div className="articlePreview">
                Have no articles
            </div>
        );
    }

    return (
        <div>
            { articles.map(article => {
                    return (
                        <ArticlesPreview key={article.slug} article={article}  />
                    );
                })
            }
            <ArticlesPagination
                pager={pager}
                articlesCount={articlesCount}
                currentPage={currentPage}
            />
        </div>
    );
};

export default ArticlesList;

