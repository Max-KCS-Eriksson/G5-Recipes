// Builds a className string from strings, arrays, or {class: boolean} objects.
// Falsy values (false, null, undefined, "") are ignored.
export function joinClassNames(...args) {
  const parts = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === "string") {
      parts.push(arg);
      continue;
    }

    if (Array.isArray(arg)) {
      parts.push(...arg.filter(Boolean));
      continue;
    }

    if (typeof arg === "object") {
      for (const [key, val] of Object.entries(arg)) {
        if (val) parts.push(key);
      }
      continue;
    }
  }

  return parts.join(" ");
}
