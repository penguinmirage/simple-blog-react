import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { useAuth } from '../../realworldblog-api/auth-contect';
import { useNavigate } from 'react-router-dom';
import './create-article.css';

const CreateArticle = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState(['new tag']);
  const [newTag, setNewTag] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    const { title, description, body } = data;

    const token = localStorage.getItem('token');
    const article = {
      article: {
        title,
        description,
        body,
        tagList: tags,
      },
    };

    try {
      const response = await fetch('https://blog-platform.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(article),
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      const result = await response.json();
      console.log('Article created:', result);
      message.success('Article created successfully!');
      reset();
      setTags(['new tag']);
      navigate('/');
    } catch (error) {
      console.error('Error creating article:', error);
      message.error('Error creating article');
    }
  };

  return (
    <div className="create-article">
      <h2 className="create-article__title">Create New Article</h2>
      <form className="create-article__form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="create-article__form-field">
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
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}
        </div>
        <div className="create-article__form-field">
          <label htmlFor="description">Short Description</label>
          <input
            type="text"
            id="description"
            placeholder="Short description"
            {...register('description', {
              required: 'Description is required',
              minLength: { value: 1, message: 'Description must have at least 1 character' },
            })}
            style={{
              borderColor: errors.description ? 'red' : '',
            }}
          />
          {errors.description && <p style={{ color: 'red' }}>{errors.description.message}</p>}
        </div>
        <div className="create-article__form-field">
          <label htmlFor="body">Text</label>
          <textarea
            id="body"
            placeholder="Text"
            {...register('body', {
              required: 'Text is required',
              minLength: { value: 1, message: 'Text must have at least 1 character' },
            })}
            style={{
              borderColor: errors.body ? 'red' : '',
            }}
          ></textarea>
          {errors.body && <p style={{ color: 'red' }}>{errors.body.message}</p>}
        </div>
        <div className="create-article__tags-section">
          <label>Tags</label>
          <div className="create-article__tags-list">
            {tags.map((tag, index) => (
              <div key={index} className="create-article__tag-wrapper">
                <div className="create-article__tag">{tag}</div>
                <button type="button" className="delete-tag-btn" onClick={() => deleteTag(index)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
          <div className="create-article__add-tag">
            <input type="text" placeholder="Tag" value={newTag} onChange={(e) => setNewTag(e.target.value)} />
            <button type="button" className="add-tag-btn" onClick={addTag}>
              Add Tag
            </button>
          </div>
        </div>
        <button type="submit" className="create-article__submit-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default CreateArticle;
