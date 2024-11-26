import React from 'react';
import './header.css';

const Header = () => {
  return (
    <div className="header">
      <h2 className="name-element">Realworld blog</h2>
      <div className="auth-elements">
        <button style={{ color: 'blue' }}>sign in</button>
        <button style={{ color: 'green', border: '1px solid green' }}>sign up</button>
      </div>
    </div>
  );
};

export default Header;
