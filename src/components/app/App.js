import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../header';
import Article from '../article';
import ListOfArticles from '../list';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ListOfArticles />} />
        <Route path="/article/:slug" element={<Article />} />
      </Routes>
    </Router>
  );
};

export default App;

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
