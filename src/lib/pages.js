export const stripStartAndEnd = (string) => {
  return string
    .replace('./', '')
    .replace('.md', '');
};

export const convertURLToLocal = (string) => {
  return string.replace('/docs/', './');
}
