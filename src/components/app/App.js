import './App.css';
import Header from '../header';
import ListElement from '../list-element';
import Article from '../article';
import SignIn from '../auth';

function App() {
  return (
    <div className="app-container">
      <Header />
      {/* <ListElement />
      <Article /> */}
      <SignIn />
    </div>
  );
}

export default App;
