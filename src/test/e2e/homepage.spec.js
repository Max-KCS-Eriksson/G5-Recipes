import { test, expect } from "@playwright/test";

test.describe("Startsida", () => {
  test("Happy path: visar receptkort och kategorier", async ({ page }) => {
    //Gå till startsidan
    await page.goto("/");

    // Vänta tills receptlistan (GET /recipes) har laddats klart
    await page.waitForResponse(
      (res) =>
        res.url().includes("/recipes") &&
        res.request().method() === "GET" &&
        res.status() === 200,
    );

    //Vänta tills minst ett receptkort finns i DOM:en
    const recipeCards = page.locator('[data-testid="recipe-card-test"]');
    await recipeCards.first().waitFor({ state: "visible", timeout: 15000 });

    //Kontrollera att det finns minst ett receptkort
    expect(await recipeCards.count()).toBeGreaterThan(0);

    //Vänta tills minst en kategori syns
    const categoryList = page.locator('[data-testid="category-item-test"]');
    await categoryList.first().waitFor({ state: "visible", timeout: 15000 });

    //Kontrollera att det finns minst en kategori
    expect(await categoryList.count()).toBeGreaterThan(0);
  });
});
