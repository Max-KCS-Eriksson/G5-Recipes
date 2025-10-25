export function sanitizeInput(text) {
  return text
    .replace(/&/g, "&amp;") // replace & first to avoid double-escaping
    .replace(/</g, "&lt;") // replace <
    .replace(/>/g, "&gt;") // replace >
    .replace(/"/g, "&quot;") // optional, replace "
    .replace(/'/g, "&#39;"); // optional, replace '
}
