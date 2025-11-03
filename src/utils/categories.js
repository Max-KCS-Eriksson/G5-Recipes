export async function recipesPerCategory(recipes) {
  const result = {};

  for (const recipe of recipes) {
    const [mainCategory, ...subs] = recipe.categories;

    if (!result[mainCategory]) {
      result[mainCategory] = { count: 0, subCategories: {} };
    }
    result[mainCategory].count += 1;

    for (const sub of subs) {
      if (!result[mainCategory].subCategories[sub]) {
        result[mainCategory].subCategories[sub] = 0;
      }
      result[mainCategory].subCategories[sub] += 1;
    }
  }

  return result;
}
