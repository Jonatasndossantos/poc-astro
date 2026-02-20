// src/content.config.ts
// Explicitly define content collections so Astro doesn't auto-generate
// them from our i18n JSON folders (nav, profile, etc.).
// These folders are used by intlayer syncJSON, not Astro's content layer.
import { defineCollection } from 'astro:content';

// No collections defined intentionally — our JSON files are managed by
// intlayer (src/content/{namespace}/{locale}.json) and accessed via
// the getTranslations() utility, not Astro Content Collections.
export const collections = {};
