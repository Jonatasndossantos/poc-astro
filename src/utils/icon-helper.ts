import fs from 'node:fs';
import path from 'node:path';

/**
 * Utility to handle robust icon resolution and normalization for technology icons.
 * Handles common tech aliases, case sensitivity, and falls back gracefully between
 * different icon sets (simple-icons, logos, lucide).
 */

const COMMON_ALIASES: Record<string, string> = {
    "azure": "microsoftazure",
    "c#": "csharp",
    "c++": "cplusplus",
    "nodejs": "nodedotjs",
    "node.js": "nodedotjs",
    "next.js": "nextdotjs",
    "nextjs": "nextdotjs",
    "vue.js": "vuedotjs",
    "vuejs": "vuedotjs",
    "reactjs": "react",
    "tailwind": "tailwindcss",
    "sass": "sass",
    "postgres": "postgresql",
    "postgresql": "postgresql",
    "mysql": "mysql",
    "mongodb": "mongodb",
    "express": "express",
    "nestjs": "nestjs",
    "dotenv": "dotenv",
    "laravel": "laravel",
    "symfony": "symfony",
    "google-cloud": "googlecloud",
    "gcp": "googlecloud",
    "aws": "amazonaws",
    // AI Aliases
    "gemini": "googlegemini",
    "chatgpt": "openai",
    "claude": "anthropic",
};

/**
 * Cache for icon set keys to avoid re-reading large JSON files
 */
const iconSetsCache: Record<string, Set<string>> = {};

/**
 * Lazily loads icon keys from an @iconify-json package
 */
function getIconSet(packageName: string): Set<string> | null {
    if (iconSetsCache[packageName]) return iconSetsCache[packageName];

    try {
        // Resolve path to the icons.json file in node_modules
        // We look for the package in common locations
        const pathsToTry = [
            path.join(process.cwd(), 'node_modules', `@iconify-json`, packageName, 'icons.json'),
            path.join(process.cwd(), '..', '..', 'node_modules', `@iconify-json`, packageName, 'icons.json'),
        ];

        let filePath = '';
        for (const p of pathsToTry) {
            if (fs.existsSync(p)) {
                filePath = p;
                break;
            }
        }

        if (!filePath) return null;

        const content = fs.readFileSync(filePath, 'utf8');
        const data = JSON.parse(content);
        const keys = new Set(Object.keys(data.icons || {}));
        iconSetsCache[packageName] = keys;
        return keys;
    } catch (e) {
        console.warn(`[icon-helper] Failed to load icon set: ${packageName}`, e);
        return null;
    }
}

/**
 * Maps a category to a default Lucide icon fallback
 */
export const getFallbackIcon = (category: string) => {
    switch (category?.toLowerCase()) {
        case "language":
            return "lucide:cpu";
        case "framework":
            return "lucide:globe";
        case "tool":
            return "lucide:terminal";
        case "cloud":
            return "lucide:cloud";
        case "data":
            return "lucide:database";
        case "ai":
            return "lucide:bot";
        default:
            return "lucide:cpu";
    }
};

interface IconProps {
    icon?: string;
    id: string;
    title: string;
    category: string;
}

/**
 * Returns a safe icon name with the appropriate library prefix.
 * Tries simple-icons first, then logos, then lucide.
 */
export const getSafeIcon = ({ icon, id, title, category }: IconProps): string => {
    // 1. If an explicit prefix is provided, trust it
    if (icon && icon.includes(":")) {
        return icon;
    }

    // 2. Determine base name to search for (icon field -> id -> title)
    let rawName = (icon || id || title || "").toLowerCase();
    rawName = rawName.replace(/\s+/g, "").replace(/\.js$/, "").replace(/\.ts$/, "");

    // 3. Apply known aliases
    const normalizedName = COMMON_ALIASES[rawName] || rawName;

    // 4. Try Simple Icons
    const simpleIcons = getIconSet('simple-icons');
    if (simpleIcons?.has(normalizedName)) {
        return `simple-icons:${normalizedName}`;
    }

    // 5. Try Logos
    const logos = getIconSet('logos');
    if (logos?.has(normalizedName)) {
        return `logos:${normalizedName}`;
    }

    // 6. Try Lucide (as a last resort for specific tech names)
    const lucide = getIconSet('lucide');
    if (lucide?.has(normalizedName)) {
        return `lucide:${normalizedName}`;
    }

    // 7. Ultimate Fallback
    return getFallbackIcon(category);
};

/**
 * Returns a CDN URL for the resolved icon.
 * Useful for client-side rendering (e.g. D3/SVG image tags).
 */
export const getIconUrl = (resolvedIcon: string): string | undefined => {
    if (!resolvedIcon) return undefined;

    const [set, name] = resolvedIcon.split(':');

    // Use Iconify API for all sets as it's more reliable for colorized SVGs
    // simpleicons.org CDN sometimes 404s on colorized requests (e.g. openai)
    return `https://api.iconify.design/${set}/${name}.svg?color=white`;
};
