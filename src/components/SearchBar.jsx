import { useState } from "react";
import {
  SEARCH_QUERY_POLICY,
  sanitizeSearchQuery,
} from "../utils/inputPolicies";
import styles from "./SearchBar.module.css";
import searchIcon from "../assets/search-button.svg";

export default function SearchBar({
  onSearch,
  initialValue = "",
  policy = SEARCH_QUERY_POLICY,
}) {
  const [inputValue, setInputValue] = useState(initialValue);

  async function handleSubmit(event) {
    event.preventDefault();

    const searchQuery = sanitizeSearchQuery(inputValue, policy);

    await onSearch(searchQuery);
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <form onSubmit={handleSubmit} className={styles.searchbar}>
      <input
        id="recipe-search"
        name="q"
        type="search"
        placeholder="Sök på recept…"
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
        inputMode="search"
        className={styles.input}
      />
      <button type="submit" className={styles.button} aria-label="Sök recept">
        <img src={searchIcon} alt="" className={styles.icon} />
      </button>
    </form>
  );
}
