import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import Homepage from './containers/Homepage';
import Results from './containers/Results';
import Post from './containers/Post';

const App = () => (
  <Router>
    <div className="app">
      <Header />
      <Route exact path="/" component={Homepage} />
      <Route exact path="/items" component={Results} />
      <Route path="/items/:id" component={Post} />
    </div>
  </Router>
);

export default App;
