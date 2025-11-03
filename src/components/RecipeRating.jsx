import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar as fullStar,
  faStarHalfStroke as halfStar,
} from "@fortawesome/free-solid-svg-icons";
import { roundHalf } from "../utils/math";
import { useEffect, useState } from "react";
import { getRecipeById, rateRecipeById } from "../api/connection";
import styles from "./RecipeRating.module.css";

const MIN_RATING = 1;
const MAX_RATING = 5;

/**
 * @param {string} recipe - Instance of (to be) rated `Recipe`.
 * @param {boolean} readOnly - Get average rating, or place a new rating. Default = `true`.
 */
function RecipeRating({ recipeId, readOnly = true }) {
  const [recipe, setRecipe] = useState(null);
  const [hasRated, setHasRated] = useState(false);
  const [failedOnRating, setFailedOnRating] = useState(false);
  const [hovered, setHovered] = useState(0);

  useEffect(() => {
    if (!recipeId) {
      return;
    }

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

  if (hasRated)
    return (
      <div className={styles.rating}>
        <p className={styles.thankYou}>Tack för ditt betyg!</p>
      </div>
    );

  async function rateRecipe(rating) {
    try {
      await rateRecipeById(recipeId, rating);
      setHasRated(true);
    } catch {
      setFailedOnRating(true);
    }
  }

  const icons = createEmptyRatingIconList();
  const ratingFragment = icons.map((icon, index) => (
    <span
      key={`${icon.className}${index}`}
      className={`${styles.star} ${index < hovered ? styles.hovered : ""}`}
      onMouseEnter={() => setHovered(index + 1)}
      onMouseLeave={() => setHovered(0)}
      onClick={() => rateRecipe(index + 1)}
    >
      {icon}
    </span>
  ));

  if (failedOnRating) {
    return (
      <div className={styles.rating}>
        <p className={styles.error}>Ett fel uppstod, försök igen.</p>
        <div className={styles.stars}>{ratingFragment}</div>
      </div>
    );
  } else {
    return (
      <div className={styles.rating}>
        <h3 className={styles.title}>Vad tyckte du om receptet?</h3>
        <div className={styles.stars}>{ratingFragment}</div>
      </div>
    );
  }
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
