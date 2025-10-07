export default class Ingredient {
  /**
   * A field of the `Recipe` class.
   *
   * @param {string} name - Name of the ingredient
   * @param {number} amount - Amount required
   * @param {string} unit - Unit of measurement
   * @param {Object} [optional] - Optional fields
   * @param {string} [optional.id] - ID returned from API on GET
   */
  constructor(name, amount, unit, optional = {}) {
    if (!(name && amount && unit))
      throw new Error("`name`, `amount`, and `unit` are required");
    this.name = name;
    this.amount = amount;
    this.unit = unit;

    if (optional.id) this.id = optional.id;
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
