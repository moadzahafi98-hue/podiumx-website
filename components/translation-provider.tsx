"use client";

import { ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createBrowserI18n } from "@/lib/i18n";
import { Language } from "@/lib/i18n-config";

interface Props {
  locale: Language;
  resources: Record<string, any>;
  children: ReactNode;
}

export function TranslationProvider({ locale, resources, children }: Props) {
  const [instance] = useState(() => createBrowserI18n(locale, resources));

  useEffect(() => {
    Object.entries(resources).forEach(([ns, resource]) => {
      instance.addResourceBundle(locale, ns, resource, true, true);
    });
    instance.changeLanguage(locale);
  }, [instance, locale, resources]);

  return <I18nextProvider i18n={instance}>{children}</I18nextProvider>;
}
