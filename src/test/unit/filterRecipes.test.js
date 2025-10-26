import { describe, it, expect } from "vitest";
import { filterRecipes } from "../../utils/filterRecipes";

describe("filterRecipes", () => {
  const recipes = [
    { name: "Pannkakor" },
    { name: "Chokladtårta" },
    { name: "pasta Carbonara" },
  ];

  it("returnerar alla recept om query är tom", () => {
    const result = filterRecipes(recipes, "");
    expect(result).toHaveLength(3);
  });

  it("filtrerar recept oavsett versaler/gemener", () => {
    const result1 = filterRecipes(recipes, "pasta");
    const result2 = filterRecipes(recipes, "PASTA");
    expect(result1).toEqual(result2);
    expect(result1).toEqual([{ name: "pasta Carbonara" }]);
  });

  it("returnerar tom array om inget matchar", () => {
    const result = filterRecipes(recipes, "pizza");
    expect(result).toEqual([]);
  });
});
