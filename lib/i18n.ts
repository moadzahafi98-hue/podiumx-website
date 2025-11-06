import { createInstance, i18n } from "i18next";
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

let clientInstance: i18n | null = null;

export const getClientI18n = async (lng: Language) => {
  if (!clientInstance) {
    clientInstance = await initI18next(lng);
  } else {
    await clientInstance.changeLanguage(lng);
  }
  return clientInstance;
};
