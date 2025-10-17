/**
 * HomePage Component
 *
 * @component
 * Renderar startsidan som visar sökfält, receptlista samt kategorilista med antal recept per kategori.
 * Hämtar data asynkront via API-anrop och hanterar laddning/fel.
 *
 * @returns {JSX.Element} Startsidan för Receptsajten.
 */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCategories, getRecipesByCategory } from "../api/connection";
import SearchBar from "../components/SearchBar.jsx";
import RecipeList from "../components/RecipeList.jsx";
import CategoryList from "../components/CategoryList.jsx";

export default function HomePage() {
  const { categoryName } = useParams();

  const [nameQuery, setNameQuery] = useState("");
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
    <main>
      <section className="hero">
        <SearchBar onSearch={setNameQuery} />
      </section>

      <section className="content">
        <CategoryList
          categories={categories}
          categoryRecipeCount={categoryRecipeCount}
        />
        <RecipeList category={categoryName} nameQuery={nameQuery} />
      </section>
    </main>
  );
}
