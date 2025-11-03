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

import { NavLink } from "react-router-dom";
import styles from "./Category.module.css";
import { joinClassNames } from "../utils/joinClassNames.js";

function Category({
  name,
  recipeCount = 0,
  isActive = false,
  onClick,
  variant = "link",
}) {
  const base = joinClassNames(styles.categoryItem, styles[variant]);

  if (variant === "link") {
    const to = `/categories/${encodeURIComponent(name)}`;

    return (
      <NavLink
        to={to}
        end
        className={({ isActive: navActive }) =>
          joinClassNames(
            base,
            styles.categoryLink,
            (navActive || isActive) && styles.active,
          )
        }
      >
        <span className={styles.categoryName}>{name}</span>
        <span className={styles.categoryRecipeCount}>({recipeCount ?? 0})</span>
      </NavLink>
    );
  }

  const className = joinClassNames(base, isActive && styles.active);

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
