import { test, expect } from "@playwright/test";

// Fixtures/payloads with potential XSS content
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

    // Ignore React’s dev warning about missing list keys
    if (text.includes('Each child in a list should have a unique "key" prop')) {
      return;
    }

    state.consoleErrors.push(text);
  });

  return state;
}

// Helper: mock API responses to inject known "spicy" data (list + detail)
async function mockRecipeRoutes(page, list, detail) {
  // Detail: /recipes/:id
  await page.route("**/recipes/*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json; charset=utf-8",
      body: JSON.stringify(detail),
    });
  });

  // List: /recipes and /recipes/
  for (const pattern of ["**/recipes", "**/recipes/"]) {
    await page.route(pattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify(list),
      });
    });
  }

  // Categories: /categories and /categories/
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

test.describe("6.3.4 XSS — render without execution (HomePage, RecipePage)", () => {
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
    await Promise.all([
      page.waitForResponse((r) => r.url().includes("/recipes") && r.ok()),
      page.waitForResponse((r) => r.url().includes("/categories") && r.ok()),
    ]);
    await page.waitForLoadState("networkidle");

    const homeHTML = await page.content();
    expect(homeHTML).not.toContain('<script>alert("XSS")</script>');
    expect(homeHTML).not.toMatch(/<img[^>]+onerror=/i);

    // RecipePage
    await page.goto("/recipes/1");
    const detailHTML = await page.content();
    expect(detailHTML).not.toContain('<script>alert("XSS")</script>');
    expect(detailHTML).not.toMatch(/<img[^>]+onerror=/i);

    // Global safety checks
    expect(captors.dialogTriggered).toBe(false);
    expect(captors.consoleErrors).toHaveLength(0);
  });
});
