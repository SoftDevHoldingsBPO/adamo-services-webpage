"use client";

import { setZodLanguage } from "@/i18n/zod-i18n";

import { ReactNode, useEffect } from "react";

import { useLocale } from "next-intl";

interface ZodI18nProviderProps {
  children: ReactNode;
}

export const ZodI18nProvider = ({ children }: ZodI18nProviderProps) => {
  const locale = useLocale();

  useEffect(() => {
    if (locale === "es" || locale === "en") {
      setZodLanguage(locale);
    }
  }, [locale]);

  return <>{children}</>;
};
