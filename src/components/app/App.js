import './App.css';
import Header from '../header';
import ListElement from '../list-element';
import Article from '../article';
import SignIn from '../auth';
import CreateAccount from '../sign-up';
import EditProfile from '../edit-profile';
import CreateArticle from '../create-article';
import EditArticle from '../edit-article';

function App() {
  return (
    <div className="app-container">
      <Header />
      <Article />
      {/* <ListElement />
      <SignIn />
      <CreateAccount />
      <EditProfile />
      <CreateArticle />
      <EditArticle /> */}
    </div>
  );
}

export default App;
