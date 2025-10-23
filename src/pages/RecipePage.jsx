import { Link, useParams } from "react-router-dom";
import DisplayComments from "../components/DisplayComments.jsx";
import RecipeInfo from "../components/RecipeInfo.jsx";
import CommentForm from "../components/CommentForm.jsx";
import RecipeRating from "../components/RecipeRating.jsx";

function RecipePage() {
  const { recipeId } = useParams();

  return (
    <>
      <h1>Receptet..</h1>
      <section>
        <RecipeInfo recipeId={recipeId} />
      </section>
      <p>
        <Link to="/">
          <strong>Go back to Home/Main</strong>
        </Link>
      </p>
      <section>
        <RecipeRating recipeId={recipeId} readOnly={false} />
        <CommentForm recipeId={recipeId} />
        <DisplayComments recipeId={recipeId} />
      </section>
    </>
  );
}

export default RecipePage;
