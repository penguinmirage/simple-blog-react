import React from 'react';
import { useNavigate } from 'react-router-dom';
import './list-element.css';

const ListElement = ({ title, description, tags, author, createdAt, favoritesCount, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${slug}`);
  };

  const validTags = tags.filter((tag) => tag && tag.trim().length > 0);

  return (
    <div className="one-article list-element" onClick={handleClick}>
      <div className="one-article__left-side-of-the-element">
        <div className="one-article__header">
          <div className="one-article__header-title">
            <p>{title}</p>
          </div>
          <div className="one-article__like">♥{favoritesCount}</div>
        </div>
        <div className="one-article__tags">
          {validTags.length > 0 &&
            validTags.map((tag, index) => (
              <span key={index} className="one-article__tags__single-tag">
                {tag}
              </span>
            ))}
        </div>
        <div className="one-article__kurztext">{description}</div>
      </div>
      <div className="one-article__right-side-of-the-element">
        <div className="one-article__author-info">
          <div className="one-article__author-info-left-side">
            <div className="one-article__author-info__username">{author.username}</div>
            <div className="one-article__author-info__post-date">{new Date(createdAt).toLocaleDateString()}</div>
          </div>
          <div className="one-article__author-info-right-side">
            <div className="one-article__author-info__avatar">
              <img src={author.image || 'placeholder-avatar.png'} alt={author.username} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListElement;
