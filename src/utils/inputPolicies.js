/**
 * @type {TextPolicy}
 * Default policy for
 * Search queries: allow only letters/numbers/space/'/./-
 * Comment text: allow letters, numbers, spaces, common punctuation
 */
export const SEARCH_QUERY_POLICY = {
  minLength: 2,
  maxLength: 80,
  allowedCharsRegex: /^[\p{L}\p{N}\s'’..-]+$/u,
  normalizeWhitespace: true,
};

export const COMMENT_TEXT_POLICY = {
  minLength: 3,
  maxLength: 500,
  allowedCharsRegex: /^[\p{L}\p{N}\s'’.,:;!?()"-]+$/u,
  normalizeWhitespace: true,
};

/**
 * Collapse internal whitespace to a single space and trim ends.
 * @param {string} rawText - Unsanitized text from user input
 * @returns {string} normalizedText
 */
export function normalizeSpaces(rawText) {
  return String(rawText ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Build a validator function from a policy.
 * @param {TextPolicy} policy - Validation policy.
 * @returns {(userInput: string) =>
 *   ({ ok: true, normalizedText: string } | { ok: false, message: string })}
 */
export function compileTextValidator(policy) {
  return function validate(userInput) {
    const { minLength, maxLength, allowedCharsRegex, normalizeWhitespace } =
      policy;

    let normalizedText = String(userInput ?? "");
    normalizedText = normalizeWhitespace
      ? normalizeSpaces(normalizedText)
      : normalizedText.trim();

    if (!normalizedText) {
      return { ok: false, message: "Söktext saknas. Vänligen ange text." };
    }
    if (normalizedText.length < minLength) {
      return { ok: false, message: `Vänligen ange minst ${minLength} tecken.` };
    }
    if (normalizedText.length > maxLength) {
      return { ok: false, message: `Vänligen ange högst ${maxLength} tecken.` };
    }
    if (allowedCharsRegex && !allowedCharsRegex.test(normalizedText)) {
      return { ok: false, message: "Ogiltiga tecken. Vänligen försök igen." };
    }
    return { ok: true, normalizedText };
  };
}
