import React from 'react';
import { Link } from 'react-router-dom';
import ArticleData from './ArticleData';

const ArticlePreview = (props) => {
    const article = props.article;
    return (
        <div className="articlePreview">
            <Link to={`/article/${article.slug}`}>
                <ArticleData article={article} />
                <div className="articlePreview__text">{article.description}</div>
            </Link>
        </div>
    );
};

export default ArticlePreview;
