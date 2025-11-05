import { test, expect } from "@playwright/test";

test.describe("The search flow", () => {
  test("A search reduces the list; ?search works on reload; clear of a search shows all list again", async ({
    page,
  }) => {
    await page.goto("/");

    const searchbox = page.getByRole("searchbox");
    const searchButton = page.getByRole("button", { name: /sök recept/i });
    const list = page.getByRole("list", { name: /receptlista/i });
    const items = list.getByRole("listitem");

    await expect(list).toBeVisible();
    const initialCount = await items.count();
    expect(initialCount).toBeGreaterThan(0);

    await searchbox.fill("kyckling");
    await searchButton.click();

    await expect
      .poll(async () => await items.count())
      .toBeLessThan(initialCount);

    const filteredCount = await items.count();

    await expect
      .poll(() => new URL(page.url()).searchParams.has("search"))
      .toBe(true);

    await page.reload();

    await expect(searchbox).toHaveValue("kyckling");
    await expect.poll(async () => await items.count()).toBe(filteredCount);

    await searchbox.clear();
    await searchButton.click();

    await expect
      .poll(() => new URL(page.url()).searchParams.has("search"))
      .toBe(false);
    await expect.poll(async () => await items.count()).toBe(initialCount);
  });
});
