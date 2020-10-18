import React from 'react';
import { Avatar } from "antd";
import userPic from '../../img/userDefaultImage.png';
import {formatDistance} from "date-fns";

const ArticleData = (props) => {
    const article = props.article;
    const authorImage = article.author.image;

    const articleTags = (tagList) => {
        const tags = tagList.map((tag) =>
            <li className="articlePreview__tag" key={tag}>{tag}</li>
        );
        return (
            <ul className="articlePreview__tagsList">
                {tags}
            </ul>
        )
    };

    return (
        <div className="articlePreview__info">
            <div className="articlePreview__info-left">
                <div className="articlePreview__titleBlock">
                    <div className="articlePreview__title">{article.title}</div>
                    <div className="articlePreview__like">** 12</div>
                </div>
                <div className="articlePreview__date">
                    <span>created: {formatDistance(new Date(article.createdAt), new Date())} ago</span>
                </div>
                {article.tagList ? articleTags(article.tagList) : null}
            </div>
            <div className="articlePreview__info-right">
                <div className="articlePreview__author">
                    <div className="articlePreview__author-name">
                        {article.author.username}
                    </div>
                    <Avatar src={authorImage || userPic} size={46} alt={article.author.username} />
                </div>
            </div>
        </div>
    )
};

export default ArticleData;
