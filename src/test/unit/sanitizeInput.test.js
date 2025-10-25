import { describe, it, expect } from "vitest";
import { sanitizeInput } from "../../utils/sanitizeInput";

describe("sanitizeInput", () => {
  it("should escape HTML tags", () => {
    const input = '<script>alert("XSS")</script>';
    const output = sanitizeInput(input);

    expect(output).toBe("&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;");
  });

  it("should handle normal text without changes", () => {
    const input = "Hello, world!";
    const output = sanitizeInput(input);
    expect(output).toBe("Hello, world!");
  });

  it("should escape multiple HTML tags", () => {
    const input = "<b>Bold</b> and <i>Italic</i>";
    const output = sanitizeInput(input);
    expect(output).toBe(
      "&lt;b&gt;Bold&lt;/b&gt; and &lt;i&gt;Italic&lt;/i&gt;",
    );
  });
});
