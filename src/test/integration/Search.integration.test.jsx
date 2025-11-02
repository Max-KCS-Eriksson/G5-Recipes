import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../api/connection.js", async () => {
  const actual = await vi.importActual("../../api/connection.js");
  return {
    ...actual,
    getRecipes: vi.fn(),
    getRecipeById: vi.fn().mockResolvedValue({
      id: "68f8998a8a8cd7bla6eafe8a",
      name: "Kyckling",
      rating: "4.5",
    }),
  };
});

vi.mock("../../components/RecipeRating.jsx", () => ({
  default: () => null,
}));

import { getRecipes } from "../../api/connection.js";
import HomePage from "../../pages/HomePage.jsx";

describe("HomePage — search filters recipe list and reset shows all", () => {
  const ALL = [
    {
      id: "68f8998a8a8cd70776eafe8a",
      name: "Kyckling",
      instructions: { timeInMins: 30 },
    },
    {
      id: "68f8998a8a8cd70776eafe8b",
      name: "Blåbär",
      instructions: { timeInMins: 15 },
    },
    {
      id: "68f8998a8a8cd70776eafe8c",
      name: "Köttfärs",
      instructions: { timeInMins: 45 },
    },
  ];

  beforeEach(() => {
    getRecipes.mockImplementation(async (q) => {
      if (!q) return ALL;
      const s = String(q).toLowerCase();
      return ALL.filter((r) => r.name.toLowerCase().includes(s));
    });
  });

  afterEach(() => vi.clearAllMocks());

  it("shrinks list on search and shows all again after empty submit", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomePage />
      </MemoryRouter>,
    );

    const recipeList = await screen.findByRole("list", {
      name: /receptlista/i,
    });
    expect(within(recipeList).getAllByRole("listitem")).toHaveLength(3);

    const input = screen.getByRole("searchbox");
    const submit = await screen.findByRole("button", { name: /sök recept/i });

    await user.clear(input);
    await user.type(input, "kyc");
    await user.click(submit);

    const filteredList = await screen.findByRole("list", {
      name: /receptlista/i,
    });
    expect(within(filteredList).getAllByRole("listitem")).toHaveLength(1);

    await user.clear(input);
    await user.click(submit);

    const resetList = await screen.findByRole("list", { name: /receptlista/i });
    expect(within(resetList).getAllByRole("listitem")).toHaveLength(3);
  });
});
