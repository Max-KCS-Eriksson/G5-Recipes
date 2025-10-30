import { useEffect, useState } from "react";
import { getRecipeById } from "../api/connection";
import { calculateDifficulty } from "../utils/calculateDifficulty";

export default function RecipeInfo({ recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        console.error("Failed to load recipe:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [recipeId]);

  if (loading) return <p>Laddar...</p>;
  if (!recipe) return <p>Inget recept hittades.</p>;

  const difficulty = calculateDifficulty(
    recipe.instructions.timeInMins,
    recipe.ingredients.items.length,
    recipe.ingredients.price,
  );

  return (
    <div className="recipe-info">
      <h2>{recipe.name}</h2>
      <img src={recipe.imageUrl} alt={recipe.name} />
      <p>Tid: {recipe.instructions.timeInMins} mins</p>
      <p>Svårighetsgrad: {difficulty}</p>
      <p>Info: {recipe.description}</p>
      <h3>Ingredienser:</h3>
      <ul>
        {recipe.ingredients.items.map((ingredient) => (
          <li key={ingredient.name}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <h3>Gör så här:</h3>
      <ol>
        {recipe.instructions.steps.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
