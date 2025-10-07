import { Link, useParams } from "react-router-dom";

function Recipe() {
  const { recipeId } = useParams();

  return (
    <>
      <h1>Receptet..</h1>
      <p>
        Recept ID: <strong>{recipeId}</strong>
      </p>
      <p>
        <Link to="/">
          <strong>Go back to Home/Main</strong>
        </Link>
      </p>
    </>
  );
}

export default Recipe;
