import { Link, useParams } from "react-router-dom";
import DisplayComments from "../components/DisplayComments.jsx";
import CommentForm from "../components/CommentForm.jsx";

function RecipePage() {
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
      <section>
        <CommentForm recipeId={recipeId} />
        <DisplayComments recipeId={recipeId} />
      </section>
    </>
  );
}

export default RecipePage;
