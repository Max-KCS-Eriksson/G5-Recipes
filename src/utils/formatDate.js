/**
 * Format an ISO-8601 timestamp into a localized string (absolute time).
 * Guards: invalid or missing input → return "". Invalid dates also return "".
 *
 * @param {string} isoString - ISO timestamp from API (e.g. "2025-10-18T07:31:00Z").
 * @param {{ locale?: string, timeZone?: string }} [options] - Defaults to "sv-SE" & "Europe/Stockholm".
 * @returns {string} Localized "YYYY-MM-DD HH:mm", or "" if input is invalid
 */
export function formateDateFromISO(
  isoString,
  { locale = "sv-SE", timeZone = "Europe/Stockholm" } = {},
) {
  if (!isoString) return "";
  const parsedDate = new Date(isoString);

  if (Number.isNaN(parsedDate.getTime())) return "";

  return parsedDate.toLocaleString(locale, {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
