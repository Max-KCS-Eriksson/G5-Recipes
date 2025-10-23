import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecipeList.css";
import { getRecipes, getRecipesByCategory } from "../api/connection";
import RecipeCard from "./RecipeCard";
import { useNavigate } from "react-router-dom";

/**
 * Dynamically list `Recipe`s.
 *
 * @param {string} [category] - Optionally narrow down list by category.
 * @param {string} [nameQuery] - Optionally narrow down list by search term.
 */
export default function RecipeList({ category, nameQuery }) {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRecipes() {
      if (category) setRecipes(await getRecipesByCategory(category));
      else if (nameQuery) setRecipes(await getRecipes(nameQuery));
      else setRecipes(await getRecipes());
    }
    fetchRecipes();
  }, [category, nameQuery]);

  const handleRecipeClick = (recipeId) => {
    navigate(`/recipes/${recipeId}`);
    window.scrollTo(0, 0);
  };

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <div
            onClick={() => handleRecipeClick(recipe.id)}
            style={{ cursor: "pointer" }}
          >
            <RecipeCard recipe={recipe} />
          </div>
        </li>
      ))}
    </ul>
  );
}
