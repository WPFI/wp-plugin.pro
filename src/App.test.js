import React from 'react';
import ReactDOM from 'react-dom';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';

Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => { return { matches: true } })
});

Object.defineProperty(window, "requestAnimationFrame", {
    value: jest.fn(() => { return { matches: true } })
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Main pages={[{filename: "./Advanced Custom Fields/Options page.md", path: "/static/media/Options page.5baf205a.md"}]} />
    </BrowserRouter>,
    div
  );
});
