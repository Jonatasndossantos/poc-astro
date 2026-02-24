import { ui, defaultLang, showDefaultLang } from './ui';

export function getLangFromUrl(url: URL) {
    const [, lang] = url.pathname.split('/');
    if (lang in ui) return lang as keyof typeof ui;
    return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
    return function t(key: keyof typeof ui[typeof defaultLang]) {
        return ui[lang][key] || ui[defaultLang][key];
    }
}

export function useTranslatedPath(lang: keyof typeof ui) {
    return function translatePath(path: string, l: string = lang) {
        return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
    }
}


// Note: getRelativeLocaleUrl(locale, path)
// If path is already relative or absolute, we might need to be careful.
// Ideally usage: getRelativeLocaleUrl("pt", "about") -> /pt/about
// If current path is /en/about, we want /pt/about.
// Astro.url.pathname includes the locale if it's in the URL.
// We need to strip current locale from pathname before passing to getRelativeLocaleUrl, OR just pass the clean path.
// A simple regex to strip locale prefix might be safest if we aren't using named routes.
export function getPathWithoutLocale(pathname: string) {
    const localePattern = /^\/(?:en|pt|fr|es|zh|ja|en-GB)(?:\/|$)/;
    const stripped = pathname.replace(localePattern, "/");
    return stripped === "" ? "/" : stripped;
}