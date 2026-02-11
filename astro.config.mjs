// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from "@astrojs/sitemap";

import react from "@astrojs/react";
import { intlayer } from "astro-intlayer";

// https://astro.build/config
export default defineConfig({
  site: "https://jhon-portfolio.com", // Placeholder, change to actual domain
  redirects: {
    "/en/": "/en/fullstack",
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap({
    i18n: {
      defaultLocale: "en",
      locales: {
        "en": "en",
        "pt": "pt",
        "fr": "fr",
        "es": "es",
        "zh": "zh",
        "ja": "ja",
        "en-GB": "en-GB"
      }
    }
  }), react(), intlayer()]
});