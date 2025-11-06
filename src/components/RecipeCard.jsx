import styles from "./RecipeCard.module.css";
import RecipeRating from "./RecipeRating";

export default function RecipeCard({ recipe, priority = false }) {
  if (!recipe) return <div>No recipe found</div>;

  const { name, imageUrl, instructions, ingredients } = recipe;
  const { timeInMins } = instructions;

  return (
    <div className={styles.recipeCard} data-testid="recipe-card-test">
      <img
        className={styles.recipeImage}
        src={imageUrl || "/placeholder.jpg"}
        alt={name || "Recipe image"}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "low"}
      />
      <h2>{name}</h2>
      <div className={styles.recipeRating}>
        <RecipeRating recipeId={recipe.id} readOnly={true} />
      </div>
      <p>{timeInMins ? `${timeInMins} min` : "Okänd tid"}</p>
      {ingredients?.items?.length ? (
        <p>{ingredients.items.length} ingredienser</p>
      ) : (
        <p>Inga tillsatta ingredienser</p>
      )}
    </div>
  );
}
