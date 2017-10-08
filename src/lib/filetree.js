import deepmerge from 'deepmerge';
import { breakIntoParts } from './pages'


let singleton;
class filetree {
  constructor(files) {
    this.generateTree();

    if (files) {
      this.files = files;
    }
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

  generateFlatTree() {
    // credit: @akx

    const files = this.getFiles();
    function dirname(path) {
      return path.substring(0, path.lastIndexOf("/")) || "/";
    }

    function getDirectories(path) {
      const directories = [];
      while (path !== "/") {
        path = dirname(path);
        directories.push(path);
      }
      return directories;
    }
    const dirs = {};

    // Pass 1 -- create directory entries and add files in them
    files.forEach(fent => {
      getDirectories(fent.filename).forEach((dir, i) => {
        const dent = (dirs[dir] = dirs[dir] || { directories: [], files: [] });
        if (i === 0) {
          dent.files.push(fent);
        }
      });
    });

    // Pass 2 -- assign subdirectories into parents
    Object.keys(dirs).forEach(dirName => {
      if (dirName !== "/") {
        dirs[dirname(dirName)].directories.push(dirName);
      }
    });

    // Pass 3 -- remove unwanted dirs
    Object.keys(dirs).forEach(dirName => {
      if (['/', '/docs'].indexOf(dirName) > -1) {
        delete dirs[dirName];
      }
    });

    this.flatTree = dirs;
    return this.flatTree;
  }

  generateTree() {
    const files = this.getFiles();

    const filetree = files.reduce((acc, page) => {
      const parts = breakIntoParts(page.filename).slice(2);
      const tree = parts.reduceRight((prev, cur, i) => {
        if (prev === null) {
          return {
            _memeta: {
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
              open: true,
              name: cur,
            },
            [prev.name || 'children']: prev,
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

  getFlatTree() {
    if (this.flatTree) {
      return this.flatTree;
    }

    return this.generateFlatTree();
  }
}

function Filetree(files) {
  if (!singleton) {
    singleton = new filetree(files);
  }

  return singleton;
}

export default Filetree;
