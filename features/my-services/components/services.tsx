"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";
import { VideoDemoDialog } from "@/features/my-services/components/video-demo-dialog";
import { isProductAllowed } from "@/features/my-services/utils/product-slugs";
import { useAuth } from "@/features/auth/contexts/auth.context";
import { ArrowRight, Calendar } from "lucide-react";

import React, { ComponentType, useMemo } from "react";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { getPolicyByLocale } from "@/lib/get-policy-by-locale";
import { cn } from "@/lib/utils";

import { AdamoCheckIcon } from "@/components/icon/AdamoCheckIcon";
import { AdamoIDIcon } from "@/components/icon/AdamoIdIcon";
import { AdamoPayIcon } from "@/components/icon/AdamoPayIcon";
import { AdamoRiskIcon } from "@/components/icon/AdamoRiskIcon";
import { AdamoSignIcon } from "@/components/icon/AdamoSignIcon";
import { Button } from "@/components/ui/button";

type ServiceId =
  | "adamo-id"
  | "adamo-pay"
  | "adamo-risk"
  | "adamo-sign"
  | "adamo-check";

export function Services() {
  const locale = useLocale();

  const t = useTranslations("my-services");
  const { user } = useAuth();

  const allowedProducts = user?.allowedProducts ?? [];

  const { user } = useAuth();

  const activePlanName =
    user?.organizationSubscriptions?.find(
      (subscription) => subscription.status === "active",
    )?.planName ?? null;

  const services: {
    id: ServiceId;
    name: string;
    description: string;
<<<<<<< Updated upstream
    plan: string | null;
    subscriptionUntil: string;
=======
>>>>>>> Stashed changes
    isHired: boolean;
    icon: ComponentType;
    color: string;
    href: string;
<<<<<<< Updated upstream
  }[] = [
    {
      id: "adamo-id",
      name: "Adamo ID",
      description: t("services.adamo-id.description"),
      plan: activePlanName,
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
      plan: null,
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
      plan: null,
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
      plan: activePlanName,
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
      plan: activePlanName,
      subscriptionUntil: "2023-12-31",
      isHired: true,
      icon: AdamoCheckIcon,
      color: "bg-adamo-check-700",
      href: process.env.NEXT_PUBLIC_ADAMO_CHECK_URL || "#",
    },
  ];
=======
  }[] = useMemo(
    () => [
      {
        id: "adamo-id",
        name: "Adamo ID",
        description: t("services.adamo-id.description"),
        isHired: isProductAllowed(allowedProducts, "adamo-id"),
        icon: AdamoIDIcon,
        color: "bg-adamo-id-700",
        href: process.env.NEXT_PUBLIC_ADAMO_ID_URL || "#",
      },
      {
        id: "adamo-pay",
        name: "Adamo Pay",
        description: t("services.adamo-pay.description"),
        isHired: isProductAllowed(allowedProducts, "adamo-pay"),
        icon: AdamoPayIcon,
        color: "bg-adamo-pay-700",
        href: process.env.NEXT_PUBLIC_ADAMO_PAY_URL || "#",
      },
      {
        id: "adamo-risk",
        name: "Adamo Risk",
        description: t("services.adamo-risk.description"),
        isHired: isProductAllowed(allowedProducts, "adamo-risk"),
        icon: AdamoRiskIcon,
        color: "bg-adamo-risk-700",
        href: process.env.NEXT_PUBLIC_ADAMO_RISK_URL || "#",
      },
      {
        id: "adamo-sign",
        name: "Adamo Sign",
        description: t("services.adamo-sign.description"),
        isHired: isProductAllowed(allowedProducts, "adamo-sign"),
        icon: AdamoSignIcon,
        color: "bg-adamo-sign-700",
        href: process.env.NEXT_PUBLIC_ADAMO_SIGN_URL || "#",
      },
      {
        id: "adamo-check",
        name: "Adamo Check",
        description: t("services.adamo-check.description"),
        isHired: isProductAllowed(allowedProducts, "adamo-check"),
        icon: AdamoCheckIcon,
        color: "bg-adamo-check-700",
        href: process.env.NEXT_PUBLIC_ADAMO_CHECK_URL || "#",
      },
    ],
    [allowedProducts, t],
  );
>>>>>>> Stashed changes

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
  id: ServiceId;
  name: string;
<<<<<<< Updated upstream
  plan: string | null;
=======
>>>>>>> Stashed changes
  description: string;
  isHired: boolean;
  icon: ComponentType;
  color: string;
  href: string;
};

function ServiceCard({
  id,
  name,
  description,
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
          {isHired && <CrownIcon className="size-4" />}
          <p
            className={cn("font-semibold text-sm", {
              "text-white": isHired,
              "text-neutral-400": !isHired,
            })}
          >
            {isHired ? (plan ?? t("card.acquired")) : t("card.notAcquired")}
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
