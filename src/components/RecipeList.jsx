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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        if (category) setRecipes(await getRecipesByCategory(category));
        else if (nameQuery) setRecipes(await getRecipes(nameQuery));
        else setRecipes(await getRecipes());
      } catch (err) {
        console.error("Fel vid hämtning av recept:", err);
        setError("Kunde inte ladda recept.");
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, [category, nameQuery]);

  if (loading) return <p>Laddar recept...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        {error} <br /> Försök igen senare.
      </p>
    );
  if (!recipes || recipes.length === 0) return <p>Inga recept hittades.</p>;

  return (
    <ul className="recipe-list">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <Link to={`/recipes/${recipe.id}`}>
            <RecipeCard recipe={recipe} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
