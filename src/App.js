import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Filetree from './lib/filetree'
import Navigation from './components/Navigation';
import Main from './components/Main';

import 'normalize.css';
import './App.styl';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pages: [],
      filetree: {},
    };
  }

  getPages() {
    const { pages, filetree } = this.props;
    if (pages && filetree) {
      this.setState({
        pages,
        filetree,
      });
    } else {
      const tree = Filetree();

      window.tree = tree;

      this.setState({
        pages: tree.getFiles(),
        filetree: tree.getTree(),
      });
    }
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
        <Navigation id="site-navigation" filetree={this.state.filetree}>
          <header>
            <h1>WP-Plugin.pro</h1>
            <span className="tagline">
              Make WordPress great again.
            </span>
          </header>
        </Navigation>
        <Main id="main" pages={this.state.pages} filetree={this.state.filetree}/>
      </div>
    );
  }
}

export default App;
