export default function RecipeCard({ recipe }) {
  if (!recipe) return <div>No recipe found</div>;

  const { name, imageUrl, avgRating, timeInMins, ingredients } = recipe;

  return (
    <div className="recipe-card">
      <h2>{name}</h2>
      <img
        className="recipe-image"
        src={imageUrl || "/placeholder.jpg"}
        alt={name || "Recipe image"}
      />
      <p>Rating: {avgRating ?? "No rating yet"}</p>
      <p>Time: {timeInMins ? `${timeInMins} minutes` : "Unknown time"}</p>
      <h3 className="ingredients-title">Ingredients:</h3>
      {ingredients?.items?.length ? (
        <ul className="ingredients-list">
          {ingredients.items.map((ingredients, i) => (
            <li key={i}>
              {ingredients.amount} {ingredients.unit} {ingredients.name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No ingredients added</p>
      )}
    </div>
  );
}
