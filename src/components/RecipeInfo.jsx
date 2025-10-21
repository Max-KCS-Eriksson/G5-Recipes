import { useEffect, useState } from "react";
import { getRecipeById } from "../api/connection";
import { calculateDifficulty } from "../utils/calculateDifficulty";

export default function RecipeInfo({ recipeId }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const difficulty = calculateDifficulty(
    recipe.instructions.timeInMins,
    recipe.ingredients.items.length,
    recipe.ingredients.price,
  );

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

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>No recipe found.</p>;

  return (
    <div className="recipe-info">
      <h2>{recipe.name}</h2>
      <img src={recipe.imageUrl} alt={recipe.name} />
      <p>Tid: {recipe.instructions.timeInMins} mins</p>
      <p>Pris: {recipe.ingredients.price} kr</p>
      <p>Svårighetsgrad: {difficulty}</p>
      <h3>Ingredienser:</h3>
      <ul>
        {recipe.ingredients.items.map((ingredient, index) => (
          <li key={index}>
            {ingredient.amount} {ingredient.unit} {ingredient.name}
          </li>
        ))}
      </ul>
      <h3>Gör så här:</h3>
      <ol>
        {recipe.instructions.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
