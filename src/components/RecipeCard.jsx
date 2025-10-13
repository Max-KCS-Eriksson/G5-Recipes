export default function RecipeCard({ recipe }) {
  if (!recipe) return <div>No recipe found</div>;

  const { name, imageUrl, avgRating, timeInMins, ingredients } = recipe;

  return (
    <div>
      <h2>{name}</h2>
      <img src={imageUrl || "/placeholder.jpg"} alt={name || "Recipe image"} />
      <p>Rating: {avgRating ?? "No rating yet"}</p>
      <p>Time: {timeInMins ? `${timeInMins} minutes` : "Unknown time"}</p>
      <p>Number of ingredients: {ingredients?.length ?? 0}</p>
    </div>
  );
}
