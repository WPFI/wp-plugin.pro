import React, { Component } from 'react';

import Navigation from './components/Navigation';
import Main from './components/Main';

import 'normalize.css';
import './App.styl';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation id="site-navigation" />
        <Main id="main" />
      </div>
    );
  }
}

export default App;
