/**
 * CategoryList Component
 *
 * @component
 * Renderar en lista av kategorier och deras antal recept.
 * Används på HomePage (variant="link") och återanvänder Category-komponenten.
 *
 * @param {string[]} categories - Lista över kategorinamn.
 * @param {Object.<string, number>} categoryRecipeCount - Objekt som mappar varje kategori till antal recept.
 * @returns {JSX.Element} Renderad kategorilista eller fallback-meddelande.
 */

import { useNavigate } from "react-router-dom";
import Category from "./Category.jsx";
import "./CategoryList.css";

function CategoryList({ categories, categoryRecipeCount }) {
  const navigate = useNavigate();

  // Felhantering
  if (!categories || categories.length === 0) {
    return (
      <aside className="category-list">
        <h3>Kategorier</h3>
        <p>Inga kategorier hittades.</p>
      </aside>
    );
  }

  return (
    <aside className="category-list">
      <h3>Kategorier</h3>
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Category
              name={category}
              // Fallback
              count={categoryRecipeCount[category] ?? 0}
              variant="link"
              onClick={() => navigate(`/categories/${category}`)}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryList;
