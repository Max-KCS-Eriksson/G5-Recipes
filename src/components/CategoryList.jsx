import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryHierarchy, getRecipesByCategory } from "../api/connection";
import Category from "./Category.jsx";
import "./CategoryList.css";

/**
 * CategoryList Component
 *
 * @component
 * Renderar en lista av kategorier och deras antal recept.
 * Används på HomePage (variant="link") och återanvänder Category-komponenten.
 *
 * @returns {JSX.Element} Renderad kategorilista eller fallback-meddelande.
 */
function CategoryList() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [categoryRecipeCount, setCategoryRecipeCount] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategoriesAndCounts() {
      try {
        const categoryHierarchy = await getCategoryHierarchy();
        const mainCategoryList = Object.keys(categoryHierarchy);
        const categoryList = mainCategoryList;
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

  if (!categories || categories.length === 0) {
    return (
      <aside className="category-list">
        <h3>Kategorier</h3>
        <p>Inga kategorier hittades.</p>
      </aside>
    );
  }

  return (
    <aside className="category-list">
      <h3>Kategorier</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Category
              name={category}
              recipeCount={categoryRecipeCount?.[category] ?? 0}
              variant="link"
              onClick={() => navigate(`/categories/${category}`)}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryList;
