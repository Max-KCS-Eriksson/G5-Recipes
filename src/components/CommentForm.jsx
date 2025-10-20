import { useState } from "react";
import { commentRecipeById } from "../api/connection.js";
import {
  COMMENT_TEXT_POLICY,
  compileTextValidator,
  normalizeSpaces,
} from "../utils/inputPolicies.js";
import "./CommentForm.css";

export default function CommentForm({ recipeId }) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = compileTextValidator(COMMENT_TEXT_POLICY);

  async function handleSubmit(event) {
    event.preventDefault();

    const nameTrimmed = normalizeSpaces(author);
    const commentValidation = validate(comment);

    if (!nameTrimmed) {
      setErrorMessage("Namn saknas. Vänligen fyll i ditt namn.");
      return;
    }
    if (!commentValidation.ok) {
      setErrorMessage(commentValidation.message);
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");

      await commentRecipeById(
        recipeId,
        commentValidation.normalizedText,
        nameTrimmed,
      );

      setIsSubmitted(true);
      setAuthor("");
      setComment("");
    } catch (err) {
      console.error("Kunde inte skicka kommentar:", err);
      setErrorMessage("Ett fel uppstod. Försök igen senare.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className="comment-form success">
        <p>
          <strong>Tack för din kommentar!</strong>
        </p>
      </section>
    );
  }

  return (
    <section className="comment-form">
      <h2>Lämna en kommentar</h2>

      <form onSubmit={handleSubmit}>
        <div className="comment-form-group">
          <label htmlFor="author">Namn</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isSubmitting}
            placeholder="Ditt namn"
            required
          />
        </div>

        <div className="comment-form-group">
          <label htmlFor="comment">Kommentar</label>
          <textarea
            id="comment"
            rows="3"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
            placeholder="Skriv din kommentar här…"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Skickar..." : "Skicka kommentar"}
        </button>

        {errorMessage && <p className="error-text">{errorMessage}</p>}
      </form>
    </section>
  );
}
