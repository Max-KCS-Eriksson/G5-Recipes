import { useState } from "react";
import {
  compileTextValidator,
  SEARCH_QUERY_POLICY,
  normalizeSpaces,
} from "../utils/inputPolicies";

/**
 * - Empty/whitespace submit: shows error AND resets RecipeList via onSearch("")
 */
export default function SearchBar({
  onSearch,
  initialValue = "",
  policy = SEARCH_QUERY_POLICY,
  onInvalid,
}) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [errorMessage, setErrorMessage] = useState("");

  const validate = compileTextValidator(policy);

  async function handleSubmit(event) {
    event.preventDefault();

    const normalizedProbe = policy.normalizeWhitespace
      ? normalizeSpaces(inputValue)
      : String(inputValue ?? "").trim();

    const result = validate(inputValue);

    if (!result.ok) {
      setErrorMessage(result.message);
      onInvalid?.(result.message);

      if (!normalizedProbe) {
        setInputValue("");
        await onSearch("");
      }
      return;
    }

    setErrorMessage("");
    setInputValue(result.normalizedText);
    await onSearch(result.normalizedText);
  }

  function handleChange(event) {
    setInputValue(event.target.value);
    if (errorMessage) setErrorMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="searchbar">
      <input
        id="recipe-search"
        name="q"
        type="search"
        placeholder="Sök recept…"
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
        inputMode="search"
      />
      <button type="submit">Sök</button>
      {errorMessage && <p className="searchbar-error">{errorMessage}</p>}
    </form>
  );
}
