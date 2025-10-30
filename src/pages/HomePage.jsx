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
import styles from "./HomePage.module.css";

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
    <>
      <section className={styles.hero} aria-label="Hero">
        <div className={styles.heroCenter}>
          <SearchBar initialValue={nameQuery} onSearch={handleSearch} />
        </div>
        <div className={styles.curve} aria-hidden="true">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M0,0 C 25,20 75,20 100,0 L100,20 L0,20 Z"
              fill="var(--hero-curve-color)"
            />
          </svg>
        </div>
      </section>

      <section className={styles.content}>
        <CategoryList />
        <RecipeList category={categoryName} nameQuery={nameQuery} />
      </section>
    </>
  );
}
