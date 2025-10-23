import { Link, useParams } from "react-router-dom";
import DisplayComments from "../components/DisplayComments.jsx";
import CommentForm from "../components/CommentForm.jsx";
import RecipeInfo from "../components/RecipeInfo.jsx";

function RecipePage() {
  const { recipeId } = useParams();

  return (
    <>
      <section>
        <RecipeInfo recipeId={recipeId} />
      </section>
      <section>
        <CommentForm recipeId={recipeId} />
        <DisplayComments recipeId={recipeId} />
      </section>
    </>
  );
}

export default RecipePage;
