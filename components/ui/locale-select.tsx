"use client";

import { locales } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { useLenis } from "lenis/react";

import { useState, useTransition } from "react";

import { Locale, useLocale } from "next-intl";

import { cn } from "@/lib/utils";

import { CheckIcon, LangIcon, SpinnerIcon } from "../icon";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const items: Array<Record<Locale, string[]>> = [
  {
    es: ["Lenguaje (Español ES)", "Español (ES)", "(ES)"],
    en: ["Language (English EN)", "English (EN)", "(EN)"],
  },
];

type LangSelectProps = {
  hasLangText?: boolean;
  align?: "start" | "center" | "end";
  className?: string;
};

const LocaleSelect = ({
  hasLangText = false,
  align = "start",
  className,
}: LangSelectProps) => {
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

  const renderTextContent = () => {
    const textSet = items.find((item) => item[locale])?.[locale];

    if (!textSet) return null;
    if (hasLangText) return textSet[0];

    return (
      <>
        <span className="hidden md:inline">{textSet[1]}</span>
        <span className="inline md:hidden">{textSet[2]}</span>
      </>
    );
  };

  useLenis(
    (lenis) => {
      if (isOpen && Math.abs(lenis.velocity) > 0.1) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className={className}>
        <Button
          size="md"
          variant="link"
          className="gap-x-4 font-medium"
          disabled={isPending}
        >
          <LangIcon />
          {renderTextContent()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px]" align={align}>
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
                {items.find((item) => item[lang])?.[lang][1]}

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
