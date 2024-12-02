import React, { useState } from 'react';
import './edit-article.css';

const EditArticle = () => {
  const [tags, setTags] = useState(['new tag']);
  const [newTag, setNewTag] = useState('');

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const deleteTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="edit-article">
      <h2 className="edit-article__title">Edit article</h2>
      <form className="edit-article__form-container">
        <div className="edit-article__form-field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title" />
        </div>
        <div className="edit-article__form-field">
          <label htmlFor="short-description">Short description</label>
          <input type="text" id="short-description" placeholder="Title" />
        </div>
        <div className="edit-article__form-field">
          <label htmlFor="text">Text</label>
          <textarea id="text" placeholder="Text"></textarea>
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
              Add tag
            </button>
          </div>
        </div>
        <button type="submit" className="edit-article__submit-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default EditArticle;
