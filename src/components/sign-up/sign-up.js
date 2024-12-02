import React from 'react';
import './sign-up.css';

const CreateAccount = () => {
  return (
    <div className="create-account">
      <h2 className="create-account__title">Create new account</h2>
      <form className="create-account__form-container">
        <div className="create-account__form-container__username">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" />
        </div>
        <div className="create-account__form-container__email">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Email address" />
        </div>
        <div className="create-account__form-container__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <div className="create-account__form-container__repeat-password">
          <label htmlFor="repeat-password">Repeat Password</label>
          <input type="password" id="repeat-password" placeholder="Password" />
        </div>
        <div className="create-account__form-container__checkbox">
          <input type="checkbox" id="agree" />
          <label htmlFor="agree">I agree to the processing of my personal information</label>
        </div>
        <div className="create-account-btn" type="submit">
          <p className="create-account-btn__name">Create</p>
        </div>
        <p className="create-account__footer">
          Already have an account? <a href="/signin">Sign In.</a>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
