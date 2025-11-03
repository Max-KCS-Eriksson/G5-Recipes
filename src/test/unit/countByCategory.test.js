import { describe, it, expect } from "vitest";
import { recipesPerCategory } from "../../utils/categories";
import Recipe from "../../api/dto/Recipe";
import Ingredient from "../../api/dto/Ingredient";

describe("recipesPerCategory", () => {
  it("returns number of recipes per category hierarchically", async () => {
    const ingredients = {
      price: 1,
      items: [new Ingredient("a", null, "")],
    };
    const instructions = {
      timeInMins: 1,
      steps: ["a"],
    };

    const recipes = [
      new Recipe("a", ["foo", "fizz"], "b", "c", ingredients, instructions),
      new Recipe("b", ["foo", "buzz"], "b", "c", ingredients, instructions),
      new Recipe("c", ["bar", "zipp"], "b", "c", ingredients, instructions),
    ];
    const categoriesWithCound = await recipesPerCategory(recipes);
    expect(categoriesWithCound).toStrictEqual({
      foo: {
        count: 2,
        subCategories: { fizz: 1, buzz: 1 },
      },
      bar: { count: 1, subCategories: { zipp: 1 } },
    });
  });
});
