import React, { Component } from 'react';

import style from './Navigation.module.styl';

class Navigation extends Component {
  render() {
    return (
      <nav className={style.siteNavigation} {...this.props}>
        <header>
          <h1>WP-Plugin.pro</h1>
          <span className="tagline">
            WordPress plugins and tips from pros
          </span>
        </header>

      </nav>
    );
  }
}

export default Navigation;
