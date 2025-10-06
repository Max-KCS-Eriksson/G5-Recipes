export default function RecipeCard({ recipe }) {
  return (
    <article className="recipe-card">
      <img src={recipe.imageUrl} alt={recipe.title} />
      <h2>{recipe.title}</h2>
      <p>⏱️ {recipe.timeInMins} min ⭐ {recipe.ratings?.length || 0}</p>
      <p>{recipe.ingredients?.length || 0} ingredienser</p>
    </article>
  );
}
