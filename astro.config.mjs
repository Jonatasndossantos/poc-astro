// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";


// https://astro.build/config
export default defineConfig({
  site: "https://jhon-portfolio.com", // Placeholder, change to actual domain
  redirects: {
    "/en/": "/en/fullstack",
  },
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt", "fr", "es", "zh", "ja", "en-GB"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  integrations: [sitemap(), react()]
});