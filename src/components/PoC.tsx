import { getIntlayer } from "intlayer";

import { IntlayerProvider, useIntlayer } from "react-intlayer";

export default function PoC({ locale }: { locale: string }) {
    const content = useIntlayer("poc-component", locale);

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