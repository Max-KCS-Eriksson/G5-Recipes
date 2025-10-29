import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName:
        process.env.NODE_ENV === "production"
          ? "[hash:base64:5]"
          : "[name]_[local]__[hash:base64:5]",
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.js",
    exclude: [
      "node_modules",
      "playwright-report",
      "test-results",
      "./src/test/e2e/**",
    ],
  },
});
