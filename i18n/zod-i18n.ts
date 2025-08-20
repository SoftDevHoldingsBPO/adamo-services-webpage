import { defaultLocale } from "@/i18n/config";
import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";

// Import language translation files for zod
import esTranslation from "../messages/zod-es.json";

// Initialize i18next for zod with both languages
i18next.init({
  lng: defaultLocale, // Default language
  resources: {
    es: { zod: esTranslation },
  },
});

// Set the error map for zod
z.setErrorMap(zodI18nMap);

// Function to change zod language dynamically
export const setZodLanguage = (locale: "es" | "en") => {
  i18next.changeLanguage(locale);
};

// Export configured zod instance
export { z };
