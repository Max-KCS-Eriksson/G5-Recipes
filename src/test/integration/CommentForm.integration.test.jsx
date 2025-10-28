import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CommentForm from "../../components/CommentForm.jsx";
import * as Connection from "../../api/connection.js";

vi.mock("../../api/connection.js", () => ({
  commentRecipeById: vi.fn(),
}));

vi.mock("../../utils/inputPolicies.js", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    compileTextValidator: (policy) => {
      return (text) => ({
        ok: true,
        message: "",
        normalizedText:
          policy === actual.NAME_POLICY
            ? "Anna<script>alert('x')</script>"
            : "Hej<script>alert('x')</script>",
      });
    },
  };
});

describe("Integration - CommentForm - Sanitering av <script> (OWASP A03)", () => {
  const mockOnAdded = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("escapar <script>-inmatning innan API-anrop (neutralisering av XSS)", async () => {
    render(<CommentForm recipeId="123" onCommentAdded={mockOnAdded} />);

    const nameInput = screen.getByLabelText(/namn/i);
    const commentInput = screen.getByRole("textbox", { name: /kommentar/i });
    const submitButton = screen.getByRole("button", {
      name: /skicka kommentar/i,
    });

    fireEvent.change(nameInput, {
      target: { value: "Anna<script>alert('x')</script>" },
    });
    fireEvent.change(commentInput, {
      target: { value: "Hej<script>alert('x')</script>" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(Connection.commentRecipeById).toHaveBeenCalledTimes(1);
    });

    const [recipeId, sentComment, sentName] =
      Connection.commentRecipeById.mock.calls[0];

    expect(recipeId).toBe("123");

    expect(sentName).toContain("Anna");
    expect(sentName).toMatch(/&lt;|&gt;/);
    expect(sentName).not.toContain("<script>");

    expect(sentComment).toContain("Hej");
    expect(sentComment).toMatch(/&lt;|&gt;/);
    expect(sentComment).not.toContain("<script>");
  });
});
