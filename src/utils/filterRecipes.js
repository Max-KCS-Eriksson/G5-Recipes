export function filterRecipes(recipes, query) {
  const q = query.trim().toLowerCase();
  return recipes.filter((recipe) => recipe.name.toLowerCase().includes(q));
}
