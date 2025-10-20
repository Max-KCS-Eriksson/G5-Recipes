/**
 * @param {string} recipe - Instance of (to be) rated `Recipe`.
 * @param {boolean} readOnly - Get average rating, or place a new rating. Default = `true`.
 */
function RecipeRating({ recipe, readOnly = true }) {
  const { avgRating } = recipe;

  if (readOnly) return <>{avgRating}</>;
}

export default RecipeRating;
