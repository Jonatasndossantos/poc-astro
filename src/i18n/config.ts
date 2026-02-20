/**
 * Source of truth for all supported locales in the project.
 * Used by Intlayer, Astro, and UI components.
 */
export const locales = [
    "en",
    "pt",
    "fr",
    "es",
    "zh",
    "ja",
    "en-GB",
] as const;


export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/**
 * Mapping for display names (native names)
 */
export const languageLabels: Record<Locale, string> = {
    en: "English",
    pt: "Português",
    fr: "Français",
    es: "Español",
    zh: "中文",
    ja: "日本語",
    "en-GB": "English (UK)",
};
