export const stripStartAndEnd = (string) => {
  return string
    .replace('./', '')
    .replace('.md', '');
};

export const convertURLToLocal = (string) => {
  return string.replace('/docs/', './');
}

export const breakIntoParts = (string) => {
  return string.split('/');
};

export const isDir = (string) => {
  return !string.match(/\.[0-9a-z]+$/i);
};

export const isFile = (string) => {
  const isMd = string.toLowerCase().endsWith('.md');

  return isMd;
};
