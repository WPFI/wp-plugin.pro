import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import style from './Navigation.module.styl';

const NextStage = ({ data }) => {
  const items = Object.keys(data).map((key) => {
    if (data[key] instanceof Function) {
      console.log('Skipping function', key);
    } else if (key !== '_meta') {
      if (data[key]._meta && data[key]._meta.type === 'dir') {
        return <NaviFolder data={data[key]} value={data[key]._meta.name} key={key} />
      } else if (data[key]._meta) {
        return <NaviLink to={data[key].filename} value={data[key]._meta.name} key={key} />
      }
    }

    return null;
  });

  return (
    <ul>
      {items}
    </ul>
  );
};

const NaviFolder = ({ value, data, open = false } = {}) => (
  <li style={{color: open ? 'pink' : 'green'}}>
    {value}
    { data ? <NextStage data={data} /> : false }
  </li>
);

const NaviLink = ({ to, value }) => (
  <li>
    <NavLink to={to}>
      {value}
    </NavLink>
  </li>
);

const Navigation = ({ filetree, id, children }) => (
  <nav className={style.siteNavigation} id={id}>
    {children}

    <ul>
      {Object.keys(filetree).map((key) => {
        const tree = filetree[key];
        // console.log(tree);

        return tree instanceof Function
          ? console.log('not insane') || tree()
          : tree._meta.type === 'dir'
            ? <NaviFolder data={tree} open={tree._meta.open} value={tree._meta.name} key={key} />
            : <NaviLink data={tree} key={key} to={tree.filename} value={tree._meta.name} />
      })}
    </ul>
  </nav>
);

Navigation.propTypes = {
  filetree: PropTypes.instanceOf(Object),
};

Navigation.defaultProps = {
  filetree: {},
};

export default Navigation;
