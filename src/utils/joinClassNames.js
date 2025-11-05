// Builds a className string from strings, arrays, or {class: boolean} objects.
// Falsy values (false, null, undefined, "") are ignored.
export function joinClassNames(...args) {
  const parts = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string") {
      parts.push(arg);
    } else if (Array.isArray(arg)) {
      parts.push(...arg.filter(Boolean));
    } else if (typeof arg === "object") {
      addKeys(arg, parts);
    }
  }

  return parts.join(" ");
}

function addKeys(obj, arr) {
  for (const [key, val] of Object.entries(obj)) {
    if (val) arr.push(key);
  }
}
