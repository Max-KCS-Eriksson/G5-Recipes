import { useEffect, useState } from "react";
import { getCategories, getRecipesByCategory } from "../api/connection";
import CategoryList from "../components/CategoryList";

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [categoryRecipeCount, setCategoryRecipeCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoriesAndCounts() {
      try {
        const categoryList = await getCategories();
        setCategories(categoryList);

        const results = await Promise.all(
          categoryList.map(async (category) => {
            const recipes = await getRecipesByCategory(category);
            return { [category]: recipes.length };
          }),
        );

        const recipeCountMap = results.reduce(
          (acc, curr) => ({ ...acc, ...curr }),
          {},
        );

        setCategoryRecipeCount(recipeCountMap);
      } catch (err) {
        console.error("Fel vid hämtning av kategorier:", err);
        setError("Kunde inte ladda kategorier.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategoriesAndCounts();
  }, []);

  if (loading) return <p>Laddar kategorier...</p>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        {error} <br /> Försök igen senare.
      </p>
    );

  return (
    <section className="content">
      <CategoryList
        categories={categories}
        categoryRecipeCount={categoryRecipeCount}
      />
    </section>
  );
}

export default CategoryPage;
