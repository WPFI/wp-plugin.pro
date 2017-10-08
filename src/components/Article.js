import React, { Component, createElement } from 'react';
import ReactDOM from 'react-dom';
import debounce from 'debounce';

import Filetree from '../lib/filetree';
import style from './Article.module.styl';
import shared from '../shared-variables.json';

import marksy from 'marksy/components';
import 'highlight.js/styles/railscasts.css';
import hljs from 'highlight.js/lib/highlight';
import hljsJavascript from 'highlight.js/lib/languages/javascript';
import hljsPhp from 'highlight.js/lib/languages/php';

hljs.registerLanguage('javascript', hljsJavascript);
hljs.registerLanguage('php', hljsPhp);


const compile = marksy({
  createElement,
  components: {
    MyCustomComponent (props) {
      return <h1>{props.children}</h1>
    }
  },
  elements: {
  },
  highlight(lang, code) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, code, true).value;
    } else {
      return hljs.highlightAuto(code).value;
    }
  }
});


class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: <p>Loading, please wait...</p>,
      pages: Filetree().getFiles(),
      codeSize: 12,
    };

    this.debouncedResize = debounce(this.handleResize.bind(this), 16);
    this.zoomBlocks = this.zoomBlocks.bind(this);
  }

  handleResize() {
    this.makeCodeSnippetsBehave();
  }

  zoomBlocks(e) {
    if (this.lastClickedNodeWasPre) {
      if (e.ctrlKey && e.keyCode === 107) { // +
        this.setState(prev => ({
          codeSize: prev.codeSize + 1
        }));
        e.preventDefault();
      } else if (e.ctrlKey && e.keyCode === 109) { // -
        this.setState(prev => ({
          codeSize: prev.codeSize - 1
        }));
        e.preventDefault();
      }
    }
  }

  makeCodeSnippetsBehave() {
    const isXLarge = window.matchMedia(shared.xlarge).matches,
          isLarge = window.matchMedia(shared.large).matches;

    const component = ReactDOM.findDOMNode(this);
    const contentArea = component.querySelector('article');
    const aside = component.querySelector('aside');
    const pres = component.querySelectorAll('pre');

    const reset = () => {
      // Resetting the values and setting them again on the same frame doesn't work.
      return new Promise((resolve) => {
        Array.from(pres).forEach((pre) => {
          const firstChild = pre.firstChild;
          pre.style = {};
          firstChild.style = {};
          aside.style = {};
        });

        requestAnimationFrame(() => {
          aside.style.height = `${contentArea.offsetHeight}px`;
          resolve();
        });
      });
    };

    const position = () => {
      Array.from(pres).forEach((pre) => {
        const firstChild = pre.firstChild;

        const vOffset = 0;
        const hOffset = contentArea.offsetWidth + 1;

        pre.style.maxWidth = `${aside.offsetWidth * 1}px`
        pre.style.transform = `translateX(${hOffset}px) translateY(-${vOffset}px)`;

        firstChild.style.paddingLeft = '1.25rem'; // 20px in default scale
      });
    };

    reset().then(() => {
      if (isXLarge || isLarge) {
        position();
      }
    });
  }

  componentDidMount() {
    const propsFile = this.props.file;
    const urlFile = this.props.match.url;
    const target = (propsFile || urlFile);

    const file = this.state.pages.find((page) => page.filename === target);
    const failure = (msg) => this.setState({ article: msg });

    if (file) {
      fetch(file.path)
        .then((r) => r.text())
        .then((r) => {
          const article = compile(r).tree;

          this.setState({
            article
          });
        }).catch(failure);
    } else {
      failure(<p>File not found</p>);
    }

    window.addEventListener('resize', this.debouncedResize);

    this.lastClickedNodeWasPre = false;
    this.articleEl.addEventListener('click', (e) => {
      const isPre = e.target.closest('pre');

      if (isPre) {
        this.lastClickedNodeWasPre = true;
      } else {
        this.lastClickedNodeWasPre = false;
      }
    });

    window.addEventListener('keydown', this.zoomBlocks);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debouncedResize);
    window.removeEventListener('keydown', this.zoomBlocks);
  }

  componentDidUpdate() {
    this.makeCodeSnippetsBehave();
  }

  render() {
    return (
      <div className={style.Wrapper}>
        <style>{`
          article pre,
          article code {
            font-size: ${this.state.codeSize}px !important;
          }
        `}</style>
        <article className={style.Article} ref={(n) => this.articleEl = n}>
          {this.state.article}
        </article>
        <aside className={style.Sidebar}>
        </aside>
      </div>
    );
  }
}

export default Article;
