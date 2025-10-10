import { useEffect, useState } from "react";
import { getRecipes, getRecipesByCategory } from "../api/connection";

export default function RecipeList({ category }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function fetchRecipes() {
      if (category) setRecipes(await getRecipesByCategory(category));
      else setRecipes(await getRecipes());
    }
    fetchRecipes();
  }, [category]);

  return (
    <>
      <h1>Alla paj recept här!</h1>
      <p>Hello Paj World..</p>
      <p>{recipes.length}</p>
    </>
  );
}
