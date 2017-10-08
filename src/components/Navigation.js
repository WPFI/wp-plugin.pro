import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Filetree from '../lib/filetree';

import './Navigation.styl';

let toggler = () => console.log('Will be used to toggle folders.');
const isRootDir = (dirname) => dirname.substr(6).indexOf('/') > -1 ? false : true;
const basename = (str) => str.split('/').slice(-1)[0];
const Kinder = ({ data, tree }) => data.directories.length > 0 || data.files.length > 0 ? (
  <ul className="Children">
    {
      data.directories.map((dir) => {
        return <Folder key={dir} tree={tree} name={dir} open={tree[dir].open} />
      })
    }

    {
      data.files.map((file) => {
        return <File key={file.path} name={file.filename} fetch={file.path} />
      })
    }
  </ul>
) : false;

const Folder = (props) => {
  const { tree, name, open = false } = props;
  const maybeOpenIndex = (e, open) => {
    if (open) {
      e.persist();
      requestAnimationFrame(() => {
        const links = Array.from(e.target.parentNode.querySelectorAll('a'));
        const cond = (link) => link.textContent.toLowerCase() === 'index.md' && link.href !== window.location.href;
        if (links && links.some(cond)) {
          const link = links.find(cond);
          link.click();
          link.focus();
        }
      }, 50); // might be too fast
    }
  };
  return (
    <li className={`Folder ${open ? 'active' : 'inactive'}`} onClick={maybeOpenIndex}>
      <button onClick={(e) => toggler(name) && maybeOpenIndex(e, open)}>{basename(name)}</button>
      { open && tree[name] ? <Kinder data={tree[name]} tree={tree} /> : false }
    </li>
  );
};

const File = ({ name, fetch }) => (
  <li className={`File`}>
    <NavLink to={name}>
      {basename(name)}
    </NavLink>
  </li>
);

class Navigation extends Component {
  static propTypes = {
    id: PropTypes.string,
  }

  constructor(props) {
    super(props);

    const tree = Filetree().getFlatTree();
    this.state = {
      tree: Object.keys(tree).reduce((acc, dirname) => {
        const dir = tree[dirname];
        if (isRootDir(dirname)) {
          dir.open = true;
        } else {
          dir.open = decodeURIComponent(window.location.pathname).includes(dirname)
            ? true
            : false;
        }

        acc[dirname] = dir;
        return acc;
      }, {})
    };

    toggler = (dirname) => {
      this.setState((prev) => {
        const open = prev.tree[dirname].open;
        const newDir = {
          ...prev.tree[dirname],
          open: !open,
        };

        return {
          tree: {
            ...prev.tree,
            ...{ [dirname]: newDir },
          }
        };
      });
    };
  }

  render() {
    const { children, id } = this.props;
    const root = Object.keys(this.state.tree).filter(isRootDir);

    return (
    <nav className={`siteNavigation`} id={id}>
      {children}

      <ul className='external-menu'>
        <li className='External'>
          <a href='https://github.com/k1sul1/wp-plugin.pro/new/master/src/pages' target='_blank' rel='noopener noreferrer'>
            Create a new page
          </a>
        </li>
      </ul>

      <ul className='menu'>
        {
          root.map((dirname) => {
            return (
              <Folder key={dirname} open={this.state.tree[dirname].open} tree={this.state.tree} name={dirname} />
            );
          })
        }
      </ul>
    </nav>
    );
  }
}

export default Navigation;
