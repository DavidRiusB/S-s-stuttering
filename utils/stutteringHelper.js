export function addStuttering(text) {
  return text
    .split(" ")
    .map((word) => (Math.random() > 0.5 ? `${word[0]}-${word}` : word))
    .join(" ");
}
