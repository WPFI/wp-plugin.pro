import React, { Component, createElement } from 'react';

import style from './Article.module.styl';

import marksy from 'marksy/components';

const compile = marksy({
  createElement,
  components: {
    MyCustomComponent (props) {
      return <h1>{props.children}</h1>
    }
  }
});

class Article extends Component {
  constructor(props) {
    super(props);

    this.state = {
      article: 'Loading, please wait...',
    };
  }

  getRequestedFilename() {
    return this.props.match.url.replace('/docs/', './');
  }

  componentDidMount() {
    const file = this.props.pages.find((page) => page.filename === this.getRequestedFilename());
    if (file) {
      fetch(file.path)
        .then((r) => r.text())
        .then((r) => {
          const article = compile(r).tree;
          console.log(file.filename, article);

          this.setState({
            article
          });
        });
    }
    console.log(file, this.getRequestedFilename());
  }

  componentDidUpdate() {

  }

  render() {
    console.log(this.props);
    return (
      <div>
        <article className={style.Article}>
          {this.state.article}
        </article>
        <aside className={style.Sidebar}>
          Code samples
        </aside>
      </div>
    );
  }
}

export default Article;
