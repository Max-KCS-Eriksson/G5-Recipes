export function filterRecipes(recipes, query) {
  if (!query) return recipes;
  const lowerQuery = query.toLowerCase();
  return recipes.filter((r) => r.name.toLowerCase().includes(lowerQuery));
}
