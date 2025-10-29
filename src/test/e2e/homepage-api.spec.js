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
  await page.waitForLoadState("domcontentloaded");

  // Kontrollera att felmeddelanden och retry-knappar visas (både för recept och kategorier)
  const retryButtons = page.getByRole("button", { name: "Försök igen" });
  await expect(retryButtons.first()).toBeVisible();
  await expect(retryButtons.nth(1)).toBeVisible();

  // Andra anropet: låt lyckas
  await page.unroute("**/recipes");
  await page.route("**/recipes", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([
        {
          _id: "507f1f77bcf86cd799439011",
          title: "Citronpaj",
          categories: ["Efterrätter"],
          description: "En läcker citronpaj",
          imageUrl: "citronpaj.jpg",
          ingredients: [
            { _id: "ing1", name: "citron", amount: 2, unit: "st" },
            { _id: "ing2", name: "socker", amount: 100, unit: "g" },
          ],
          price: 50,
          timeInMins: 45,
          instructions: ["Gör pajdeg", "Förgrädda", "Fyll med citronkräm"],
          avgRating: 4.5,
          ratings: [5, 4, 4, 5],
        },
        {
          _id: "507f1f77bcf86cd799439012",
          title: "Chokladpaj",
          categories: ["Efterrätter"],
          description: "En härlig chokladpaj",
          imageUrl: "chokladpaj.jpg",
          ingredients: [
            { _id: "ing3", name: "choklad", amount: 200, unit: "g" },
            { _id: "ing4", name: "mjöl", amount: 250, unit: "g" },
          ],
          price: 70,
          timeInMins: 40,
          instructions: ["Smält choklad", "Blanda", "Baka"],
          avgRating: 4.2,
          ratings: [5, 4, 3, 5],
        },
      ]),
    }),
  );

  // Klicka på retry-knappen för RECEPT (ligger under kategori-listan, alltså index 1)
  await retryButtons.nth(1).click();

  // Kontrollera att recepten renderas
  await expect(page.getByText("Citronpaj")).toBeVisible();
  await expect(page.getByText("Chokladpaj")).toBeVisible();

  // Felmeddelandet ska inte längre synas
  await expect(page.getByText("Kunde inte ladda recept.")).toBeHidden();
});
