export const truncateComment = (text) => {
  return text.length > 180 ? text.slice(0, 180 - 1) + "..." : text;
};
