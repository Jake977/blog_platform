import React from 'react';
import {Avatar, Button} from "antd";
import {HeartTwoTone} from '@ant-design/icons';
import userPic from '../../img/userDefaultImage.png';
import userService from "../../services/userService";
import {formatDistance} from "date-fns";
import { connect } from 'react-redux';
import actionCreators from "../../actionCreators";

const mapDispatchToProps = dispatch => ({
    favorite: (slug) =>
        dispatch(actionCreators.doArticleLike(userService.articles.favorite(slug))),
    unfavorite: (slug) =>
        dispatch(actionCreators.doArticleUnlike(userService.articles.unfavorite(slug))),
    });

const ArticleData = (props) => {
    const article = props.article;
    const authorImage = article.author.image;

    const handleLikeClick = (e) => {
        e.preventDefault();
        if (article.favorited) {
            props.unfavorite(article.slug);
        } else {
            props.favorite(article.slug);
        }
    };

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
                    <div className="articlePreview__like">
                        <Button  onClick={handleLikeClick}>
                            <HeartTwoTone twoToneColor={article.favorited ? "red" : "gray"} /> {article.favoritesCount}
                        </Button>
                    </div>
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

export default connect(() => ({}), mapDispatchToProps)(ArticleData);
