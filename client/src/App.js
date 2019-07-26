import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './App.css';


class Books extends React.Component{

  state={
    results:[],
    query:""
  };


  handleQuery=(event)=>{
    this.setState({query:event.target.value})
  }

  search=(event)=>{
    event.preventDefault();
  }
  render(){
    return(
    <div>Books
        <form onSubmit={this.search}>
          <input type="text" value={this.state.query} onChange={this.handleQuery}/>
          
          
        </form>
    </div>
    
      
      )
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
    <Route path="/" exact component={Books}/>
     <Route path="/saved-books" component={SavedBooks}  />


   </Router>
  );
}

export default App;
