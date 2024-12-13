import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../../realworldblog-api/rwbapi';
import { message } from 'antd';
import './edit-article.css';

const EditArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const apiService = new ApiService();

  useEffect(() => {
    apiService
      .getArticle(slug)
      .then((data) => {
        setValue('title', data.title);
        setValue('description', data.description);
        setValue('body', data.body);
        setTags(data.tags || []);
      })
      .catch((err) => setError(err.message));
  }, [slug, setValue]);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    try {
      await apiService.updateArticle(slug, {
        title: data.title,
        description: data.description,
        body: data.body,
        tags,
      });
      message.success('Article saved!');
      navigate(`/`);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="edit-article">
      <h2 className="edit-article__title">Edit Article</h2>
      {error && <div className="error-message">{error}</div>}
      <form className="edit-article__form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-article__form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            {...register('title', {
              required: 'Title is required',
              minLength: { value: 1, message: 'Title must have at least 1 character' },
            })}
            style={{
              borderColor: errors.title ? 'red' : '',
            }}
          />
          {errors.title && (
            <p className="error-text" style={{ color: 'red' }}>
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="edit-article__form-field">
          <label htmlFor="short-description">Short Description</label>
          <input
            type="text"
            id="short-description"
            placeholder="Short description"
            {...register('description', {
              required: 'Short description is required',
              minLength: { value: 1, message: 'Short description must have at least 1 character' },
            })}
            style={{
              borderColor: errors.description ? 'red' : '',
            }}
          />
          {errors.description && (
            <p className="error-text" style={{ color: 'red' }}>
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="edit-article__form-field">
          <label htmlFor="text">Text</label>
          <textarea
            id="text"
            placeholder="Text"
            {...register('body', {
              required: 'Text is required',
              minLength: { value: 1, message: 'Text must have at least 1 character' },
            })}
            style={{
              borderColor: errors.body ? 'red' : '',
            }}
          ></textarea>
          {errors.body && (
            <p className="error-text" style={{ color: 'red' }}>
              {errors.body.message}
            </p>
          )}
        </div>
        <div className="edit-article__tags-section">
          <label>Tags</label>
          <div className="edit-article__tags-list">
            {tags.map((tag, index) => (
              <div key={index} className="edit-article__tag-wrapper">
                <div className="edit-article__tag">{tag}</div>
                <button type="button" className="delete-tag-btn" onClick={() => deleteTag(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="edit-article__add-tag">
            <input type="text" placeholder="Tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
            <button type="button" className="add-tag-btn" onClick={addTag}>
              Add Tag
            </button>
          </div>
        </div>
        <button type="submit" className="edit-article__submit-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
