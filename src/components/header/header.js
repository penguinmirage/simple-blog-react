// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../realworldblog-api/auth-contect';
// import './header.css';

// const Header = () => {
//   const { user, logout } = useAuth(); // Access the user and logout function
//   const navigate = useNavigate();

//   const handleSignIn = () => navigate('/signin');
//   const handleSignUp = () => navigate('/signup');
//   const handleEditProfile = () => navigate('/profile/edit');
//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   return (
//     <div className="header">
//       <h2 className="name-element" onClick={() => navigate('/')}>
//         Realworld Blog
//       </h2>
//       <div className="auth-elements">
//         {!user ? (
//           <>
//             <button style={{ color: 'blue' }} onClick={handleSignIn}>
//               Sign In
//             </button>
//             <button style={{ color: 'green', border: '1px solid green' }} onClick={handleSignUp}>
//               Sign Up
//             </button>
//           </>
//         ) : (
//           <>
//             <div className="user-info" onClick={handleEditProfile}>
//               {user.username}
//             </div>
//             <button style={{ color: 'red', border: '1px solid red' }} onClick={handleLogout}>
//               Log Out
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;

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
      <h2 className="name-element" onClick={() => navigate('/')}>
        Realworld Blog
      </h2>
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
          <>
            <Button default style={{ color: 'green' }} onClick={handleCreateArticle}>
              Create New Article
            </Button>
            <div className="user-info" onClick={handleEditProfile}>
              {user.username}
            </div>
            <Button ghost danger style={{ color: 'red', border: '1px solid red' }} onClick={handleLogout}>
              Log Out
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;

// import React from 'react';
// import './header.css';

// const Header = () => {
//   return (
//     <div className="header">
//       <h2 className="name-element">Realworld blog</h2>
//       <div className="auth-elements">
//         <button style={{ color: 'blue' }}>sign in</button>
//         <div className="user-info">logged in user</div>
//         <button style={{ color: 'green', border: '1px solid green' }}>sign up</button>
//       </div>
//     </div>
//   );
// };

// export default Header;
