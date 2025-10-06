import { useParams } from "react-router-dom";

function Category() {
  const { categoryId } = useParams();

  return (
    <>
      <h1>Pajkategorier</h1>
      <p>
        Här är receptkategori id nr: <strong>{categoryId}</strong>
      </p>
    </>
  );
}

export default Category;
