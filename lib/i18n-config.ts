export const languages = ["en", "fr", "ar"] as const;
export type Language = (typeof languages)[number];
export const defaultLanguage: Language = "en";
