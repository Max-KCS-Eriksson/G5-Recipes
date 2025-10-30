import Ingredient from "./Ingredient.js";

export default class Recipe {
  /**
   * @param {string} title - Name of the dish.
   * @param {string[]} categories - Categorization of the dish.
   * @param {string} description - Description of the dish.
   * @param {string} imageUrl - URL to an image depicting the dish.
   * @param {Object} ingredients - Ingredient related info.
   * @param {number} ingredients.price - Total price of all the `Ingredient`.
   * @param {Ingredient[]} ingredients.items - All required `Ingredient` of the dish.
   * @param {Object} instructions - Instruction related info.
   * @param {number} instructions.timeInMins - Total number of minutes to prepare the dish.
   * @param {string[]} instructions.steps - Cooking steps for the dish.
   * @param {Object} [optional] - Optional data for POST & data returned from API on GET.
   * @param {string} [optional.id] - Returned from API on GET only.
   * @param {number} [optional.avgRating] - Average rating returned from API on GET only.
   * @param {number[]} [optional.ratings] - Ratings array (optional for POST only).
   */
  constructor(
    name,
    categories,
    description,
    imageUrl,
    ingredients,
    instructions,
    optional = {},
  ) {
    if (!(name && description))
      throw new Error("`title` and `description` are required");
    if (
      !ingredients ||
      !Array.isArray(ingredients.items) ||
      ingredients.items.length === 0
    )
      throw new Error("`ingredients.items` must be a non-empty array");
    if (
      !instructions ||
      !Array.isArray(instructions.steps) ||
      instructions.steps.length === 0
    )
      throw new Error("`instructions.steps` must be a non-empty array");
    if (!Array.isArray(categories) || categories.length === 0)
      throw new Error("`categories` must be a non-empty array");

    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.categories = categories;

    if (optional?.id) this.id = optional.id;
    if (optional?.avgRating !== undefined) this.avgRating = optional.avgRating;
    if (optional?.ratings !== undefined) this.ratings = optional.ratings;
  }

  /**
   * Factory creating instance from API response body on GET request.
   *
   * @param {Object} data - API response body.
   */
  static fromJSON(data) {
    return new Recipe(
      data.title,
      data.categories,
      data.description,
      data.imageUrl,
      {
        price: data.price,
        items: data.ingredients.map(Ingredient.fromJSON),
      },
      {
        timeInMins: data.timeInMins,
        steps: data.instructions,
      },
      {
        id: data._id,
        avgRating: data.avgRating,
        ratings: data.ratings,
      },
    );
  }

  /**
   * Serialize according to POST requirements.
   */
  toJSON() {
    const body = {
      title: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.ingredients.price,
      timeInMins: this.instructions.timeInMins,
      categories: this.categories,
      instructions: this.instructions.steps,
      ingredients: this.ingredients.items.map((ingredient) =>
        ingredient.toJSON(),
      ),
    };

    // Can be left out, or an array of numbers - empty or not.
    if (this.ratings !== undefined) {
      body.ratings = this.ratings;
    }

    return body;
  }
}
