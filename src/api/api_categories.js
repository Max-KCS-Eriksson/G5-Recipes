import { BASE_URL } from "./api_config.js";

/**
 * Hämtar alla kategorier.
 * @returns {Promise<Array>} lista av kategorier
 */
export async function getAllCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error(`API-fel: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fel vid hämtning av kategorier:", error);
    throw error;
  }
}

/**
 * Hämtar alla recept inom en kategori.
 * @param {string} categoryName
 */
export async function getRecipesByCategory(categoryName) {
  try {
    const response = await fetch(`${BASE_URL}/categories/${encodeURIComponent(categoryName)}/recipes`);
    if (!response.ok) throw new Error(`API-fel: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fel vid hämtning av kategori-recept:", error);
    throw error;
  }
}
