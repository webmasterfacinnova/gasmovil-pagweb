// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://gasmovil.app",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
