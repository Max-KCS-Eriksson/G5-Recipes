import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeList.css";
import { getRecipes, getRecipesByCategory } from "../api/connection";
import RecipeCard from "./RecipeCard";

/**
 * Dynamically list `Recipe`s.
 *
 * @param {string} [category] - Optionally narrow down list by category.
 * @param {string} [nameQuery] - Optionally narrow down list by search term.
 */
export default function RecipeList({ category, nameQuery }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      if (category) setRecipes(await getRecipesByCategory(category));
      else setRecipes(await getRecipes());

      if (nameQuery) setRecipes(await getRecipes(nameQuery));
    }
    fetchRecipes();
  }, [category, nameQuery]);

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <Link to={`recipes/${recipe.id}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
