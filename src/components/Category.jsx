import "./Category.css";

function Category({ name, count, isActive, onClick, variant = "link" }) {
  const className = `category-item ${variant} ${isActive ? "active" : ""}`;
  return (
    <button className={className} onClick={onClick}>
      <span className="category-name">{name}</span>
      <span className="category-count">({count})</span>
    </button>
  );
}
export default Category;
