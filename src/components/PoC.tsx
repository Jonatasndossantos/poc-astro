import { useTranslations } from "../i18n/utils";
import { ui } from "../i18n/ui";

export default function PoC({ locale }: { locale: string }) {
    const t = useTranslations(locale as keyof typeof ui);



    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Tradução automatica por IA com intlayer
                </h1>
                <h1>{t('poc.title')}</h1>
                <p>{t('poc.description')}</p>
            </div>
        </div>
    );
}