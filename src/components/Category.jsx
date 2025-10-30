/**
 * Category Component
 *
 * @component
 * Visar en enskild kategori med namn och antal recept.
 * Kan användas i både HomePage (variant="link") och CategoryPage (variant="toggle").
 *
 * @param {string} name - Namn på kategorin.
 * @param {number} [recipeCount=0] - Antal recept i kategorin (visas inom parentes).
 * @param {boolean} [isActive=false] - True om kategorin är markerad (aktiv).
 * @param {() => void} onClick - Klick-händelse (navigering eller toggling).
 * @param {"link"|"toggle"} [variant="link"] - Visuellt läge: länk i HomePage eller toggle i CategoryPage.
 * @returns {JSX.Element} Renderad kategori-komponent.
 */

import styles from "./Category.module.css";
import { joinClassNames } from "../utils/joinClassNames.js";

function Category({
  name,
  recipeCount = 0,
  isActive = false,
  onClick,
  variant = "link",
}) {
  const className = joinClassNames(
    styles.categoryItem,
    styles[variant],
    isActive && styles.active,
  );

  return (
    <button
      type="button"
      className={className}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <span className={styles.categoryName}>{name}</span>
      <span className={styles.categoryRecipeCount}>({recipeCount ?? 0})</span>
    </button>
  );
}

export default Category;
