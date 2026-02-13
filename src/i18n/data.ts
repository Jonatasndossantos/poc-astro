
import { Mode, type Language } from '../types';
import profileData from '../../.intlayer/dictionary/profile.json';

// Type definition based on Intlayer's output structure
interface IntlayerDictionary<T> {
    key: string;
    content: {
        nodeType: string;
        translation: {
            [key in Language]?: T;
        };
    };
    localIds: string[];
}

interface ProfileContent {
    bio: Record<Mode, string>;
    role: Record<Mode, string>;
    greeting: string;
    role_fallback: string;
    exploreWork: string;
    scroll: string;
}

// Cast the JSON to the typed interface
const profileDictionary = profileData as unknown as IntlayerDictionary<ProfileContent>;

export function getProfileData(locale: string = 'en') {
    // Fallback to 'en' if locale not found, or use the requested locale
    const content = profileDictionary.content.translation[locale as Language] || profileDictionary.content.translation['en'];

    if (!content) {
        console.warn(`Profile content not found for locale: ${locale}. Falling back to EN.`);
        return profileDictionary.content.translation['en']!;
    }

    return content;
}
