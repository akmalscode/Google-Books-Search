import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import './App.css';
import axios from 'axios';


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
    axios.get("https://www.googleapis.com/books/v1/volumes?q=${this.state.query}").then(
      response=>{
        console.log(response.data.items);
        this.setState({results:response.data.items})


      }
    )
  }

  saveBook=book=>{
    axios.post("/api/books",{
      title:book.volumeInfo.title,
      link:book.volumeInfo.previewLink
    });
  }

  render(){
    return(
    <div>Books
        <form onSubmit={this.search}>
          <input type="text" value={this.state.query} onChange={this.handleQuery}/>
          <button type="submit">Search</button>
          
        </form>
        <hr/>
        {this.state.results.map(result=>{
          return(
            <>
            <div key={result.id}> 
            <h2>{result.volumeInfo.title}</h2>
            </div>
          <button onClick={()=>this.saveBook(result)}>Save</button>
          </>
          );
        })}
    </div>
    
      
      )
  }

}
class SavedBooks extends React.Component{
  state = {
    books: []
  }

  componentDidMount() {
    axios.get("/books").then(response => {
      this.setState({ books: response.data })
    })
  }

  render(){
    return(<div>
      SavedBooks
      <hr />
      {this.state.books.map(book => {
        return <div>{book.title}<hr /></div>

      })}
    </div>)
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
