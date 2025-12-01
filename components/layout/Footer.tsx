"use client";

import { mainLinks } from "@/constants/navigation";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "../icon";
import LocaleSelect from "../ui/locale-select";
import { getPolicyByLocale } from "@/lib/get-policy-by-locale";

const Footer = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const tFooter = useTranslations("footer");

  const [isAdamoIdPage, setIsAdamoIdPage] = useState(false);
  const [isAdamoPayPage, setIsAdamoPayPage] = useState(false);
  const [isAdamoRiskPage, setIsAdamoRiskPage] = useState(false);
  const [isAdamoSignPage, setIsAdamoSignPage] = useState(false);

  useEffect(() => {
    console.log("pathname", pathname);
    if (!pathname) return;
    setIsAdamoIdPage(pathname.includes("adamo-id"));
    setIsAdamoPayPage(pathname.includes("adamo-pay"));
    setIsAdamoRiskPage(pathname.includes("adamo-risk"));
    setIsAdamoSignPage(pathname.includes("adamo-sign"));
  }, [pathname]);

  return (
    <footer className="container py-10 flex flex-col gap-10 md:flex-row md:justify-between">
      <div className="flex flex-col items-start gap-6">
        <Link href="/">
          <Logo className="w-[26.76px] h-6" />
        </Link>

        <p className="text-sm">{tFooter("copyright")}</p>

        <ul className="flex gap-6 flex-wrap">
          {mainLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm transition-colors text-neutral-500 hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            </li>
          ))}
          <li key="personal-data-processing">
            <Link
              href={getPolicyByLocale(locale)}
              target="_blank"
              className="text-sm transition-colors text-neutral-500 hover:text-foreground"
            >
              {tFooter("dataProcessingPolicy")}
            </Link>
          </li>
          <li key="authorization-data-processing">
            <Link
              href={
                locale === "es"
                  ? "/documents/autorizacion-de-tratamiento-de-datos.pdf"
                  : "/documents/authorization-for-the-processing-personal-data-of-adamo.pdf"
              }
              target="_blank"
              className="text-sm transition-colors text-neutral-500 hover:text-foreground"
            >
              {tFooter("authorizationDataProcessingPolicy")}
            </Link>
          </li>
          {isAdamoIdPage && (
            <li key="adamo-id">
              <Link
                href={
                  locale === "es"
                    ? "/documents/terminos-y-condiciones-adamo-id.pdf"
                    : "/documents/terms-and-conditions-adamo-id.pdf"
                }
                target="_blank"
                className="text-sm transition-colors text-neutral-500 hover:text-foreground"
              >
                {tFooter("adamoIdTermsNConditions")}
              </Link>
            </li>
          )}
          {isAdamoPayPage && (
            <li key="adamo-pay">
              <Link
                href={
                  locale === "es"
                    ? "/documents/terminos-y-condiciones-adamo-pay.pdf"
                    : "/documents/terms-and-conditions-adamo-pay.pdf"
                }
                target="_blank"
                className="text-sm transition-colors text-neutral-500 hover:text-foreground"
              >
                {tFooter("adamoPayTermsNConditions")}
              </Link>
            </li>
          )}
          {isAdamoSignPage && (
            <li key="adamo-sign">
              <Link
                href={
                  locale === "es"
                    ? "/documents/terminos-y-condiciones-adamo-sign.pdf"
                    : "/documents/terms-and-conditions-adamo-sign.pdf"
                }
                target="_blank"
                className="text-sm transition-colors text-neutral-500 hover:text-foreground"
              >
                {tFooter("adamoSignTermsNConditions")}
              </Link>
            </li>
          )}
          {isAdamoRiskPage && (
            <li key="adamo-risk">
              <Link
                href={
                  locale === "es"
                    ? "/documents/terminos-y-condiciones-adamo-risk.pdf"
                    : "/documents/terms-and-conditions-adamo-risk.pdf"
                }
                target="_blank"
                className="text-sm transition-colors text-neutral-500 hover:text-foreground"
              >
                {tFooter("adamoRiskTermsNConditions")}
              </Link>
            </li>
          )}
        </ul>
      </div>
      <div>
        <LocaleSelect hasLangText />
      </div>
    </footer>
  );
};

export default Footer;
