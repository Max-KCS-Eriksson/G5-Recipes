/**
 * Category Component
 *
 * @component
 * Renderar en kategori med dess namn och antal recept.
 * Kan användas i både HomePage (variant="link") och CategoryPage (variant="toggle").
 *
 * @param {string} name - Namn på kategorin.
 * @param {number} count - Antal recept i kategorin.
 * @param {boolean} [isActive=false] - True om kategorin är markerad (aktiv).
 * @param {() => void} onClick - Klick-händelse (navigering eller toggling).
 * @param {"link"|"toggle"} [variant="link"] - Visuellt läge: länkliknande (HomePage) eller toggle-knapp (CategoryPage).
 * @returns {JSX.Element} Renderad kategori-komponent.
 */

import "./Category.css";

function Category({
  name,
  count,
  isActive = false,
  onClick,
  variant = "link",
}) {
  const className = `category-item ${variant} ${isActive ? "active" : ""}`;
  return (
    <button className={className} onClick={onClick}>
      <span className="category-name">{name}</span>
      <span className="category-recipe-count">({count})</span>
    </button>
  );
}

export default Category;
