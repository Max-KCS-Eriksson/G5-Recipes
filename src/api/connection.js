import Recipe from "./dto/Recipe.js";
import Comment from "./dto/Comment.js";
import { getData, postData, isHex } from "./helpers.js";

export const API_URL = "https://grupp5-hzqem.reky.se";

/**
 * Fetch all `Recipe`.
 *
 * @async
 * @param {string} [nameQuery] - Optionally narrow down list by search term.
 * @returns {Array<Recipe>} All `Recipe` stored in the database.
 */
export async function getRecipes(nameQuery) {
  const API_ENDPOINT = `${API_URL}/recipes`;
  let data;
  if (nameQuery) {
    const QUERY_PARAM = `?query=${nameQuery}`;
    data = await getData(`${API_ENDPOINT}${QUERY_PARAM}`);
  } else {
    data = await getData(API_ENDPOINT);
  }

  return data.map(Recipe.fromJSON);
}

/**
 * Fetch specified `Recipe` details.
 *
 * @async
 * @param {string} id - A 24 character hexadecimal.
 * @returns {Recipe} A `Recipe` with details.
 */
export async function getRecipeById(id) {
  const API_ENDPOINT = `${API_URL}/recipes`;

  validateId(id);

  return Recipe.fromJSON(await getData(`${API_ENDPOINT}/${id}`));
}

/**
 * Fetch all categories stored in the database.
 *
 * @async
 * @returns {Array<string>} Category names.
 */
export async function getCategories() {
  const API_ENDPOINT = `${API_URL}/categories`;

  const data = await getData(API_ENDPOINT);
  return data.map((category) => category.name);
}

/**
 * Fetch a categorized list of `Recipe`.
 *
 * @async
 * @param {string} category - Name of category.
 * @returns {Array<Recipe>} Narrowed down list of `Recipe`.
 */
export async function getRecipesByCategory(category) {
  const API_ENDPOINT = `${API_URL}/categories`;
  const API_PATH = `/${category}/recipes`;

  const data = await getData(`${API_ENDPOINT}${API_PATH}`);
  return data.map(Recipe.fromJSON);
}

/**
 * Publish a rating of a specific `Recipe`.
 *
 * @param {string} id - A 24 character hexadecimal, specifying rated `Recipe`.
 * @param {number} rating - Rating of `Recipe`
 * @returns {boolean} Success confirmation in the form of a `Boolean`.
 */
export async function rateRecipeById(id, rating) {
  const API_ENDPOINT = `${API_URL}/recipes`;
  const API_PATH = `/${id}/ratings`;

  validateId(id);

  await postData(`${API_ENDPOINT}${API_PATH}`, { rating: rating });
}

/**
 * Fetch all `Comment` for specified `Recipe`.
 *
 * @async
 * @param {string} id - A 24 character hexadecimal `Recipe` id.
 * @returns {Array<Comment>} All stored `Comment` of the `Recipe`.
 */
export async function getCommentsByRecipeId(id) {
  const API_ENDPOINT = `${API_URL}/recipes`;
  const API_PATH = `/${id}/comments`;

  validateId(id);

  const data = await getData(`${API_ENDPOINT}${API_PATH}`);
  return data.map(Comment.fromJSON);
}

/**
 * Publish a `Comment` for specified `Recipe`.
 * Currently the API returns 404 if more keys other than `comment` and `name`
 * are in the request body object.
 *
 * @async
 * @param {string} id - A 24 character hexadecimal `Recipe` id.
 * @param {string} comment - `Comment` description.
 * @param {string} author - Name of `Comment`'s author.
 * @returns {boolean} Success confirmation in the form of a `Boolean`.
 */
export async function commentRecipeById(id, comment, author) {
  const API_ENDPOINT = `${API_URL}/recipes`;
  const API_PATH = `/${id}/comments`;

  validateId(id);

  await postData(`${API_ENDPOINT}${API_PATH}`, new Comment(author, comment));
}

// Helpers

function validateId(id) {
  if (!(isHex(id) && id.length === 24))
    throw new Error("`id` must be a 24 character hexadecimal");
}
