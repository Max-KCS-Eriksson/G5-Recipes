/**
 * Category Component
 *
 * @component
 * Visar en enskild kategori med namn och antal recept.
 * Kan användas i både HomePage (variant="link") och CategoryPage (variant="toggle").
 *
 * @param {string} name - Namn på kategorin.
 * @param {number} [count=0] - Antal recept i kategorin (visas inom parentes).
 * @param {boolean} [isActive=false] - True om kategorin är markerad (aktiv).
 * @param {() => void} onClick - Klick-händelse (navigering eller toggling).
 * @param {"link"|"toggle"} [variant="link"] - Visuellt läge: länk i HomePage eller toggle i CategoryPage.
 * @returns {JSX.Element} Renderad kategori-komponent.
 */

import "./Category.css";

function Category({
  name,
  count = 0,
  isActive = false,
  onClick,
  variant = "link",
}) {
  const className = `category-item ${variant} ${isActive ? "active" : ""}`;

  return (
    <button
      type="button"
      className={className}
      aria-pressed={isActive}
      onClick={onClick}
    >
      <span className="category-name">{name}</span>
      <span className="category-recipe-count">({count ?? 0})</span>
    </button>
  );
}

export default Category;
