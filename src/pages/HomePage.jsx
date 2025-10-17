/**
 * HomePage Component
 *
 * @component
 * Renderar startsidan som visar sökfält, receptlista samt kategorilista med antal recept per kategori.
 * Hämtar data asynkront via API-anrop och hanterar laddning/fel.
 *
 * @returns {JSX.Element} Startsidan för Receptsajten.
 */

import { useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import RecipeList from "../components/RecipeList.jsx";
import CategoryList from "../components/CategoryList.jsx";

export default function HomePage() {
  const { categoryName } = useParams();

  const [nameQuery, setNameQuery] = useState("");

  return (
    <main>
      <section className="hero">
        <SearchBar onSearch={setNameQuery} />
      </section>

      <section className="content">
        <CategoryList />
        <RecipeList category={categoryName} nameQuery={nameQuery} />
      </section>
    </main>
  );
}
