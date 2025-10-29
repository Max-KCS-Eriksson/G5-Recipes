import { test, expect } from "@playwright/test";

test("visar felmeddelande vid API-fel och fungerar vid retry", async ({
  page,
}) => {
  // Första anropet: simulera 500-fel
  await page.route("**/recipes", (route) =>
    route.fulfill({
      status: 500,
      body: JSON.stringify({ error: "Serverfel" }),
    }),
  );

  // Gå till startsidan
  await page.goto("/");

  // Kontrollera att felmeddelande visas
  await expect(page.getByText("Kunde inte ladda recept.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Försök igen" })).toBeVisible();

  // Andra anropet: låt lyckas
  await page.unroute("**/recipes");
  await page.route("**/recipes", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        { id: "1", name: "Citronpaj" },
        { id: "2", name: "Chokladpaj" },
      ]),
    }),
  );

  // Klicka på "Försök igen"
  await page.getByRole("button", { name: "Försök igen" }).click();

  // Kontrollera att recepten renderas
  await expect(page.getByText("Citronpaj")).toBeVisible();
  await expect(page.getByText("Chokladpaj")).toBeVisible();

  // Felmeddelandet ska inte längre synas
  await expect(page.getByText("Kunde inte ladda recept.")).toBeHidden();
});
