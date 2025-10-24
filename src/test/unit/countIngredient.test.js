import { describe, it, expect } from "vitest";
import Recipe from "../../api/dto/Recipe";
import Ingredient from "../../api/dto/Ingredient";
import { countIngredients } from "../../utils/countIngredients";

describe("countIngredient", () => {
  it("returns the number of ingredients per recipe", () => {
    const ingredients = {
      price: 1,
      items: [
        new Ingredient("foo", null, null),
        new Ingredient("bar", null, null),
      ],
    };
    const recipe = new Recipe("a", ["a", "b"], "b", "c", ingredients, {
      timeInMins: 1,
      steps: ["a"],
    });

    expect(countIngredients(recipe)).toBe(2);
  });
});
