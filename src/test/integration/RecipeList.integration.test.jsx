import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import RecipeList from "../../components/RecipeList.jsx";

vi.mock("../../api/connection.js", () => ({
  getRecipes: vi.fn(),
}));

import { getRecipes } from "../../api/connection.js";

describe("Integration 6.2.3 - RecipeList - Fallback States", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("visar fallback-text vid tomt resultat", async () => {
    getRecipes.mockResolvedValueOnce([]);
    render(<RecipeList />);
    const emptyMessage = await screen.findByText(/inga recept/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it("visar felmeddelande vid API-fel", async () => {
    getRecipes.mockRejectedValueOnce(new Error("API Error"));
    render(<RecipeList />);
    const errorText = await screen.findByText(/kunde inte ladda/i);
    expect(errorText).toBeInTheDocument();
  });
});
