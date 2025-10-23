import "./RecipeCard.css";
import RecipeRating from "./RecipeRating";

export default function RecipeCard({ recipe }) {
  if (!recipe) return <div>No recipe found</div>;

  const { name, imageUrl, instructions, ingredients } = recipe;
  const { timeInMins } = instructions;

  return (
    <div className="recipe-card">
      <img
        className="recipe-image"
        src={imageUrl || "/placeholder.jpg"}
        alt={name || "Recipe image"}
      />
      <h2>{name}</h2>
      <p>
        <RecipeRating recipe={recipe} readOnly={true} />
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
