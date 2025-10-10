import { getRecipes, getRecipesByCategory } from "../api/connection";

export default function RecipeList({ category }) {
  let recipes;
  if (category) {
    recipes = getRecipesByCategory(category);
  } else {
    recipes = getRecipes;
  }

  return;
}
