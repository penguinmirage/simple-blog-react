import React, { useState } from 'react';
import { useAuth } from '../../realworldblog-api/auth-contect'; // For token
import './create-article.css';

const CreateArticle = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState(['new tag']);
  const [newTag, setNewTag] = useState('');
  const { user } = useAuth();

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !body) {
      alert('All fields are required!');
      return;
    }

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

      const data = await response.json();
      console.log('Article created:', data);
      alert('Article created successfully!');
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  return (
    <div className="create-article">
      <h2 className="create-article__title">Create New Article</h2>
      <form className="create-article__form-container" onSubmit={handleSubmit}>
        <div className="create-article__form-field">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="create-article__form-field">
          <label htmlFor="description">Short Description</label>
          <input
            type="text"
            id="description"
            placeholder="Short description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="create-article__form-field">
          <label htmlFor="body">Text</label>
          <textarea
            id="body"
            placeholder="Text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
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
