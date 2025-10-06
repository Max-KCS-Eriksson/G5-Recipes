import { BASE_URL } from "./api_config.js";

/**
 * Hämtar alla recept.
 * @returns {Promise<Array>} Lista av receptobjekt
 */
export async function getAllRecipes() {
  console.log("BASE_URL:", BASE_URL);
  try {
    const res = await fetch(`${BASE_URL}/recipes`);
    console.log("RESPONSE STATUS:", res.status);
    const data = await res.json();
    console.log("RECIPE DATA:", data);
    return data;
  } catch (err) {
    console.error("Fel vid hämtning:", err);
    throw err;
  }
}

/**
 * Hämtar recept filtrerade på sökterm.
 * @param {string} query - sökterm
 * @returns {Promise<Array>} filtrerad lista av recept
 */
export async function searchRecipes(query) {
  try {
    const response = await fetch(`${BASE_URL}/recipes?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error(`API-fel: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fel vid sökning av recept:", error);
    throw error;
  }
}
