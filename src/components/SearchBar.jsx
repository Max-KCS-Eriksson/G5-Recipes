import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Sök recept..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Sök</button>
    </form>
  );
}
