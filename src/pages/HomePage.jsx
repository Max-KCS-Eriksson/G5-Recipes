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
          <div className={styles.searchbarDock}>
            <SearchBar initialValue={nameQuery} onSearch={handleSearch} />
          </div>
        </div>
        <div className={styles.curve} aria-hidden="true">
          <svg viewBox="0 0 100 20" preserveAspectRatio="none">
            <path
              d="M0,0 C 25,25 75,25 100,0 L100,25 L0,25 Z"
              fill="var(--hero-curve-color)"
            />
          </svg>
        </div>
      </section>

      <section className={styles.gridContainer} aria-label="Content">
        <aside className={styles.sidebar} aria-label="Categories">
          <div className={styles.sidebarBox}>
            <CategoryList />
          </div>
        </aside>
        <div className={styles.contentCards} aria-label="Content">
          <RecipeList category={categoryName} nameQuery={nameQuery} />
        </div>
        {/* Right-side invisible block to center the cards (desktop only via CSS) */}
        <div className={styles.spacer} aria-hidden="true" />
      </section>
    </>
  );
}
