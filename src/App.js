import React, { Component } from 'react';
import WebFont from 'webfontloader';

import Filetree from './lib/filetree'
import Navigation from './components/Navigation';
import Main from './components/Main';

import 'normalize.css';
import './App.styl';

class App extends Component {
  static defaultProps = {
    navigation: true,
  }

  constructor(props) {
    super(props);

    this.state = {
      pages: [],
    };
  }

  componentDidMount() {
    WebFont.load({
      google: {
        families: ['Source Sans Pro', 'Source Code Pro'],
      },
    });
  }

  render() {
    const tree = Filetree();
    return (
      <div className="App">
        { this.props.navigation
          ? <Navigation id="site-navigation">
              <header>
                <h1>WP-Plugin.pro</h1>
                <span className="tagline">
                  Make WordPress great again.
                </span>
              </header>
          </Navigation>
          : false
        }
        <Main id="main" pages={tree.getFiles()} />
      </div>
    );
  }
}

export default App;
