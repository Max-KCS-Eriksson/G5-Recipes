export default class Comment {
  /**
   * Used for `author` leaving a `comment` linked to `Recipe.id`
   *
   * @param {string} author - Name of `Comment`'s author.
   * @param {string} comment - `Comment` of the `Recipe`.
   * @param {Object} optional - Optional raw data returned from API on GET only.
   */
  constructor(author, comment, optional = {}) {
    if (!(author && comment))
      throw new Error("`author` & `comment` is required");
    this.author = author;
    this.comment = comment;

    if (optional.id) this.id = optional.id;
    if (optional.createdAt) this.created = optional.createdAt;
    if (optional.updatedAt) this.updated = optional.updatedAt;
  }

  /**
   * Factory creating instance from API response body on GET request.
   *
   * @param {Object} data - API response body.
   */
  static fromJSON(data) {
    return new Comment(data.name, data.comment, data.recipeId, {
      id: data._id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  /**
   * Serialize according to POST requirements.
   */
  toJSON() {
    return { name: this.author, comment: this.comment };
  }
}
