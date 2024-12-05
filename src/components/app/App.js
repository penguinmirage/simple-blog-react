// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from '../header';
// import Article from '../article';
// import ListOfArticles from '../list';
// import CreateAccount from '../sign-up';
// import SignIn from '../auth/sign-in';
// import EditProfile from '../edit-profile';
// import { AuthProvider } from '../../realworldblog-api/auth-contect';
// import ProtectedRoute from '../protected/protected-route';

// const App = () => {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="app-container">
//           <Header />
//           <Routes>
//             <Route path="/" element={<ListOfArticles />} />
//             <Route path="/article/:slug" element={<Article />} />
//             <Route path="/signup" element={<CreateAccount />} />
//             <Route path="/signin" element={<SignIn />} />
//             <Route
//               path="/profile/edit"
//               element={
//                 <ProtectedRoute>
//                   <EditProfile />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../header';
import ListOfArticles from '../list';
import Article from '../article';
import CreateAccount from '../sign-up';
import SignIn from '../auth/sign-in';
import EditProfile from '../edit-profile';
import CreateArticle from '../create-article';
import EditArticle from '../edit-article'; // Import EditArticle component
import { AuthProvider } from '../../realworldblog-api/auth-contect';
import ProtectedRoute from '../protected/protected-route';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<ListOfArticles />} />
            <Route path="/article/:slug" element={<Article />} />
            <Route path="/signup" element={<CreateAccount />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/profile/edit"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-article"
              element={
                <ProtectedRoute>
                  <CreateArticle />
                </ProtectedRoute>
              }
            />

            <Route
              path="/articles/:slug/edit"
              element={
                <ProtectedRoute>
                  <EditArticle />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from '../header';
// import Article from '../article';
// import ListOfArticles from '../list';

// const App = () => {
//   return (
//     <Router>
//       <div className="app-container">
//         <Header />
//         <Routes>
//           <Route path="/" element={<ListOfArticles />} />
//           <Route path="/article/:slug" element={<Article />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// import './App.css';
// import Header from '../header';
// import ListElement from '../list-element';
// import Article from '../article';
// import SignIn from '../auth';
// import CreateAccount from '../sign-up';
// import EditProfile from '../edit-profile';
// import CreateArticle from '../create-article';
// import EditArticle from '../edit-article';
// import ListOfArticles from '../list';

// function App() {
//   return (
//     <div className="app-container">
//       <Header />
//       {/* <Article />
//       <ListElement />
//       <SignIn />
//       <CreateAccount />
//       <EditProfile />
//       <CreateArticle />
//       <EditArticle /> */}
//       <ListOfArticles />
//     </div>
//   );
// }

// export default App;
