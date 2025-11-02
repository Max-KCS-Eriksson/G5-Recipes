import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import DisplayComments from "../components/DisplayComments.jsx";
import CommentForm from "../components/CommentForm.jsx";
import RecipeInfo from "../components/RecipeInfo.jsx";
import RecipeRating from "../components/RecipeRating.jsx";
import styles from "./RecipePage.module.css";

function RecipePage() {
  const { recipeId } = useParams();
  const [refreshComments, setRefreshComments] = useState(false);

  function handleNewComment() {
    setRefreshComments((prevState) => !prevState);
  }

  return (
    <>
      <section className={styles.recipe}>
        <RecipeInfo recipeId={recipeId} />
      </section>
      <section className={styles.interaction}>
        <div className={styles.rating}>
          <RecipeRating recipeId={recipeId} readOnly={false} />
        </div>
        <div className={styles.allComments}>
          <div className={styles.form}>
            <CommentForm
              recipeId={recipeId}
              onCommentAdded={handleNewComment}
            />
          </div>
          <div className={styles.comments}>
            <DisplayComments
              recipeId={recipeId}
              refreshFlag={refreshComments}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default RecipePage;
