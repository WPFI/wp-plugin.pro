import React, { Component } from 'react';

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
    this.setState({
      pages: ['Test', 'Test 2'],
    });

    this.getPages();


   /* pages.map((page) => {
      fetch(page.path)
        .then((r) => r.text())
        .then((r) => {
          console.log(page.filename, r);
        });
    }); */

    // console.log(require('./pages/*'));

    // recursiveReadDir('../pages', (err, files) => {
      // if (err) console.error(err);

      // console.log(files);
    // });
  }

  render() {
    return (
      <div className="App">
        <Navigation id="site-navigation" pages={this.state.pages}>
          <header>
            <h1>WP-Plugin.pro</h1>
            <span className="tagline">
              WordPress plugins and tips from pros
            </span>
          </header>
        </Navigation>
        <Main id="main" pages={this.state.pages} />
      </div>
    );
  }
}

export default App;
