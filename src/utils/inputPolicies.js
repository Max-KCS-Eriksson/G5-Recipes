/**
 * @type {TextPolicy}
 * Default policy for
 * Search queries: allow only letters/numbers/space/'/./-
 * Comment text: allow letters, numbers, spaces, common punctuation
 */
export const SEARCH_QUERY_POLICY = {
  maxLength: 80,
  allowedCharsRegex: /[\p{L}\p{N}\s'’. -]/u,
  normalizeWhitespace: true,
};

export const COMMENT_TEXT_POLICY = {
  minLength: 3,
  maxLength: 500,
  allowedCharsRegex: /^[\p{L}\p{N}\s'’.,:;!?()"-]+$/u,
  normalizeWhitespace: true,
};

export const NAME_POLICY = {
  minLength: 1,
  maxLength: 30,
  allowedCharsRegex: /^(?=.{2,30}$)\p{L}+(?:-\p{L}+)?$/u,
  errorMessage:
    "Namnet får endast innehålla bokstäver och högst ett bindestreck (inte först eller sist), och vara 2–30 tecken långt.",
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
      return { ok: false, message: "Text saknas. Vänligen ange text." };
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

/**
 * Sanitize Search Query: normalize/trim whitespace, drop chars via `allowedCharsRegex`, trim extra characters beyond `maxLength`.
 * @param {unknown} raw;
 * @param {{normalizeWhitespace?:boolean,maxLength?:number,allowedCharsRegex?:RegExp}} [policy={}] ;
 * @returns {string}
 */
export function sanitizeSearchQuery(raw, policy = {}) {
  let query = String(raw ?? "");
  query = policy.normalizeWhitespace ? normalizeSpaces(query) : query.trim();

  if (policy.allowedCharsRegex) {
    // Drop any char not in the allowed class
    query = Array.from(query)
      .filter((ch) => policy.allowedCharsRegex.test(ch))
      .join("");
  }

  const max = policy.maxLength;
  if (Number.isFinite(max) && query.length > max) {
    query = query.slice(0, max);
  }
  return query;
}
