import deepmerge from 'deepmerge';
import { breakIntoParts } from './pages'

let singleton;
class filetree {
  constructor() {
    this.generateTree();
  }

  requireContext() {
    const context = require.context("../pages", true);
    const files = context.keys().map(function (filename) {
      const path =  context(filename);
      return { filename: filename.replace('./', '/docs/'), path };
    });

    this.files = files;
    return this.files;
  }

  generateTree() {
    const files = this.requireContext();
    const filetree = files.reduce((acc, page) => {
      const parts = breakIntoParts(page.filename).slice(2);
      const tree = parts.reduceRight((prev, cur, i) => {
        if (prev === null) {
          return {
            _meta: {
              type: 'file',
              name: cur,
            },
            path: page.path,
            filename: page.filename,
          };
        } else {
          return {
            _meta: {
              type: 'dir',
              open: false,
              name: cur,
            },
            [prev._meta.name || 'children']: prev
          };
        }
      }, null);

      return deepmerge(acc, { [parts[0]]: tree });
    }, {});

    this.tree = filetree;
    return this.tree;
  }

  getFiles() {
    if (this.files) {
      return this.files;
    }

    return this.requireContext();
  }

  getTree() {
    if (this.tree) {
      return this.tree;
    }

    return this.generateTree();
  }
}

function Filetree() {
  if (!singleton) {
    singleton = new filetree();
  }

  return singleton;
}

export default Filetree;
