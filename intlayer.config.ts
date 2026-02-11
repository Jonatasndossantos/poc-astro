import { Locales, type IntlayerConfig } from "intlayer";
import { z } from "zod";

/**
 * Example Intlayer configuration file showing all available options.
 */
const config: IntlayerConfig = {
    /**
     * Configuration for internationalization settings.
     */
    internationalization: {
        /**
         * List of supported locales in the application.
         * Default: [Locales.ENGLISH]
         */
        locales: [
            Locales.PORTUGUESE,
            Locales.ENGLISH,
            Locales.FRENCH,
            Locales.SPANISH,
            Locales.CHINESE,
            Locales.JAPANESE,
            Locales.ENGLISH_UNITED_KINGDOM,
        ],

        /**
         * List of required locales that must be defined in every dictionary.
         * If empty, all locales are required in `strict` mode.
         * Default: []
         */
        requiredLocales: [Locales.ENGLISH],

        /**
         * Strictness level for internationalized content.
         * - "strict": Errors if any declared locale is missing or undeclared.
         * - "inclusive": Warnings if a declared locale is missing.
         * - "loose": Accepts any existing locale.
         * Default: "inclusive"
         */
        strictMode: "inclusive",

        /**
         * Default locale used as a fallback if the requested locale is not found.
         * Default: Locales.ENGLISH
         */
        defaultLocale: Locales.ENGLISH,
    },

    /**
     * Settings that control dictionary operations and fallback behavior.
     */
    dictionary: {
        /**
         * Controls how dictionaries are imported.
         * - "static": Statically imported at build time.
         * - "dynamic": Dynamically imported using Suspense.
         * - "fetch": Fetched dynamically via the live sync API.
         * Default: "static"
         */
        importMode: "static",

        /**
         * Strategy for auto-filling missing translations using AI.
         * Can be a boolean or a path pattern to store filled content.
         * Default: true
         */
        fill: true,

        /**
         * Physical location of the dictionary files.
         * - "local": Stored in the local filesystem.
         * - "remote": Stored in the Intlayer CMS.
         * - "hybrid": Stored in the local filesystem and the Intlayer CMS.
         * - "plugin" (or any custom string): Provided by a plugin or a custom source.
         * Default: "local"
         */
        location: "local",

        /**
         * Whether to automatically transform content (e.g., Markdown to HTML).
         * Default: false
         */
        contentAutoTransformation: false,
    },

    /**
     * Routing and middleware configuration.
     */
    routing: {
        /**
         * Locale routing strategy.
         * - "prefix-no-default": Prefix all except the default locale (e.g., /dashboard, /fr/dashboard).
         * - "prefix-all": Prefix all locales (e.g., /en/dashboard, /fr/dashboard).
         * - "no-prefix": No locale in the URL.
         * - "search-params": Use ?locale=...
         * Default: "prefix-no-default"
         */
        mode: "prefix-all",

        /**
         * Where to store the user's selected locale.
         * Options: 'cookie', 'localStorage', 'sessionStorage', 'header', or an array of these.
         * Default: ['cookie', 'header']
         */
        storage: "cookie",

        /**
         * Base path for the application URLs.
         * Default: ""
         */
        basePath: "",

        /**
         * Custom URL rewriting rules for locale-specific paths.
         */
        rewrite: {
            "/about": {
                en: "/about",
                fr: "/a-propos",
            },
        },
    },

    /**
     * Settings for finding and processing content files.
     */
    content: {
        /**
         * File extensions to scan for dictionaries.
         * Default: ['.content.ts', '.content.js', '.content.json', etc.]
         */
        fileExtensions: [".content.ts", ".content.js", ".content.json"],

        /**
         * Directories where .content files are located.
         * Default: ["."]
         */
        contentDir: ["src"],

        /**
         * Directories where source code is located.
         * Used for build optimization and code transformation.
         * Default: ["."]
         */
        codeDir: ["src"],

        /**
         * Patterns to exclude from scanning.
         * Default: ['node_modules', '.intlayer', etc.]
         */
        excludedPath: ["node_modules"],

        /**
         * Whether to watch for changes and rebuild dictionaries in development.
         * Default: true in development
         */
        watch: true,

        /**
         * Command to format newly created / updated .content files.
         */
        formatCommand: 'npx prettier --write "{{file}}"',
    },

    /**
     * Visual Editor configuration.
     */
    editor: {
        /**
         * Whether the visual editor is enabled.
         * Default: true
         */
        enabled: true,

        /**
         * URL of your application for origin validation.
         * Default: "*"
         */
        applicationURL: "http://localhost:4321",

        /**
         * Port for the local editor server.
         * Default: 8000
         */
        port: 8000,

        /**
         * Public URL for the editor.
         * Default: "http://localhost:8000"
         */
        editorURL: "http://localhost:8000",

        /**
         * Intlayer CMS URL.
         * Default: "https://app.intlayer.org"
         */
        cmsURL: "https://app.intlayer.org",

        /**
         * Backend API URL.
         * Default: "https://back.intlayer.org"
         */
        backendURL: "https://back.intlayer.org",

        /**
         * Whether to enable real-time content synchronization.
         * Default: false
         */
        liveSync: true,
    },

    /**
     * AI-powered translation and generation settings.
     */
    ai: {
        /**
         * AI provider to use.
         * Options: 'openai', 'anthropic', 'mistral', 'deepseek', 'gemini', 'ollama'
         * Default: 'openai'
         */
        provider: "gemini",

        /**
         * Model to use from the selected provider.
         */
        model: "gemini-3-flash-preview",

        /**
         * Provider API key.
         */
        apiKey: process.env.GEMINI_API_KEY,

        /**
         * Global context to guide the AI in generating translations.
         */
        applicationContext: "This is a travel booking application.",

        /**
         * Base URL for the AI API.
         */
        baseURL: "https://generativelanguage.googleapis.com",

        /**
         * Data serialization
         *
         * Options:
         * - "json": Standard, reliable; uses more tokens.
         * - "toon": Fewer tokens, less consistent than JSON.
         *
         * Default: "json"
         */
        dataSerialization: "json",
    },

    /**
     * Build and optimization settings.
     */
    build: {
        /**
         * Build execution mode.
         * - "auto": Automatic build during app build.
         * - "manual": Requires explicit build command.
         * Default: "auto"
         */
        mode: "auto",

        /**
         * Whether to optimize the final bundle by pruning unused dictionaries.
         * Default: true in production
         */
        optimize: true,

        /**
         * Output format for generated dictionary files.
         * Default: ['esm', 'cjs']
         */
        outputFormat: ["esm"],
    },

    /**
     * Logger configuration.
     */
    log: {
        /**
         * Logging level.
         * - "default": Standard logging.
         * - "verbose": Detailed debug logging.
         * - "disabled": No logging.
         * Default: "default"
         */
        mode: "default",

        /**
         * Prefix for all log messages.
         * Default: "[intlayer]"
         */
        prefix: "[intlayer]",
    },

    /**
     * System configuration (Advanced use cases)
     */
    system: {
        /**
         * Directory for storing localization dictionaries.
         */
        dictionariesDir: ".intlayer/dictionary",

        /**
         * Directory for module augmentation.
         */
        moduleAugmentationDir: ".intlayer/types",

        /**
         * Directory for storing unmerged dictionaries.
         */
        unmergedDictionariesDir: ".intlayer/unmerged_dictionary",

        /**
         * Directory for storing dictionary types.
         */
        typesDir: ".intlayer/types",

        /**
         * Directory where main application files are stored.
         */
        mainDir: ".intlayer/main",

        /**
         * Directory where the configuration files are stored.
         */
        configDir: ".intlayer/config",

        /**
         * Directory where the cache files are stored.
         */
        cacheDir: ".intlayer/cache",
    },

    /**
     * Compiler configuration (Advanced use cases)
     */
    compiler: {
        /**
         * Indicates if the compiler should be enabled.
         */
        enabled: true,

        /**
         * Pattern to traverse the code to optimize.
         */
        transformPattern: ["**/*.{js,ts,mjs,cjs,jsx,tsx}", "!**/node_modules/**"],

        /**
         * Pattern to exclude from the optimization.
         */
        excludePattern: ["**/node_modules/**"],

        /**
         * Output directory for the optimized dictionaries.
         */
        outputDir: "compiler",
    },

    /**
     * Custom schemas to validate the dictionaries content.
     */
    schemas: {
        "my-schema": z.object({
            title: z.string(),
        }),
    },

    /**
     * Plugins configuration.
     */
    plugins: [],
};

export default config;