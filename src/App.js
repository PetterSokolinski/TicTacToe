import React, { Component } from 'react';
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuContainer from './Containers/MenuContainer/index.js'
import AuthorContainer from './Containers/AuthorContainer'
import AboutContainer from './Containers/AboutContainer';
import Container from './Containers/Container';
import GamingContainer from './Containers/GamingContainer';
class App extends Component {
  render() {
    return (
      <Router>
        <Route render={({ location }) => (
      <main>
        <MenuContainer location={location} />
        <Route exact path="/" component={Container} />
        <Route path="/about" component={AboutContainer} />
        <Route path="/author" component={AuthorContainer} />
        <Route path="/game" component={GamingContainer} />
      </main>
          )}
          />
    </Router>
  )
  }
}


export default App;
