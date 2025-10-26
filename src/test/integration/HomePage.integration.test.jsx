/**
 * @file HomePage.test.jsx
 * Integration test: testar att HomePage laddar och visar kategori- och receptlistor.
 */

import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../../pages/HomePage.jsx";

// Mocka API-anrop
vi.mock("../../api/connection", () => ({
  getRecipes: vi.fn(),
  getRecipesByCategory: vi.fn(),
  getCategoryHierarchy: vi.fn(),
}));

import {
  getRecipes,
  getRecipesByCategory,
  getCategoryHierarchy,
} from "../../api/connection";

// Mocka RecipeCard och Category-komponenter (förenkla UI)
vi.mock("../../components/RecipeCard.jsx", () => ({
  default: ({ recipe }) => <div data-testid="recipe-card">{recipe.name}</div>,
}));
vi.mock("../../components/Category.jsx", () => ({
  default: ({ name, recipeCount }) => (
    <div data-testid="category-item">
      {name} ({recipeCount})
    </div>
  ),
}));

describe("HomePage integration test", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("visar laddningsmeddelanden och sedan recept + kategorier", async () => {
    // Mockdata
    getCategoryHierarchy.mockResolvedValue([
      { name: "Matpaj" },
      { name: "Dessertpaj" },
    ]);
    getRecipesByCategory.mockImplementation(async (cat) => {
      if (cat === "Matpaj")
        return [
          {
            id: 1,
            name: "Paj med broccoli, kalkonskinka och ost",
            categories: ["Matpaj", "Kött"],
          },
        ];
      if (cat === "Dessertpaj")
        return [
          {
            id: 2,
            name: "Chokladpaj",
            categories: ["Dessertpaj", "No Bake"],
          },
          {
            id: 3,
            name: "Citronpaj",
            categories: ["Dessertpaj", "Klassisk"],
          },
        ];
      return [];
    });
    getRecipes.mockResolvedValue([
      {
        id: 1,
        name: "Paj med broccoli, kalkonskinka och ost",
        categories: ["Matpaj", "Kött"],
      },
      {
        id: 2,
        name: "Chokladpaj",
        categories: ["Dessertpaj", "No Bake"],
      },
      {
        id: 3,
        name: "Citronpaj",
        categories: ["Dessertpaj", "Klassisk"],
      },
    ]);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    // Kontrollera att laddningsindikatorer visas först
    expect(screen.getByText(/Laddar recept/i)).toBeInTheDocument();
    expect(screen.getByText(/Laddar kategorier/i)).toBeInTheDocument();

    // Vänta tills data laddats och UI uppdaterats
    await waitFor(() => {
      expect(screen.getAllByTestId("recipe-card")).toHaveLength(3);
      expect(screen.getAllByTestId("category-item")).toHaveLength(5);
    });

    // Verifiera att rätt data visas
    expect(
      screen.getByText(/Paj med broccoli, kalkonskinka och ost/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/Chokladpaj/i)).toBeInTheDocument();
    expect(screen.getByText(/Citronpaj/i)).toBeInTheDocument();

    expect(screen.getByText(/Matpaj/i)).toBeInTheDocument();
    expect(screen.getByText(/Dessertpaj/i)).toBeInTheDocument();

    expect(screen.getByText(/Kött/i)).toBeInTheDocument();
    expect(screen.getByText(/No Bake/i)).toBeInTheDocument();
    expect(screen.getByText(/Klassisk/i)).toBeInTheDocument();
  });
});
