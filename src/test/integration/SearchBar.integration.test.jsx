import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import SearchBar from "../../components/SearchBar.jsx";

beforeEach(() => {
  vi.stubGlobal("alert", vi.fn());
});

afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("Integration 6.2.5 - SearchBar - XSS-sanering", () => {
  it("visar felmeddelande och blockerar exekvering vid skadlig query", async () => {
    const mockSearch = vi.fn();

    render(
      <SearchBar
        onSearch={mockSearch}
        initialValue="<script>alert(1)</script>"
      />,
    );

    const submitButton = screen.getByRole("button", { name: /sök/i });
    await userEvent.click(submitButton);

    expect(window.alert).not.toHaveBeenCalled();
    expect(
      screen.getByText(/ogiltiga tecken\. vänligen försök igen\./i),
    ).toBeInTheDocument();
    expect(mockSearch).not.toHaveBeenCalled();
  });

  it("tillåter normal text och anropar onSearch", async () => {
    const mockSearch = vi.fn();
    const user = userEvent.setup();

    render(<SearchBar onSearch={mockSearch} initialValue="paj" />);

    const submitButton = screen.getByRole("button", { name: /sök/i });
    await user.click(submitButton);

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(screen.queryByText(/ogiltiga tecken/i)).not.toBeInTheDocument();
  });
});
