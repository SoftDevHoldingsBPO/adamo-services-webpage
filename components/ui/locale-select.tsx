"use client";

import { locales } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";

import { useState, useTransition } from "react";

import { Locale, useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { CheckIcon, LangIcon, SpinnerIcon } from "../icon";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const items: Array<Record<Locale, string[]>> = [
  {
    es: ["Español (ES)", "Lenguaje (Español ES)"],
    en: ["English (EN)", "Language (English EN)"],
  },
];

type LangSelectProps = {
  langText?: boolean;
};

const LocaleSelect = ({ langText = false }: LangSelectProps) => {
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (locale: string) => {
    if (locale === "es" || locale === "en") {
      startTransition(() => {
        setUserLocale(locale);
        setIsOpen(false);
      });
    }
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="md"
          variant="link"
          className="gap-x-4 font-medium"
          disabled={isPending}
        >
          <LangIcon />
          {items.find((item) => item[locale])?.[locale][langText ? 1 : 0]}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]" align="start">
        <ul className="divide-y">
          {locales.map((lang) => (
            <li key={lang}>
              <button
                type="button"
                disabled={lang === locale}
                onClick={() => handleSelect(lang)}
                className={cn(
                  "py-3 px-5 flex items-center justify-between w-full text-left transition-colors hover:bg-neutral-50",
                  lang === locale && "pointer-events-none",
                )}
              >
                {items.find((item) => item[lang])?.[lang][0]}

                {isPending && lang !== locale && (
                  <SpinnerIcon className="text-neutral-600" />
                )}

                {!isPending && lang === locale && (
                  <CheckIcon className="text-neutral-600" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};

export default LocaleSelect;
