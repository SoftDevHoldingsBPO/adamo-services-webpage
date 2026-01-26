"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plan } from "../constants/plans";
import { PlanFeatureList } from "./PlanFeatureList";

interface PricingCardProps {
  plan: Plan;
  isRecommended: boolean;
  translations: {
    name: string;
    price: string;
    period?: string;
    description: string;
    badge?: string;
    cta: string;
    features: string[];
    limitations?: string[];
  };
  delay?: number;
  onCTAClick?: () => void;
}

const colorSchemes = {
  neutral: {
    border: "border-neutral-300",
    bg: "bg-white",
    badgeBg: "bg-neutral-100",
    badgeText: "text-neutral-700",
  },
  pay: {
    border: "border-adamo-pay-600",
    bg: "bg-adamo-pay-50/30",
    badgeBg: "bg-adamo-pay-600",
    badgeText: "text-white",
  },
  id: {
    border: "border-adamo-id-600",
    bg: "bg-adamo-id-50/30",
    badgeBg: "bg-adamo-id-600",
    badgeText: "text-white",
  },
} as const;

export function PricingCard({
  plan,
  isRecommended,
  translations,
  delay = 0,
  onCTAClick,
}: PricingCardProps) {
  const colors = colorSchemes[plan.colorScheme];

  return (
    <div
      data-inview
      data-inview-delay={delay}
      className={cn(
        "relative flex flex-col rounded-2xl border-2 p-6 md:p-8",
        colors.border,
        colors.bg,
        isRecommended && "shadow-lg scale-105",
      )}
    >
      {/* Badge */}
      {translations.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span
            className={cn(
              "rounded-full px-4 py-1 text-xs font-semibold",
              colors.badgeBg,
              colors.badgeText,
            )}
          >
            {translations.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 text-center">
        <h3 className="heading-2 mb-2">{translations.name}</h3>
        <div className="mb-3 flex items-baseline justify-center gap-1">
          <span className="text-4xl font-bold text-neutral-900">
            {translations.price}
          </span>
          {translations.period && (
            <span className="text-lg text-neutral-600">
              {translations.period}
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-600">{translations.description}</p>
      </div>

      {/* Features */}
      <div className="mb-8 flex-1">
        <PlanFeatureList
          features={translations.features}
          limitations={translations.limitations}
        />
      </div>

      {/* CTA Button */}
      {onCTAClick ? (
        <Button
          className="w-full"
          variant={isRecommended ? "primary" : "secondary"}
          onClick={onCTAClick}
        >
          {translations.cta}
        </Button>
      ) : (
        <Button
          asChild
          className="w-full"
          variant={isRecommended ? "primary" : "secondary"}
        >
          <Link href="/contact">{translations.cta}</Link>
        </Button>
      )}
    </div>
  );
}
