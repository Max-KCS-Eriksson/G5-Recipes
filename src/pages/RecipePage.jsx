import { Link, useParams } from "react-router-dom";
import DisplayComments from "../components/DisplayComments.jsx";
import CommentForm from "../components/CommentForm.jsx";
import RecipeInfo from "../components/RecipeInfo.jsx";
import RecipeRating from "../components/RecipeRating.jsx";

function RecipePage() {
  const { recipeId } = useParams();

  return (
    <>
      <section>
        <RecipeInfo recipeId={recipeId} />
      </section>
      <section>
        <RecipeRating recipeId={recipeId} readOnly={false} />
        <CommentForm recipeId={recipeId} />
        <DisplayComments recipeId={recipeId} />
      </section>
    </>
  );
}

export default RecipePage;
