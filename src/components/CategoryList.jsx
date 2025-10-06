export default function CategoryList({ categories, onCategoryClick }) {
  if (!categories || categories.length === 0) return null;

  return (
    <ul className="category-list">
      {categories.map((cat) => (
        <li
          key={cat.name}
          onClick={() => onCategoryClick(cat.name)}
          className="category-item"
        >
          {cat.name} {/* ✅ renderar text, inte objekt */}
          {typeof cat.count !== "undefined" && (
            <span style={{ color: "#777", marginLeft: "4px" }}>
              ({cat.count})
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
