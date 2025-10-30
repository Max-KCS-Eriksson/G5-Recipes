import { useParams } from "react-router-dom";
import { useState } from "react";
import DisplayComments from "../components/DisplayComments.jsx";
import CommentForm from "../components/CommentForm.jsx";
import RecipeInfo from "../components/RecipeInfo.jsx";
import RecipeRating from "../components/RecipeRating.jsx";

function RecipePage() {
  const { recipeId } = useParams();
  const [refreshComments, setRefreshComments] = useState(false);

  function handleNewComment() {
    setRefreshComments((prevState) => !prevState);
  }

  return (
    <>
      <section>
        <RecipeInfo recipeId={recipeId} />
      </section>
      <section>
        <RecipeRating recipeId={recipeId} readOnly={false} />
        <CommentForm recipeId={recipeId} onCommentAdded={handleNewComment} />
        <DisplayComments recipeId={recipeId} refreshFlag={refreshComments} />
      </section>
    </>
  );
}

export default RecipePage;
