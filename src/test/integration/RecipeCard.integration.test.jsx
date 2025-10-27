import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import RecipeCard from "../../components/RecipeCard.jsx";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  const mockNavigate = vi.fn();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Integration 6.2.4 - RecipeCard - Felrendering utan event-trigger", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renderar komponenten stabilt när recipe.name är tomt", () => {
    const recipe = {
      name: "",
      imageUrl: "test.jpg",
      ingredients: { items: [], price: 0 },
      instructions: { timeInMins: 10, steps: [] },
    };

    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText("Recipe image");
    expect(image).toBeInTheDocument();
    expect(screen.queryByText(/undefined/i)).not.toBeInTheDocument();
  });

  it("triggar inte navigation eller event vid klick på kortet", async () => {
    const recipe = {
      name: "",
      imageUrl: "test.jpg",
      ingredients: { items: [], price: 0 },
      instructions: { timeInMins: 10, steps: [] },
    };

    const mockNavigate = vi.fn();
    vi.doMock("react-router-dom", async (importOriginal) => {
      const actual = await importOriginal();
      return { ...actual, useNavigate: () => mockNavigate };
    });

    render(
      <MemoryRouter>
        <RecipeCard recipe={recipe} />
      </MemoryRouter>,
    );

    const image = screen.getByAltText("Recipe image");
    await userEvent.click(image);
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
