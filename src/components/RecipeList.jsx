import { useEffect, useState } from "react";
import { useNavigate, useInRouterContext } from "react-router-dom";
import styles from "./RecipeList.module.css";
import { getRecipes, getRecipesByCategory } from "../api/connection";
import RecipeCard from "./RecipeCard";
import { filterRecipes } from "../utils/filterRecipes";

function useSafeNavigate() {
  try {
    return useNavigate();
  } catch {
    return null;
  }
}

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

  const inRouter = useInRouterContext();
  const navigate = useSafeNavigate();

  const handleRecipeClick = (recipeId) => {
    if (inRouter && navigate) {
      navigate(`/recipes/${recipeId}`);
      window.scrollTo(0, 0);
    } else {
      console.warn("Ingen router tillgänglig – navigering hoppades över.");
    }
  };

  async function fetchRecipes() {
    try {
      let data;

      if (category) {
        data = await getRecipesByCategory(category);
      } else if (nameQuery) {
        data = await getRecipes();
        data = filterRecipes(data, nameQuery);
      } else {
        data = await getRecipes();
      }

      let sortedData = data.sort((a, b) => b.avgRating - a.avgRating);

      setRecipes(sortedData);
      setError(null);
    } catch (err) {
      console.error("Fel vid hämtning av recept:", err);
      setError("Kunde inte ladda recept.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, nameQuery]);

  if (loading) return <p>Laddar recept...</p>;
  if (error)
    return (
      <div>
        <p>{error}</p>
        <button
          onClick={() => {
            setLoading(true);
            fetchRecipes();
          }}
        >
          Försök igen
        </button>
      </div>
    );
  if (!recipes || recipes.length === 0) return <p>Inga recept hittades.</p>;

  return (
    <ul className={styles.recipeList} aria-label="Receptlista">
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <button
            onClick={() => handleRecipeClick(recipe.id)}
            style={{ cursor: "pointer" }}
          >
            <RecipeCard recipe={recipe} />
          </button>
        </li>
      ))}
    </ul>
  );
}
