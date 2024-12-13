import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../realworldblog-api/auth-contect';
import { Button } from 'antd';
import './header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => navigate('/signin');
  const handleSignUp = () => navigate('/signup');
  const handleEditProfile = () => navigate('/profile/edit');
  const handleCreateArticle = () => {
    if (!user) {
      navigate('singin');
      return;
    }
    navigate('/create-article');
  };
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="header">
      <span className="name-element" onClick={() => navigate('/')}>
        Realworld Blog
      </span>
      <div className="auth-elements">
        {!user ? (
          <>
            <Button ghost style={{ color: 'blue' }} onClick={handleSignIn}>
              Sign In
            </Button>
            <Button ghost style={{ color: 'green', border: '1px solid green' }} onClick={handleSignUp}>
              Sign Up
            </Button>
          </>
        ) : (
          <div style={{ display: 'flex', alignContent: 'center', gap: '9px', height: '25px' }}>
            <Button default style={{ color: 'green' }} onClick={handleCreateArticle}>
              Create New Article
            </Button>
            <div className="user-info" onClick={handleEditProfile} style={{ marginTop: 'auto', marginBottom: 'auto' }}>
              {user.username}{' '}
              <img
                src={user.image || 'placeholder-avatar.png'}
                alt={user.username}
                style={{ height: '25px', width: '25px', borderRadius: '20px' }}
              />
            </div>
            <Button ghost danger style={{ color: 'red', border: '1px solid red' }} onClick={handleLogout}>
              Log Out
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
