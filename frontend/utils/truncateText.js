export const truncateComment = (text) => {
  return text.length > 280 ? text.slice(0, 280 - 1) + "..." : text;
};
