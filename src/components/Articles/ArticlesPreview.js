import React from 'react';
import { format } from 'date-fns'

const ArticlePreview = (props) => {
    const article = props.article;
    console.log('article1:', article);
    return (
        <div className="article-preview">
            <div className="article-data">
                <div className="info">
                    <span className="author">{ article.author.username }</span>
                    <span className="date">{ new Date(article.createdAt).toDateString() }</span>
                </div>
            </div>

            <div className="preview-link">
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <span>Read more...</span>
            </div>
        </div>
    );
}

export default ArticlePreview;
