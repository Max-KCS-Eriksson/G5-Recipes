import { test, expect } from "@playwright/test";

test.describe("Startsida", () => {
  test("Happy path: visar receptkort och kategorier", async ({ page }) => {
    //Gå till startsidan
    await page.goto("/");

    //Vänta tills minst ett receptkort finns i DOM:en
    const recipeCards = page.locator('[data-testid="recipe-card-test"]');
    await expect(recipeCards.first()).toBeVisible();

    //Kontrollera att det finns minst ett receptkort
    expect(await recipeCards.count()).toBeGreaterThan(0);

    //Vänta tills minst en kategori syns
    const categoryList = page.locator('[data-testid="category-item-test"]');
    await expect(categoryList.first()).toBeVisible();

    //Kontrollera att det finns minst en kategori
    expect(await categoryList.count()).toBeGreaterThan(0);
  });
});
