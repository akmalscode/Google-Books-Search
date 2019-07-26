import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './App.css';


class Books extends React.Component{

  render(){
    return<div>Books</div>
  }

}
class SavedBooks extends React.Component{

  render(){
    return<div>SavedBooks</div>
  }

}



function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Books</Link>
          </li>
          <li>
            <Link to="/saved-books">Saved Books</Link>
          </li>
        </ul>

      </nav>

      
   </Router>
  );
}

export default App;
