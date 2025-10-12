import { useEffect, useState } from "react";

export default function RecipeCard({ id }) {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await fetch(`/api/recipes/${id}`);
        if (!response.ok) throw new Error("Failed to fetch recipe");
        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipe();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!recipe) return <div>No recipe found</div>;

  const { title, imageUrl, avgRating, timeInMins, ingredients } = recipe;

  return (
    <div>
      <h2>{title}</h2>
      <img src={imageUrl} alt={title} />
      <p>Rating: {avgRating !== null ? avgRating : "No rating yet"}</p>
      <p>Time: {timeInMins} minutes</p>
      <p>Number of ingredients: {ingredients.length}</p>
    </div>
  );
}
