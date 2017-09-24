import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Navigation from './components/Navigation';
import Main from './components/Main';

import 'normalize.css';
import './App.styl';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
    };
  }

  getPages() {
    const context = require.context("./pages", true);
    const pages = context.keys().map(function (filename) {
      const path =  context(filename);
      return { filename, path };
    });

    this.setState({
      pages
    });
  }

  componentDidMount() {
    this.getPages();

    WebFont.load({
      google: {
        families: ['Source Sans Pro', 'Source Code Pro'],
      },
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation id="site-navigation" pages={this.state.pages}>
          <header>
            <h1>WP-Plugin.pro</h1>
            <span className="tagline">
              Make WordPress great again.
            </span>
          </header>
        </Navigation>
        <Main id="main" pages={this.state.pages} />
      </div>
    );
  }
}

export default App;
