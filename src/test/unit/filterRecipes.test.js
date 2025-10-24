import { describe, it, expect } from "vitest";
import { filterRecipes } from "../../utils/filterRecipes.js";
// import {
//   compileTextValidator,
//   SEARCH_QUERY_POLICY,
// } from "../../utils/inputPolicies.js";

describe("filterRecipes", () => {
  const recipes = [
    { name: "Köttbullar" },
    { name: "pannkakor" },
    { name: "Gröt" },
    { name: "Äppelpaj" },
  ];

  it("should filter recipes case-insensitively", () => {
    expect(filterRecipes(recipes, "kött")).toEqual([{ name: "Köttbullar" }]);
    expect(filterRecipes(recipes, "KÖTT")).toEqual([{ name: "Köttbullar" }]);
    expect(filterRecipes(recipes, "pANN")).toEqual([{ name: "pannkakor" }]);
    expect(filterRecipes(recipes, "äppel")).toEqual([{ name: "Äppelpaj" }]);
  });

  it("should return all recipes if query is empty", () => {
    expect(filterRecipes(recipes, "")).toEqual(recipes);
    expect(filterRecipes(recipes, "   ")).toEqual(recipes);
  });

  it("should return an empty array if no match", () => {
    expect(filterRecipes(recipes, "pizza")).toEqual([]);
  });
});

// describe("compileTextValidator", () => {
//   it("should filter recipes case-insensitively", () => {
//     // 1. Skapa valideringsfunktionen genom att anropa compileTextValidator
//     const validate = compileTextValidator(SEARCH_QUERY_POLICY);

//     // 2. Anropa validate med användarens input
//     const result = validate("pIZza");

//     // 3. Kontrollera resultatet
//     expect(result).toEqual({
//       normalizedText: "pizza",
//       ok: true,
//     });
//   });

// });
