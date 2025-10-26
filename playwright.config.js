import { defineConfig, devices } from "@playwright/test";

const isCI = process.env.CI === "true";
const PORT = isCI ? 4173 : 5173;
const COMMAND = isCI ? "npm run preview" : "npm run dev";

export default defineConfig({
  testDir: "src/test/e2e",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "on-first-retry",
  },
  webServer: {
    command: COMMAND,
    url: `http://localhost:${PORT}`,
    timeout: 60_000,
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
  reporter: [["list"], ["html", { open: "never" }]],
});
