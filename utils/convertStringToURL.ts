/*
    - remove all special characters
    - replace whitespace with -
    - convert all letters to lowercase
 */
export default function (text: string) {
  return text
    .replace(/[^\w\s]/gi, "")
    .replace(/\s/g, "-")
    .toLowerCase();
}
