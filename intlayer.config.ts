import { Locales, type IntlayerConfig } from "intlayer";
import { loadJSON, syncJSON } from "@intlayer/sync-json-plugin";

const config: IntlayerConfig = {
    internationalization: {
        locales: [
            Locales.ENGLISH,
            Locales.PORTUGUESE,
            Locales.FRENCH,
            Locales.SPANISH,
            Locales.CHINESE,
            Locales.JAPANESE,
            Locales.ENGLISH_UNITED_KINGDOM,
        ],
        defaultLocale: Locales.ENGLISH,
    },
    plugins: [
        /**
         * Will load all the JSON files in the src that match the pattern {key}.i18n.json
         */
        loadJSON({
            source: ({ key, locale }) => `./src/**/${key}.i18n.json`,
            locale: Locales.ENGLISH,
            priority: 1,
            format: "intlayer",
        }),
        /**
         * Will load, and write the output and translations back to the JSON files in the locales directory
         */
        syncJSON({
            source: ({ key, locale }) => `./locales/${locale}/${key}.json`,
            priority: 0,
            format: "i18next",
        }),
    ],
};

export default config;