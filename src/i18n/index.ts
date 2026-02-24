/**
 * i18n utility — loads dictionaries from src/dictionaries/<key>/<locale>.json
 *
 * Usage in .astro pages:
 *   import { getTranslations } from '@i18n';
 *   const nav     = await getTranslations(locale, 'nav');
 *   const profile = await getTranslations(locale, 'profile');
 *
 * Folder structure (FLAT — no subfolders, key = folder name directly):
 *   src/dictionaries/
 *     nav/
 *       en.json   ← { "title": "Multiverse Portfolio", ... }
 *       pt.json
 *     profile/
 *       en.json   ← { "greeting": "Hi", "bio": { "fullstack": "..." }, ... }
 *       pt.json
 */

export * from './config';
export * from './utils';

type FlatDictionary = Record<string, unknown>;

/**
 * Returns the translated dictionaries for a given locale and namespace key.
 * Falls back to 'en' if the requested locale file doesn't exist.
 *
 * @param locale    - BCP 47 locale code matching the filename (e.g. 'pt', 'en', 'en-GB')
 * @param key       - Concept path inside src/dictionaries/ (e.g. 'fullstack/hero', 'shared/nav')
 */
export async function getTranslations<T extends FlatDictionary = FlatDictionary>(
    locale: string,
    key: string
): Promise<T> {
    try {
        const file = await import(`../dictionaries/${key}/${locale}.json`);
        return file.default as T;
    } catch {
        // Fallback to English if the locale file doesn't exist yet
        const fallback = await import(`../dictionaries/${key}/en.json`);
        return fallback.default as T;
    }
}
