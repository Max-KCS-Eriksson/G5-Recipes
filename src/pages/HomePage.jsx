/**
 * HomePage Component
 *
 * @component
 * Renderar startsidan som visar sökfält, receptlista samt kategorilista med antal recept per kategori.
 * Hämtar data asynkront via API-anrop och hanterar laddning/fel.
 *
 * @returns {JSX.Element} Startsidan för Receptsajten.
 */

import { useParams, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import RecipeList from "../components/RecipeList.jsx";
import CategoryList from "../components/CategoryList.jsx";

export default function HomePage() {
  const { categoryName } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const nameQuery = searchParams.get("search") || "";

  function handleSearch(next) {
    const nextQuery = (next ?? "").trim();
    if (nextQuery) setSearchParams({ search: nextQuery }, { replace: true });
    else setSearchParams({}, { replace: true });
  }

  return (
    <main>
      <section className="hero">
        <SearchBar initialValue={nameQuery} onSearch={handleSearch} />
      </section>

      <section className="content">
        <CategoryList />
        <RecipeList category={categoryName} nameQuery={nameQuery} />
      </section>
    </main>
  );
}
