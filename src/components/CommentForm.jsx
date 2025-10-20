import { useState } from "react";
import {
  NAME_POLICY,
  COMMENT_TEXT_POLICY,
  compileTextValidator,
  normalizeSpaces,
} from "../utils/inputPolicies.js";
import { commentRecipeById } from "../api/connection.js";
import "./CommentForm.css";

function CommentForm({ recipeId, onCommentAdded }) {
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateName = compileTextValidator(NAME_POLICY);
  const validateComment = compileTextValidator(COMMENT_TEXT_POLICY);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const nameValidation = validateName(normalizeSpaces(author));
    if (!nameValidation.ok) {
      setErrorMessage(nameValidation.message);
      return;
    }

    const commentValidation = validateComment(normalizeSpaces(comment));
    if (!commentValidation.ok) {
      setErrorMessage(commentValidation.message);
      return;
    }

    try {
      setIsSubmitting(true);
      await commentRecipeById(
        recipeId,
        commentValidation.normalizedText,
        nameValidation.normalizedText,
      );
      setIsSubmitted(true);
      setAuthor("");
      setComment("");
      if (onCommentAdded) onCommentAdded();
    } catch {
      setErrorMessage("Något gick fel vid inskickning. Försök igen.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return <div className="comment-form success">Tack för din kommentar!</div>;
  }

  return (
    <div className="comment-form">
      <h2>Lämna en kommentar</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="comment-form-group">
          <label htmlFor="author">Namn</label>
          <input
            id="author"
            type="text"
            maxLength={30}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={isSubmitting}
            placeholder="Ditt namn"
          />
        </div>

        <div className="comment-form-group">
          <label htmlFor="comment">Kommentar</label>
          <textarea
            id="comment"
            maxLength={500}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
            placeholder="Skriv din kommentar här…"
          />
        </div>

        {errorMessage && <p className="error-text">{errorMessage}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Skickar..." : "Skicka kommentar"}
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
