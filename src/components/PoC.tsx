import { useTranslations } from "../i18n/utils";
import { ui } from "../i18n/ui";

export default function PoC({ locale }: { locale: string }) {
    const t = useTranslations(locale as keyof typeof ui);

    const content = {
        title: t("poc.title"),
        description: t("poc.description"),
    };

    return (
        <div>
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">
                    Tradução automatica por IA com intlayer
                </h1>
                <h1>{content.title}</h1>
                <p>{content.description}</p>
            </div>
        </div>
    );
}