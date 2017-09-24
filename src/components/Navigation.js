import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import style from './Navigation.module.styl';
import { stripStartAndEnd } from '../lib/pages'

class Navigation extends Component {
    render() {
      return (
        <nav className={style.siteNavigation} id={this.props.id}>
          {this.props.children}

          <ul>
          {this.props.pages.map((page) => (
            <li key={page.filename}>
              <NavLink to={page.filename.replace('./', '/docs/')}>{stripStartAndEnd(page.filename)}</NavLink>
            </li>
          ))}
          </ul>
        </nav>
      );
  }
}

export default Navigation;
