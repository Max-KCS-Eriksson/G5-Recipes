import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, afterEach } from "vitest";
import CategoryList from "../../components/CategoryList.jsx";
import * as CategoriesUtils from "../../utils/categories.js";

vi.mock("../../api/connection.js", () => ({
  getRecipes: vi.fn(),
}));

import { getRecipes } from "../../api/connection.js";

describe("Integration 6.2.3 - CategoryList - Fallback & Renderingsstillstånd", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("visar laddningsmeddelande under API-anrop", () => {
    getRecipes.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    expect(screen.getByText(/laddar kategorier/i)).toBeInTheDocument();
  });

  it("visar felmeddelande vid API-fel", async () => {
    getRecipes.mockRejectedValueOnce(new Error("API Error"));

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    const errorText = await screen.findByText(/kunde inte ladda kategorier/i);
    expect(errorText).toBeInTheDocument();
  });

  it("visar fallback-text vid tom kategori-lista", async () => {
    getRecipes.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    const emptyMessage = await screen.findByText(/inga kategorier hittades/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  it("renderar kategori-namn och receptantal vid lyckad hämtning", async () => {
    getRecipes.mockResolvedValueOnce([
      { categories: ["Dessert"] },
      { categories: ["Dessert"] },
      { categories: ["Varmrätt"] },
    ]);

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Dessert")).toBeInTheDocument();
      expect(screen.getByText("(2)")).toBeInTheDocument();
      expect(screen.getByText("Varmrätt")).toBeInTheDocument();
      expect(screen.getByText("(1)")).toBeInTheDocument();
    });
  });

  it("renderar subkategorier och deras antal vid hierarkisk data", async () => {
    getRecipes.mockResolvedValueOnce([
      { categories: ["Dessert", "Paj"] },
      { categories: ["Dessert", "Choklad"] },
      { categories: ["Varmrätt", "Fisk"] },
    ]);

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      // Huvudkategorier
      expect(screen.getByText("Dessert")).toBeInTheDocument();
      expect(screen.getByText("(2)")).toBeInTheDocument();
      expect(screen.getByText("Varmrätt")).toBeInTheDocument();

      // Underkategorier
      expect(screen.getByText("Paj")).toBeInTheDocument();
      expect(screen.getByText("Choklad")).toBeInTheDocument();
      expect(screen.getByText("Fisk")).toBeInTheDocument();

      // Kontrollera så att alla "(1)"-antal visas för underkategorier
      const ones = screen.getAllByText("(1)");
      expect(ones.length).toBeGreaterThanOrEqual(3);
    });
  });

  it("hanterar blandad kategori-struktur (huvud + underkategorier)", async () => {
    getRecipes.mockResolvedValueOnce([
      { categories: ["Dessert"] },
      { categories: ["Dessert", "Paj"] },
      { categories: ["Varmrätt"] },
    ]);

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText("Dessert")).toBeInTheDocument();
      expect(screen.getByText("(2)")).toBeInTheDocument();
      expect(screen.getByText("Paj")).toBeInTheDocument();
      expect(screen.getByText("Varmrätt")).toBeInTheDocument();
    });
  });

  it("använder recipesPerCategory() för att bearbeta API-data", async () => {
    const spy = vi.spyOn(CategoriesUtils, "recipesPerCategory");

    getRecipes.mockResolvedValueOnce([{ categories: ["Dessert"] }]);

    render(
      <MemoryRouter>
        <CategoryList />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(spy).toHaveBeenCalledTimes(1);
    });

    spy.mockRestore();
  });
});
