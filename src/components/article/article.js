import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../realworldblog-api/rwbapi';
import './article.css';
import Markdown from 'react-markdown';
import { Button, Spin, Alert } from 'antd';
import { useAuth } from '../../realworldblog-api/auth-contect';

const Article = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiService = new ApiService();

  useEffect(() => {
    apiService
      .getArticle(slug)
      .then((data) => {
        setArticle(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  const handleEditArticle = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDeleteArticle = () => {
    apiService
      .deleteArticle(slug)
      .then(() => {
        navigate('/');
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleFavorites = async () => {
    try {
      if (!user) {
        setError('You must be logged in to favorite articles.');
        return;
      }

      const updatedArticle = article.favorited
        ? await apiService.unfavoriteArticle(slug)
        : await apiService.favoriteArticle(slug);

      setArticle((prev) => ({
        ...prev,
        favorited: updatedArticle.favorited,
        favoritesCount: updatedArticle.favoritesCount,
      }));
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spin tip="Loading articles..." />
      </div>
    );
  }

  if (error) {
    return <Alert message="Error" description={error} type="error" showIcon />;
  }

  const { title, body, description, tags, author, createdAt, favorited, favoritesCount } = article;

  return (
    <div className="article-container">
      <div className="list-element">
        <div className="one-article__left-side-of-the-element">
          <div className="one-article__header">
            <div className="one-article__header-title">
              <h1>{title}</h1>
            </div>
            <div className="one-article__like" style={{ fontWeight: 'bold' }}>
              <div
                onClick={handleFavorites}
                style={{
                  cursor: 'pointer',
                  fontSize: '24px',
                  color: favorited ? 'red' : 'black',
                  transform: favorited ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 0.2s, color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = favorited ? 'scale(1.4)' : 'scale(1.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = favorited ? 'scale(1.3)' : 'scale(1)';
                }}
              >
                {favorited ? '♥' : '♡'}
                {favoritesCount}
              </div>
            </div>
          </div>
          <div className="one-article__tags">
            {tags.map((tag, index) => (
              <span key={index} className="one-article__tags__single-tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="one-article__kurztext">{description}</div>
          <div className="one-acticle__overview">
            <Markdown>{body}</Markdown>
          </div>
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
          {user?.username === author.username && (
            <div className="edit-delete-btns">
              <Button onClick={handleEditArticle} className="edit-article-btn">
                Edit
              </Button>
              <Button type="primary" danger onClick={handleDeleteArticle} className="delete-article-btn">
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
