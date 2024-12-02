import React from 'react';
import './edit-profile.css';

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <h2 className="edit-profile__title">Edit Profile</h2>
      <form className="edit-profile__form-container">
        <div className="edit-profile__form-container__username">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" defaultValue="John Doe" placeholder="Username" />
        </div>
        <div className="edit-profile__form-container__email">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" defaultValue="john@example.com" placeholder="Email address" />
        </div>
        <div className="edit-profile__form-container__password">
          <label htmlFor="password">New password</label>
          <input type="password" id="password" placeholder="New password" />
        </div>
        <div className="edit-profile__form-container__avatar">
          <label htmlFor="avatar">Avatar image (url)</label>
          <input type="text" id="avatar" placeholder="Avatar image" />
        </div>
        <div className="edit-profile-btn" type="submit">
          <p className="edit-profile-btn__name">Save</p>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
