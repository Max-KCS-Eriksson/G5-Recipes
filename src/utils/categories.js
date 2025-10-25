export async function recipesPerCategory(recipes) {
  const result = {};

  recipes.forEach((recipe) => {
    const [mainCategory, ...subs] = recipe.categories;

    if (!result[mainCategory]) {
      result[mainCategory] = { count: 0, subCategories: {} };
    }
    result[mainCategory].count += 1;

    subs.forEach((sub) => {
      if (!result[mainCategory].subCategories[sub]) {
        result[mainCategory].subCategories[sub] = 0;
      }
      result[mainCategory].subCategories[sub] += 1;
    });
  });

  return result;
}
