import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => { return { matches: true } })
});

Object.defineProperty(window, "requestAnimationFrame", {
    value: jest.fn(() => { return { matches: true } })
});

const props = JSON.parse('{"pages":[{"filename":"./Advanced Custom Fields/Options page.md","path":"/static/media/Options page.5baf205a.md"},{"filename":"./Advanced Custom Fields/index.md","path":"/static/media/index.bf912c34.md"},{"filename":"./Advanced Custom Fields/lol.md","path":"/static/media/lol.d41d8cd9.md"},{"filename":"./Advanced Custom Fields/tricks/index.md","path":"/static/media/index.158738bc.md"},{"filename":"./Polylang/index.md","path":"/static/media/index.374d7f5d.md"},{"filename":"./index.md","path":"/static/media/index.d3ea10c2.md"}],"filetree":{"Advanced Custom Fields":{"_meta":{"type":"dir","name":"Advanced Custom Fields"},"Options page.md":{"_meta":{"type":"file","name":"Options page.md"},"path":"/static/media/Options page.5baf205a.md","filename":"/docs/Advanced Custom Fields/Options page.md"},"index.md":{"_meta":{"type":"file","name":"index.md"},"path":"/static/media/index.bf912c34.md","filename":"/docs/Advanced Custom Fields/index.md"},"lol.md":{"_meta":{"type":"file","name":"lol.md"},"path":"/static/media/lol.d41d8cd9.md","filename":"/docs/Advanced Custom Fields/lol.md"},"tricks":{"_meta":{"type":"dir","name":"tricks"},"index.md":{"_meta":{"type":"file","name":"index.md"},"path":"/static/media/index.158738bc.md","filename":"/docs/Advanced Custom Fields/tricks/index.md"}}},"Polylang":{"_meta":{"type":"dir","name":"Polylang"},"index.md":{"_meta":{"type":"file","name":"index.md"},"path":"/static/media/index.374d7f5d.md","filename":"/docs/Polylang/index.md"}},"index.md":{"_meta":{"type":"file","name":"index.md"},"path":"/static/media/index.d3ea10c2.md","filename":"/docs/index.md"}}}');
const { pages, filetree } = props;

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <App pages={pages} filetree={filetree} />
    </BrowserRouter>,
    div
  );
});
