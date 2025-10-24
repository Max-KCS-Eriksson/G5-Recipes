import { describe, it, expect } from "vitest";
import { formateDateFromISO } from "../../utils/formatDate.js";

// Helper: Expect output "2025-10-18" for default setting.
function isSvSeDateOnly(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(s);
}

describe("formateDateFromISO", () => {
  it('returns localized "YYYY-MM-DD" for a valid ISO string', () => {
    const iso = "2025-10-18T07:31:00Z";
    const out = formateDateFromISO(iso);
    expect(out).toBeTypeOf("string");
    expect(isSvSeDateOnly(out)).toBe(true);
  });

  it('returns "" for undefined/null/empty', () => {
    expect(formateDateFromISO()).toBe("");
    expect(formateDateFromISO(null)).toBe("");
    expect(formateDateFromISO("")).toBe("");
  });

  it('returns "" for invalid date strings', () => {
    expect(formateDateFromISO("not-a-date")).toBe("");
    expect(formateDateFromISO("2025-13-99T99:99:99Z")).toBe("");
  });

  it("respects custom locale/timeZone when provided", () => {
    const iso = "2025-10-18T07:31:00Z";
    const enUs = formateDateFromISO(iso, { locale: "en-US", timeZone: "UTC" });
    expect(enUs).toMatch(/10\/18\/2025/);
  });
});
