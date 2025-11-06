import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";
import { defaultLanguage, languages, type Language } from "./i18n-config";

const initI18next = async (lng: Language, ns = ["common"]) => {
  const instance = createInstance();
  await instance
    .use(initReactI18next)
    .use(resourcesToBackend((language: string, namespace: string) => import(`../locales/${language}/${namespace}.json`)))
    .init({
      lng,
      fallbackLng: defaultLanguage,
      supportedLngs: languages,
      ns,
      defaultNS: "common",
      interpolation: { escapeValue: false }
    });
  return instance;
};

export const getFixedT = async (lng: Language, ns?: string | string[]) => {
  const instance = await initI18next(lng as Language, Array.isArray(ns) ? ns : ns ? [ns] : undefined);
  return instance.getFixedT(lng, Array.isArray(ns) ? ns[0] : ns);
};

export const createBrowserI18n = (lng: Language, resources: Record<string, any>) => {
  const instance = createInstance();

  instance.use(initReactI18next).init({
    lng,
    fallbackLng: defaultLanguage,
    supportedLngs: languages,
    defaultNS: "common",
    ns: Object.keys(resources),
    resources: {
      [lng]: resources,
    },
    interpolation: { escapeValue: false },
    initImmediate: false,
  });

  return instance;
};
