import { useEffect, useState } from "react";
import { getRecipes, getRecipesByCategory } from "../api/connection";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ category }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      if (category) setRecipes(await getRecipesByCategory(category));
      else setRecipes(await getRecipes());
    }
    fetchRecipes();
  }, [category]);

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <Link to={`recipes/${recipe.id}`}>
            <RecipeCard id={recipe.id} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
