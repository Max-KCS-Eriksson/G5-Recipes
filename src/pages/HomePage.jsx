import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard.jsx";
import CategoryList from "../components/CategoryList.jsx";
import SearchBar from "../components/SearchBar.jsx";
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import ErrorMessage from "../components/ErrorMessage.jsx";
import { getAllRecipes, searchRecipes } from "../api/api_recipes.js";
import { getAllCategories, getRecipesByCategory } from "../api/api_categories.js";

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [recipesData, categoriesData] = await Promise.all([
          getAllRecipes(),
          getAllCategories(),
        ]);
        setRecipes(recipesData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Kunde inte hämta data från servern.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  async function handleCategoryClick(categoryName) {
    setLoading(true);
    try {
      const data = await getRecipesByCategory(categoryName);
      setRecipes(data);
    } catch (err) {
      setError("Kunde inte hämta kategori-recept.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query) {
    setLoading(true);
    try {
      const data = query ? await searchRecipes(query) : await getAllRecipes();
      setRecipes(data);
    } catch (err) {
      setError("Kunde inte söka recept.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main>
      <h1 class="recipe-list-header">Alla recept</h1>
      <SearchBar onSearch={handleSearch} />
      <CategoryList categories={categories} onCategoryClick={handleCategoryClick} />
     <section className="recipe-list">
  {recipes.length > 0 ? (
    recipes.map((r) => <RecipeCard key={r.id || r.title} recipe={r} />)
  ) : (
    <p>Inga recept hittades.</p>
  )}
</section>

    </main>
  );
}
