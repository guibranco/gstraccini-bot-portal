import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// Deployed at: https://guilherme.stracini.com.br/gstraccini-bot-portal
export default defineConfig({
  plugins: [react()],
  base: "/gstraccini-bot-portal/",
  build: {
    outDir: "dist",
    sourcemap: true,
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/vite-env.d.ts"],
    },
  },
});
