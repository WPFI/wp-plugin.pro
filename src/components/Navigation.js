import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import deepmerge from 'deepmerge';

import style from './Navigation.module.styl';
import { breakIntoParts } from '../lib/pages'

class Navigation extends Component {
    constructor(props) {
      super(props);

      this.state = {
        tree: {},
        treeGenInProgress: false,
      };

    }

    buildFolderList() {
      this.setState({
        treeGenInProgress: true,
      }, () => {
          const filetree = this.props.pages.reduce((a, page) => {
          const parts = breakIntoParts(page.filename).slice(1);
          const addDir = (name) => ({ type: 'dir', name });
          const addFile = (name) => ({ type: 'file', name, path: page.path, filename: page.filename });

          const tree = parts.reduceRight((prev, cur) => {
            if (prev === null) {
              return addFile(cur);
            } else {
              return { ...addDir(cur), [prev.name]: prev };
            }
          }, null);

            // console.log(tree);
          // a[parts[0]] = tree;
          return deepmerge(a, { [parts[0]]: tree });
        }, {});

        // console.log(filetree);

        this.setState({
          tree: filetree,
          treeGenInProgress: false,
        });
      })
    }

    componentWillReceiveProps(newProps) {
      if (this.props !== newProps) {
        this.buildFolderList();
      }
    }

    render() {
      const naviLink = (item) => {
        return item.filename
          ? <NavLink to={item.filename.replace('./', '/docs/')}>{item.name}</NavLink>
          : item.name
      }
      const nextStage = (tree) => {
        const keys = Object.keys(tree);

        if (keys.length < 3) {
          return false;
        }

        return (
          <ul>
            {keys.map((key) => {
              if (key === 'name' || key === 'type') {
                return false;
              } else {
                const t = tree[key];
                return (
                  <li key={Math.random()}>
                    {naviLink(t)}
                    {typeof t !== 'string' ? nextStage(t) : ''}
                  </li>
                );
              }
            })}
          </ul>
        );
      };

      return (
        <nav className={style.siteNavigation} id={this.props.id}>
          {this.props.children}

          <ul>
            {Object.keys(this.state.tree).map((key) => {
              const tree = this.state.tree[key];
              return <li key={key}>
                {naviLink(tree)}
                {nextStage(tree)}
              </li>
            })}
          </ul>

        </nav>
      );
  }
}

export default Navigation;
