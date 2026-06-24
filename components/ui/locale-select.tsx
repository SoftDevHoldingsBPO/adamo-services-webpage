"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";
import { ProfileService } from "@/features/profile/services/profile.service";
import { locales } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import { FullScreenLoaderManager } from "@adamosuiteservices/ui/full-screen-loader";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { useLenis } from "lenis/react";

import { useState, useTransition } from "react";

import { Locale, useLocale, useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { CheckIcon, LangIcon, SpinnerIcon } from "../icon";
import { Button } from "./button";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const items: Array<Record<Locale, string[]>> = [
  {
    es: ["Lenguaje (Español ES)", "Español (ES)", "(ES)"],
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
  const { status } = useAuth();
  const t = useTranslations("LocaleSelect");

  const handleSelect = (selectedLocale: string) => {
    if (selectedLocale !== "es" && selectedLocale !== "en") return;

    startTransition(() => {
      setUserLocale(selectedLocale);
      setIsOpen(false);
    });

    if (status === "authenticated") {
      const successMsg = t("success");
      const errorMsg = t("error");

      FullScreenLoaderManager.show();

      ProfileService.updateLanguage(selectedLocale)
        .then(() =>
          ToastManager.show({ message: successMsg, variant: "success" }),
        )
        .catch(() =>
          ToastManager.show({ message: errorMsg, variant: "destructive" }),
        )
        .finally(() => FullScreenLoaderManager.hide());
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
      if (isOpen && Math.abs(lenis.velocity) > 5) {
        setIsOpen(false);
      }
    },
    [isOpen],
  );

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen} modal>
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
