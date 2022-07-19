export const truncateComment = (text) => {
  return text.length > 100 ? text.slice(0, 100 - 1) + "..." : text;
};
