import React from 'react';
import ArticlesPreview from './ArticlesPreview';

const ArticlesList = (props) => {
    if (!props.articles) {
        return (
            <div className="article-preview">Loading...</div>
        );
    }

    if (props.articles.length === 0) {
        return (
            <div className="article-preview">
                Have no articles.
            </div>
        );
    }

    return (
        <div>
            { props.articles.map(article => {
                    return (
                        <ArticlesPreview key={article.slug} article={article}  />
                    );
                })
            }
        </div>
    );
};

export default ArticlesList;

