"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { getClientI18n } from "@/lib/i18n";
import { Language } from "@/lib/i18n-config";

interface Props {
  locale: Language;
  resources: Record<string, any>;
  children: ReactNode;
}

export function TranslationProvider({ locale, resources, children }: Props) {
  const [instance, setInstance] = useState<any>(null);

  useEffect(() => {
    getClientI18n(locale).then((i18nInstance) => {
      Object.entries(resources).forEach(([ns, resource]) => {
        if (!i18nInstance.hasResourceBundle(locale, ns)) {
          i18nInstance.addResourceBundle(locale, ns, resource, true, true);
        }
      });
      setInstance(i18nInstance);
    });
  }, [locale, resources]);

  if (!instance) {
    return null;
  }

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
