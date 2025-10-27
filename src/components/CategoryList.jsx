import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRecipes } from "../api/connection";
import Category from "./Category.jsx";
import "./CategoryList.css";
import { recipesPerCategory } from "../utils/categories.js";

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

  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    async function fetchCategoriesAndCounts() {
      try {
        setLoading(true);
        setError(null);
        setEmpty(false);

        const recipes = await getRecipes();
        const categoryData = await recipesPerCategory(recipes);

        if (!categoryData || Object.keys(categoryData).length === 0) {
          setEmpty(true);
          return;
        }

        setCategories(Object.keys(categoryData));
        setCategoryRecipeCount(categoryData);
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

  if (empty || !categories || categories.length === 0) {
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
        {categories.map((category) => {
          const categoryData = categoryRecipeCount[category];
          const subCategories = categoryData?.subCategories ?? {};

          return (
            <li key={category}>
              {/* Main category */}
              <Category
                name={category}
                recipeCount={categoryData?.count ?? 0}
                variant="link"
                onClick={() => navigate(`/categories/${category}`)}
              />

              {/* Subcategories */}
              {Object.keys(subCategories).length > 0 && (
                <ul className="subcategory-list">
                  {Object.entries(subCategories).map(
                    ([subCategory, subCount]) => (
                      <li key={subCategory}>
                        <Category
                          name={subCategory}
                          recipeCount={subCount}
                          variant="link"
                          onClick={() => navigate(`/categories/${subCategory}`)}
                        />
                      </li>
                    ),
                  )}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

export default CategoryList;
