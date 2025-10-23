import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { roundHalf } from "../utils/math";
import { useEffect, useState } from "react";
import { getRecipeById, rateRecipeById } from "../api/connection";

const MIN_RATING = 1;
const MAX_RATING = 5;

/**
 * @param {string} recipe - Instance of (to be) rated `Recipe`.
 * @param {boolean} readOnly - Get average rating, or place a new rating. Default = `true`.
 */
function RecipeRating({ recipeId, readOnly = true }) {
  const [recipe, setRecipe] = useState(null);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const data = await getRecipeById(recipeId);
        setRecipe(data);
      } catch (err) {
        console.error("Failed to load recipe:", err);
      }
    }
    fetchRecipe();
  }, [recipeId]);

  if (recipe && readOnly) return <>{ratingToIcons(recipe.avgRating)}</>;

  if (hasRated) return <p>Tack för ditt betyg!</p>;

  async function rateRecipe(rating) {
    setHasRated(true);
    await rateRecipeById(recipeId, rating);
  }
  const icons = createEmptyRatingIconList();
  return (
    <>
      {icons.map((icon, index) => (
        <span onClick={() => rateRecipe(index + 1)}>{icon}</span>
      ))}
    </>
  );
}

export default RecipeRating;

// Helper

function ratingToIcons(rating) {
  let icons = createEmptyRatingIconList();

  if (rating < MIN_RATING) return icons; // No rating yet
  rating = roundHalf(rating);

  let i;
  const lowballRating = Math.floor(rating);
  for (i = 0; i < lowballRating; i++) {
    icons[i] = <FontAwesomeIcon icon={fullStar} />;
  }
  if (rating > lowballRating) icons[i] = <FontAwesomeIcon icon={halfStar} />;

  return icons;
}

function createEmptyRatingIconList() {
  let ratingIcons = new Array(MAX_RATING);
  ratingIcons.fill(<FontAwesomeIcon icon={emptyStar} />);

  return ratingIcons;
}
