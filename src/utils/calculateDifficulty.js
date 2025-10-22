export function calculateDifficulty(timeInMins, ingredientCount, totalPrice) {
  let score = 0;

  if (timeInMins <= 60) score += 0;
  else if (timeInMins <= 90) score += 1;
  else score += 2;

  if (ingredientCount <= 5) score += 0.5;
  else if (ingredientCount <= 10) score += 1;
  else score += 2;

  if (totalPrice <= 100) score += 0;
  else if (totalPrice <= 150) score += 0.5;
  else if (totalPrice <= 300) score += 1;
  else score += 2;

  if (score <= 2) return "Lätt";
  if (score <= 3.5) return "Medel";
  return "Svår";
}
