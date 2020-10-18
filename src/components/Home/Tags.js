import React from 'react';
import userService from '../../services/userService';

const Tags = props => {
    console.log('Tags: ', props);
    const tags = props.tags;
    if (tags) {
        return (
            <div className="tag-list">
                { tags.map(tag => {
                        const handleClick = e => {
                            e.preventDefault();
                            props.onClickTag((tag, page) =>
                                userService.articles.filterByTag(tag, page),  userService.articles.filterByTag(tag));
                        };

                        return (
                            <a
                                href=""
                                className="tags"
                                key={tag}
                                onClick={handleClick}>
                                {tag}
                            </a>
                        );
                    })
                }
            </div>
        );
    } else {
        return (
            <div>Tags loading...</div>
        );
    }
};

export default Tags;
