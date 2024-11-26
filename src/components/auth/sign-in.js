import React from 'react';
import './sign-in.css';

const SignIn = () => {
  return (
    <div className="sign-in">
      <h2 className="sign-in__title">Sign In</h2>
      <form className="sign-in__form-container">
        <div className="sign-in__form-container__email">
          <label htmlFor="email">Email address</label>
          <input type="email" id="email" placeholder="Email address" />
        </div>
        <div className="sign-in__form-container__password">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <div className="log-in-btn" type="submit">
          Login
        </div>
      </form>
      <p className="sign-in__footer">
        Don’t have an account? <a href="/signup">Sign Up.</a>
      </p>
    </div>
  );
};

export default SignIn;
