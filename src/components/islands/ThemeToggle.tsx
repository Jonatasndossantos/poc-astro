import { useState, useEffect } from "react";
import { useTranslations } from "../../i18n/utils";
import { ui } from "../../i18n/ui";

interface ThemeToggleProps {
    locale?: string;
}

export default function ThemeToggle({ locale = "en" }: ThemeToggleProps) {
    const t = useTranslations(locale as keyof typeof ui);
    const label = t("theme.label");

    const themeKeys = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk",
        "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe",
        "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee",
        "winter", "dim", "nord", "sunset", "caramellatte", "abyss", "silk"
    ];

    const themesList = themeKeys.map((key) => ({
        name: key,
        label: t(`theme.${key}` as any),
    }));



    const [selectedTheme, setSelectedTheme] = useState<string>("");

    useEffect(() => {
        // Get the current theme from the HTML tag or localStorage
        const currentTheme = document.documentElement.getAttribute("data-theme") || localStorage.getItem("theme") || "light";
        setSelectedTheme(currentTheme);
    }, []);

    const handleThemeChange = (theme: string) => {
        setSelectedTheme(theme);
        // DaisyUI theme-controller handles the actual theme switch on the HTML tag,
        // but we might want to save it to localStorage if DaisyUI doesn't do it automatically in all setups,
        // or just rely on the controller. 
        // Typically the controller just sets value on the DOM.
        // Let's ensure we save preference.
        localStorage.setItem("theme", theme);
    };

    return (
        <div title="Change Theme" className="dropdown dropdown-end block">
            <div
                tabIndex={0}
                role="button"
                className="btn group btn-sm gap-1.5 px-1.5 btn-ghost"
                aria-label="Change Theme"
            >
                <div className="bg-base-100 group-hover:border-base-content/20 border-base-content/10 grid shrink-0 grid-cols-2 gap-0.5 rounded-md border p-1 transition-colors">
                    <div className="bg-base-content size-1 rounded-full"></div>
                    <div className="bg-primary size-1 rounded-full"></div>
                    <div className="bg-secondary size-1 rounded-full"></div>
                    <div className="bg-accent size-1 rounded-full"></div>
                </div>
                <svg
                    width="12px"
                    height="12px"
                    className="mt-px hidden size-2 fill-current opacity-60 sm:inline-block"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 2048 2048"
                >
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <div
                tabIndex={0}
                className="dropdown-content bg-base-200 text-base-content rounded-box top-px max-h-[calc(100vh-10rem)] w-56 overflow-y-auto border-(length:--border) border-white/5 shadow-2xl outline-(length:--border) outline-black/5 mt-16"
            >
                <ul className="menu menu-sm gap-1">
                    <li className="menu-title px-2 py-1 text-xs font-medium opacity-70">
                        {label}
                    </li>
                    {themesList.map((theme) => (
                        <li key={theme.name}>
                            <label className={`justify-start gap-3 px-2 font-normal hover:bg-base-content/10 ${theme.name === selectedTheme ? "!bg-base-content/10" : ""
                                }`}>
                                <input
                                    type="radio"
                                    name="theme-dropdown"
                                    className="theme-controller hidden"
                                    value={theme.name}
                                    onChange={() => handleThemeChange(theme.name)}
                                    checked={theme.name === selectedTheme}
                                />
                                <div
                                    data-theme={theme.name}
                                    className="bg-base-100 grid shrink-0 grid-cols-2 gap-0.5 rounded-md p-0.5 shadow-sm"
                                >
                                    <div className="bg-base-content size-1 rounded-full" />
                                    <div className="bg-primary size-1 rounded-full" />
                                    <div className="bg-secondary size-1 rounded-full" />
                                    <div className="bg-accent size-1 rounded-full" />
                                </div>
                                <div className="w-full truncate text-start">{theme.label}</div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className={`h-3 w-3 shrink-0 opacity-70 ${theme.name === selectedTheme ? "" : "invisible"
                                        }`}
                                >
                                    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
                                </svg>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
