import { Link, useParams } from "react-router-dom";

function CategoryPage() {
  const { categoryName } = useParams();

  return (
    <>
      <h1>Pajkategorier</h1>
      <p>
        Här är receptkategori id nr: <strong>{categoryName}</strong>
      </p>
      <p>
        <Link to="/">
          <strong>Go back to Home/Main</strong>
        </Link>
      </p>
    </>
  );
}

export default CategoryPage;
