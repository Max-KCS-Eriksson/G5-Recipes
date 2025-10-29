import { test, expect } from "@playwright/test";

// Fixtures including "evil" payloads with potential XSS content
const RECIPES_FIXTURE = Object.freeze([
  Object.freeze({
    id: "68flkgsht43848375987sdlf",
    title: `<img src=x onerror=alert('XSS')>`,
    description: `<script>alert("XSS")</script>`,
    rating: 4.2,
    categories: ["Dessert", "choklad"],
    ingredients: [{ name: "Ingredient 1", amount: "1", unit: "pcs" }],
    instructions: ["Do", "like", "this"],
  }),
  Object.freeze({
    id: "68dhgluk387d84kskd83jdl4",
    title: "Harmless Recipe",
    description: "Just text.",
    rating: 3.7,
    categories: ["Dessert"],
    ingredients: [{ name: "Ingredient 1", amount: "1", unit: "pcs" }],
    instructions: ["Do", "like", "this"],
  }),
]);

const RECIPE_DETAIL_FIXTURE = Object.freeze({
  id: "68flkgsht43848375987sdlf",
  title: `<img src=x onerror=alert('XSS')>`,
  description: `<script>alert("XSS")</script>`,
  rating: 4.2,
  categories: ["Dessert", "choklad"],
  ingredients: [{ name: "Ingredient 1", amount: "1", unit: "pcs" }],
  instructions: ["Do", "like", "this"],
});

// Helper: monitor the browser for unwanted behavior (popups, console errors)
function attachNoExecCaptors(page) {
  const state = { dialogTriggered: false, consoleErrors: [] };

  page.on("dialog", async (d) => {
    state.dialogTriggered = true;
    await d.dismiss();
  });

  page.on("console", (msg) => {
    if (msg.type() !== "error") return;

    const text = msg.text();

    if (text.includes('Each child in a list should have a unique "key" prop')) {
      return;
    }
    state.consoleErrors.push(text);
  });
  return state;
}

// Helper: mock API responses to inject known "spicy" data (list + detail)
async function mockRecipeRoutes(page, list, detail) {
  await page.route("**/recipes/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(detail),
    });
  });

  for (const pattern of ["**/recipes", "**/recipes/"]) {
    await page.route(pattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify(list),
      });
    });
  }

  for (const pattern of ["**/categories", "**/categories/"]) {
    await page.route(pattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify(["Kyckling", "Vegetariskt"]),
      });
    });
  }
}

test.describe("XSS render without execution (HomePage, RecipePage)", () => {
  let captors;

  test.beforeEach(async ({ page }) => {
    captors = attachNoExecCaptors(page);
    await mockRecipeRoutes(page, RECIPES_FIXTURE, RECIPE_DETAIL_FIXTURE);
  });

  test.afterEach(async ({ page }) => {
    await page.unroute("**/recipes");
    await page.unroute("**/recipes/");
    await page.unroute("**/recipes/*");
    await page.unroute("**/categories");
    await page.unroute("**/categories/");
  });

  test("no dialogs, no console errors, no live tags", async ({ page }) => {
    // HomePage
    await page.goto("/");
    await expect(page.getByText("Harmless Recipe")).toBeVisible();

    // 1) No real onerror attributes on any <img>
    await expect(page.locator("img[onerror]")).toHaveCount(0);

    // 2) No script tags inside recipe cards
    await expect(
      page.locator('[data-testid="recipe-card-test"] script'),
    ).toHaveCount(0);

    const firstCard = page.getByTestId("recipe-card-test").first();
    await expect(firstCard.getByRole("heading", { level: 2 })).toHaveText(
      "<img src=x onerror=alert('XSS')>",
    );

    // RecipePage
    await page.goto("/recipes/68flkgsht43848375987sdlf");
    await expect(page.locator("img[onerror]")).toHaveCount(0);
    await expect(
      page.locator('[data-testid="recipe-card-test"] script'),
    ).toHaveCount(0);

    // Global safety checks
    expect(captors.dialogTriggered).toBe(false);
    expect(captors.consoleErrors).toHaveLength(0);
  });
});
