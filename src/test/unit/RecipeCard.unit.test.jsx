import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import RecipeCard from "../../components/RecipeCard.jsx";

vi.mock("../../components/RecipeRating.jsx", () => ({
  default: () => <span data-testid="rating-mock"></span>,
}));

describe("Unit 6.1.5 - RecipeCard - Säkerställ Korrekt Rendering", () => {
  const baseRecipe = {
    name: "Paj",
    imageUrl: "test.jpg",
    instructions: { timeInMins: 30, steps: ["Baka", "Servera"] },
    ingredients: { items: [{ name: "Mjöl" }, { name: "Smör" }], price: 50 },
  };

  it("renderar namn, bild, rating, ingredienser och tid", () => {
    render(<RecipeCard recipe={baseRecipe} />);

    expect(screen.getByText("Paj")).toBeInTheDocument();

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "test.jpg");
    expect(img).toHaveAttribute("alt", "Paj");

    expect(screen.getByTestId("rating-mock")).toBeInTheDocument();
    expect(screen.getByText(/2 ingredienser/i)).toBeInTheDocument();
    expect(screen.getByText(/30 min/i)).toBeInTheDocument();
  });

  it("visar 'okänd tid' om tid saknas", () => {
    const recipe = { ...baseRecipe, instructions: {} };
    render(<RecipeCard recipe={recipe} />);
    expect(screen.getByText(/okänd tid/i)).toBeInTheDocument();
  });

  it("visar 'Inga tillsatta ingredienser' om tom", () => {
    const recipe = { ...baseRecipe, ingredients: { items: [] } };
    render(<RecipeCard recipe={recipe} />);
    expect(
      screen.getByText(/Inga tillsatta ingredienser/i),
    ).toBeInTheDocument();
  });
});
