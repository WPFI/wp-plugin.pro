import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Article from './Article';

import style from './Main.module.styl';

const About = () => (
  <h1>About</h1>
);

class Main extends Component {
  render() {
    return (
      <main className={style.Main} id={this.props.id}>
        <Switch>
          <Route exact path="/" component={(props) => <Article {...props} file="/docs/index.md" />} />
          <Route path="/about" component={About} />

          <Route path="/docs/:folder*/:filename" component={(props) => <Article {...props} />} />
          <Route path="/docs/:folder" component={(props) => <Article {...props} />} />
        </Switch>
      </main>
    );
  }
}

export default Main;
