import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import RecipeList from "../components/RecipeList.jsx";

export default function HomePage() {
  const [nameQuery, setNameQuery] = useState("");

  return (
    <>
      <section className="hero">
        <SearchBar onSearch={setNameQuery} />
      </section>

      <RecipeList nameQuery={nameQuery} />
    </>
  );
}
