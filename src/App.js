import logo from './logo.svg';
import './App.css';
import UserComponent from './UserComponent';
import SearchComponent from './SearchComponent';

const App = () => {
  return (
    <div>
      <h1>The Bench</h1>
      <UserComponent />
      <SearchComponent />
    </div>
  );
};

export default App;
