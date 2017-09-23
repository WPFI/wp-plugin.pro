import React, { Component } from 'react';

import style from './Main.module.styl';

class Main extends Component {
  render() {
    return (
      <main className={style.Main} {...this.props}>
        Something here
      </main>
    );
  }
}

export default Main;
