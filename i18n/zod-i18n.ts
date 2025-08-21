import { defaultLocale } from "@/i18n/config";
import i18next from "i18next";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

import enCustomTranslation from "../messages/zod-en-custom.json";
import enTranslation from "../messages/zod-en.json";
import esCustomTranslation from "../messages/zod-es-custom.json";
import esTranslation from "../messages/zod-es.json";

// Initialize i18next for zod with both languages
i18next.init({
  lng: defaultLocale, // Default language
  resources: {
    es: { zod: esTranslation, custom: esCustomTranslation },
    en: { zod: enTranslation, custom: enCustomTranslation },
  },
});

// Set the error map for zod
z.setErrorMap(makeZodI18nMap({ ns: ["zod", "custom"] }));

// Function to change zod language dynamically
export const setZodLanguage = (locale: "es" | "en") => {
  i18next.changeLanguage(locale);
};
