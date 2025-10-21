import { describe, it, expect } from "vitest";
import { formatTimestamp } from "../../utils/datetime.js";

// Helper: Expect output "2025-10-18 09:31" or "2025-10-18 09:31:??" for default setting.
function isSvSeDateLike(s) {
  return /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}/.test(s);
}

describe("formatTimestamp", () => {
  it('returns localized "YYYY-MM-DD HH:mm" for a valid ISO string', () => {
    const iso = "2025-10-18T07:31:00Z";
    const out = formatTimestamp(iso);
    expect(out).toBeTypeOf("string");
    expect(isSvSeDateLike(out)).toBe(true);
  });

  it('returns "" for undefined/null/empty', () => {
    expect(formatTimestamp()).toBe("");
    expect(formatTimestamp(null)).toBe("");
    expect(formatTimestamp("")).toBe("");
  });

  it('returns "" for invalid date strings', () => {
    expect(formatTimestamp("not-a-date")).toBe("");
    expect(formatTimestamp("2025-13-99T99:99:99Z")).toBe("");
  });

  it("respects custom locale/timeZone when provided", () => {
    const iso = "2025-10-18T07:31:00Z";
    const enUs = formatTimestamp(iso, { locale: "en-US", timeZone: "UTC" });
    expect(enUs).toMatch(/10\/18\/2025/);
  });
});
