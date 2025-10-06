import { useParams } from "react-router-dom";

function Recipe() {
  const { recipeId } = useParams();

  return (
    <>
      <h1>Receptet..</h1>
      <p>
        Recept ID: <strong>{recipeId}</strong>
      </p>
    </>
  );
}

export default Recipe;
