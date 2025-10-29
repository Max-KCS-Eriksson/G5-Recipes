import styles from "./RecipeCard.module.css";
import RecipeRating from "./RecipeRating";

export default function RecipeCard({ recipe }) {
  if (!recipe) return <div>No recipe found</div>;

  const { name, imageUrl, instructions, ingredients } = recipe;
  const { timeInMins } = instructions;

  return (
    <div className="recipe-card" data-testid="recipe-card-test">
      <img
        className={styles.recipeImage}
        src={imageUrl || "/placeholder.jpg"}
        alt={name || "Recipe image"}
      />
      <h2>{name}</h2>
      <p>
        <RecipeRating recipeId={recipe.id} readOnly={true} />
      </p>
      <p>{timeInMins ? `${timeInMins} min` : "Okänd tid"}</p>
      {ingredients?.items?.length ? (
        <p>{ingredients.items.length} ingredienser</p>
      ) : (
        <p>Inga tillsatta ingredienser</p>
      )}
    </div>
  );
}
