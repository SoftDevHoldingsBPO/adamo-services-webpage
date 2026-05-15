"use client";

import { VideoDemoDialog } from "@/features/my-services/components/video-demo-dialog";
import { ArrowRight, Calendar } from "lucide-react";

import React, { ComponentType } from "react";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { getPolicyByLocale } from "@/lib/get-policy-by-locale";
import { cn } from "@/lib/utils";

import { AdamoCheckIcon } from "@/components/icon/AdamoCheckIcon";
import { AdamoIDIcon } from "@/components/icon/AdamoIdIcon";
import { AdamoPayIcon } from "@/components/icon/AdamoPayIcon";
import { AdamoRiskIcon } from "@/components/icon/AdamoRiskIcon";
import { AdamoSignIcon } from "@/components/icon/AdamoSignIcon";
import { CrownIcon } from "@/components/icon/CrownIcon";
import { Button } from "@/components/ui/button";

export function Services() {
  const locale = useLocale();
  const t = useTranslations("my-services");

  const services: {
    id: "adamo-id" | "adamo-pay" | "adamo-risk" | "adamo-sign" | "adamo-check";
    name: string;
    description: string;
    plan: string;
    subscriptionUntil: string;
    isHired: boolean;
    icon: ComponentType;
    color: string;
    href: string;
  }[] = [
    {
      id: "adamo-id",
      name: "Adamo ID",
      description: t("services.adamo-id.description"),
      plan: "Starter Plan",
      subscriptionUntil: "2023-12-31",
      isHired: true,
      icon: AdamoIDIcon,
      color: "bg-adamo-id-700",
      href: process.env.NEXT_PUBLIC_ADAMO_ID_URL || "#",
    },
    {
      id: "adamo-pay",
      name: "Adamo Pay",
      description: t("services.adamo-pay.description"),
      plan: "Professional Plan",
      subscriptionUntil: "2023-12-31",
      isHired: false,
      icon: AdamoPayIcon,
      color: "bg-adamo-pay-700",
      href: process.env.NEXT_PUBLIC_ADAMO_PAY_URL || "#",
    },
    {
      id: "adamo-risk",
      name: "Adamo Risk",
      description: t("services.adamo-risk.description"),
      plan: "Starter Plan",
      subscriptionUntil: "2023-12-31",
      isHired: false,
      icon: AdamoRiskIcon,
      color: "bg-adamo-risk-700",
      href: process.env.NEXT_PUBLIC_ADAMO_RISK_URL || "#",
    },
    {
      id: "adamo-sign",
      name: "Adamo Sign",
      description: t("services.adamo-sign.description"),
      plan: "Starter Plan",
      subscriptionUntil: "2023-12-31",
      isHired: true,
      icon: AdamoSignIcon,
      color: "bg-adamo-sign-700",
      href: process.env.NEXT_PUBLIC_ADAMO_SIGN_URL || "#",
    },
    {
      id: "adamo-check",
      name: "Adamo Check",
      description: t("services.adamo-check.description"),
      plan: "Starter Plan",
      subscriptionUntil: "2023-12-31",
      isHired: true,
      icon: AdamoCheckIcon,
      color: "bg-adamo-check-700",
      href: process.env.NEXT_PUBLIC_ADAMO_CHECK_URL || "#",
    },
  ];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
      {[...services]
        .sort((a, b) => Number(b.isHired) - Number(a.isHired))
        .map((service) => (
          <ServiceCard key={service.name} {...service} />
        ))}
      <div className="xl:row-start-1 xl:col-start-5 xl:col-span-2 text-sm p-8">
        <p className="text-left mb-8 text-neutral-500">{t("links.title")}</p>
        <ul className="flex flex-col items-start gap-6 font-medium">
          <li>
            <Link href="/about">{t("links.about")}</Link>
          </li>
          <li>
            <Link href={getPolicyByLocale(locale)}>{t("links.privacy")}</Link>
          </li>
          <li>
            <Link href="/profile">{t("links.profile")}</Link>
          </li>
        </ul>
      </div>
    </ul>
  );
}

type ServiceCardProps = {
  id: "adamo-id" | "adamo-pay" | "adamo-risk" | "adamo-sign" | "adamo-check";
  name: string;
  plan: string;
  description: string;
  subscriptionUntil: string;
  isHired: boolean;
  icon: ComponentType;
  color: string;
  href: string;
};

function ServiceCard({
  id,
  name,
  plan,
  description,
  subscriptionUntil,
  isHired,
  icon,
  color,
  href,
}: ServiceCardProps) {
  const t = useTranslations("my-services");

  const Icon = icon;

  return (
    <article
      className={cn(
        "flex flex-col xl:nth-1:col-span-2 xl:nth-2:col-span-2 xl:nth-3:col-span-2 xl:nth-4:col-span-2 xl:nth-5:col-span-2 border-8 border-white/20 rounded-4xl",
      )}
    >
      <header
        className={cn(
          "flex gap-8 items-center rounded-t-3xl p-8",
          isHired ? color : "bg-neutral-300",
        )}
      >
        <Icon />
        <div
          className={cn(
            "flex items-center gap-2 p-4 rounded-4xl",
            isHired ? "bg-white/20" : "bg-white/50",
          )}
        >
          <p
            className={cn("font-semibold text-sm", {
              "text-white": isHired,
              "text-neutral-400": !isHired,
            })}
          >
            {isHired ? t("card.acquired") : t("card.notAcquired")}
          </p>
        </div>
      </header>
      <div className="flex flex-col rounded-b-3xl bg-white p-8 grow">
        <p
          className={cn("text-left text-neutral-900 font-semibold mb-4", {
            "text-neutral-400": !isHired,
          })}
        >
          {name}
        </p>
        <div className="flex items-center gap-2 text-neutral-500 mb-6">
          {isHired && <Calendar />}
          <p
            className={cn("text-sm", {
              "text-neutral-400": !isHired,
            })}
          >
            {/* {isHired
              ? `${t("card.subscriptionUntil")} ${subscriptionUntil}`
              : description} */}
            {description}
          </p>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          {isHired && (
            <Button size="md" asChild>
              <Link href={href}>
                {t("card.enter")}
                <ArrowRight />
              </Link>
            </Button>
          )}
          {!isHired && (
            <Button size="md" asChild>
              <Link href={`/contact?product=${id}`}>
                {t("card.hireService")}
                <ArrowRight />
              </Link>
            </Button>
          )}
          <VideoDemoDialog product={id} />
        </div>
      </div>
    </article>
  );
}
