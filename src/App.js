import React, { Component } from 'react';
import { 
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import api from './Api';
import Home from './Components/Home';
import NewSerie from './Components/NewSerie';
import Series from './Components/Series';
import EditSerie from './Components/EditSerie';
import {Menu} from './Components/Menu';
import {About} from './Components/About';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      genres: [],
      isLoading: false
    }

  }

  componentDidMount(){
    this.setState({ isLoading: true });
    api.loadGenres().then((res)=>
    {
      this.setState({
        isLoading: false,
        genres: res.data
      });  
    }
    );
  }

  renderGenreLink(genre){
    return(
      <li key={genre}>
        <Link to={`/series/${genre}`}>{genre}</Link>
      </li>
    );
  }

  render(){
    return (
      <Router>
      <div>
	<Menu />
    <Route exact path='/' component={Home} />
    <Route path='/series-edit/:id' component={EditSerie} />
    <Route path='/series/:genre' component={Series} />
    <Route exact path='/new' component={NewSerie} />
    <Route exact path='/about' component={About} />
  </div>
  </Router>
    );
  }
}

export default App;
