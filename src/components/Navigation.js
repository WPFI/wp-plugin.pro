import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import style from './Navigation.module.styl';

class Navigation extends Component {
    render() {
      console.log(this.props);
      return (
        <nav className={style.siteNavigation} id={this.props.id}>
          {this.props.children}

          <ul>
          {this.props.pages.map((page) => (
            <li>
              <NavLink to={page.filename.replace('./', '/docs/')}>{page.filename}</NavLink>
            </li>
          ))}
          </ul>

        </nav>
      );
  }
}

export default Navigation;
