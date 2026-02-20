import type { IntlayerConfig } from "intlayer";
import { syncJSON } from "@intlayer/sync-json-plugin";
import { locales, defaultLocale } from "./src/i18n/config";

const config: IntlayerConfig = {
    internationalization: {
        locales: [...locales],
        defaultLocale: defaultLocale,
    },
    plugins: [
        /**
         * Syncs and auto-translates the flat JSON files in src/content/.
         *
         * Source of truth: src/content/<namespace>.json
         * Format: { "en": {...}, "pt": {...}, ... }
         *
         * Run `npx intlayer fill` to auto-translate empty locales via AI.
         * Run `npx intlayer content list` to verify discovered files.
         */
        syncJSON({
            /**
             * Maps: key=concept path, locale=locale code
             * Result: src/content/fullstack/hero/en.json
             *         src/content/shared/theme/pt.json
             *
             * intlayer content list  → lists all discovered JSON files
             * intlayer content fill  → auto-translates missing locales
             * intlayer content push  → pushes to Intlayer CMS
             * intlayer content pull  → pulls from Intlayer CMS
             */
            source: ({ key, locale }) => `./src/content/${key}/${locale}.json`,
            priority: 0,
            format: "i18next",
        }),
    ],
};

export default config;