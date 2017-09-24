import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import deepmerge from 'deepmerge';

import style from './Navigation.module.styl';
import { stripStartAndEnd, breakIntoParts, isDir, isFile } from '../lib/pages'

class Navigation extends Component {
    constructor(props) {
      super(props);

      this.state = {
        tree: {},
      };

    }

    buildFolderList() {
      const folders = this.props.pages.reduce((a, page) => {
        console.log(page);
        const parts = breakIntoParts(page.filename).slice(1);
        const addDir = (name) => ({ type: 'dir', name });
        const addFile = (name) => ({ type: 'file', name, path: page.path, filename: page.filename });
        const getPrev = (stage) => stage === 0 ? false : parts[stage - 1];


              /* const arr = ['Folder', 'Subfolder', 'file.md'];
              const tree = {
                Folder: {
                  type: 'dir',
                  name: 'Folder', // debugging purposes jne

                  Subfolder: {
                    type: 'dir',
                    name: 'Subfolder',

                    'file.md': {
                      type: 'file',
                      name: 'file.md',
                      fetch: 'http://...'
                    }
                  }
                }
              } */

        const tree = parts.reduce((b, part, stage) => {
          switch (stage) {
            case 0:
              b[part] = isDir(part) ? addDir(part) : addFile(part);
            break;
            case 1:
              b[getPrev(stage)][part] = isDir(part) ? addDir(part) : addFile(part);
            break;
            case 2:
             b[getPrev(stage - 1)][getPrev(stage)][part] = isDir(part) ? addDir(part) : addFile(part);
            break;
          }

          return b;
        }, {});

        console.log(tree);

        return deepmerge(a, tree);
      }, {});

      console.log(folders);
    }

    componentDidUpdate() {
      this.buildFolderList();
    }

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
