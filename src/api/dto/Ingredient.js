export default class Ingredient {
  /**
   * A field of the `Recipe` class.
   *
   * @param {string} name - Name of the ingredient
   * @param {number} amount - Amount of the ingredient (can be `null`)
   * @param {string} unit - Unit of measurement (or `""` if `amount` is abscent)
   * @param {Object} [optional] - Optional fields
   * @param {string} [optional.id] - ID returned from API on GET
   */
  constructor(name, amount, unit, optional = {}) {
    if (!name) throw new Error("`name` is required");
    this.name = name;

    this.amount = amount;
    this.unit = unit;

    if (optional?.id) this.id = optional.id;
  }

  /**
   * Factory creating instance from API response body on GET request.
   *
   * @param {Object} data - API response body
   */
  static fromJSON(data) {
    return new Ingredient(data.name, data.amount, data.unit, { id: data._id });
  }

  /**
   * Serialize according to POST requirements
   */
  toJSON() {
    return {
      name: this.name,
      amount: this.amount,
      unit: this.unit,
    };
  }
}
