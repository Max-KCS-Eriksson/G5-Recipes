const { isHex } = require("../../../src/recipes/api/helpers");

test("valid Hex", () => {
  let validHex = "8afA13";
  expect(isHex(validHex)).toBe(true);
});

test("invalid Hex", () => {
  let invalidHex = "2agA4";
  expect(isHex(invalidHex)).toBe(false);
});
