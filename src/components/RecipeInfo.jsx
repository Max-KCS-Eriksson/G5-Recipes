import { useEffect, useState } from "react";
import { getRecipeById } from "../api/connection";
import { calculateDifficulty } from "../utils/calculateDifficulty";
import RecipeRating from "./RecipeRating";
import styles from "./RecipeInfo.module.css";

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
    <div className={styles.recipeInfo}>
      <div className={styles.recipeHeader}>
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className={styles.recipeImage}
        />
        <div className={styles.recipeInfo}>
          <h2 className={styles.recipeTitle}>{recipe.name}</h2>
          <p className={styles.recipeRating}>
            <RecipeRating recipeId={recipe.id} readOnly={true} />
          </p>
          <div className={styles.recipeMeta}>
            <p className={styles.recipeTime}>
              {recipe.instructions.timeInMins} min
            </p>
            {recipe.ingredients?.items?.length && (
              <p className={styles.recipeIngredientsCount}>
                {recipe.ingredients.items.length} ingredienser
              </p>
            )}
            <p className={styles.recipeDifficulty}>
              Svårighetsgrad: {difficulty}
            </p>
          </div>

          <p className={styles.recipeDescription}>{recipe.description}</p>
        </div>
      </div>

      <div className={styles.recipeDetails}>
        <div className={styles.recipeColumns}>
          <div className={styles.ingredients}>
            <h3>Ingredienser</h3>
            <ul>
              {recipe.ingredients.items.map((ingredient) => (
                <li key={ingredient.name}>
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.instructions}>
            <h3>Gör så här:</h3>
            <ol>
              {recipe.instructions.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
