"use client";

import { Button } from "@/components/ui/button";
import { inViewAnimation } from "@/lib/animations";
import { useAnimation } from "@/providers/AnimationProvider";
import { useNavigation } from "@/providers/NavigationProvider";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PlanComparisonDialog } from "./components/PlanComparisonDialog";
import { PricingCard } from "./components/PricingCard";
import { plans } from "./constants/plans";
import { SignUpDialog } from "@/features/auth/components/sign-up/sign-up-dialog";

export default function PlanesPage() {
  const t = useTranslations("planes");
  const { isOpen } = useNavigation();
  const { isPreloaderDone } = useAnimation();
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

  useEffect(() => {
    if (isPreloaderDone && !isOpen) {
      inViewAnimation();
    }
  }, [isPreloaderDone, isOpen]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white py-20 md:py-28">
        <div className="container">
          <div
            className="mx-auto max-w-3xl text-center"
            data-inview
            data-inview-delay={0}
          >
            <h1 className="heading-1 mb-6">{t("hero.title")}</h1>
            <p className="text-lg text-neutral-600 md:text-xl">
              {t("hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const planTranslations = {
              name: t(`plans.${plan.translationKey}.name`),
              price: t(`plans.${plan.translationKey}.price`),
              period: t(`plans.${plan.translationKey}.period`),
              description: t(`plans.${plan.translationKey}.description`),
              badge: plan.recommended
                ? t(`plans.${plan.translationKey}.badge`)
                : undefined,
              cta: t(`plans.${plan.translationKey}.cta`),
              features: Array.from(
                { length: 12 },
                (_, i) =>
                  t.raw(`plans.${plan.translationKey}.features`)?.[i] || null,
              ).filter(Boolean) as string[],
              limitations: Array.from(
                { length: 5 },
                (_, i) =>
                  t.raw(`plans.${plan.translationKey}.limitations`)?.[i] ||
                  null,
              ).filter(Boolean) as string[],
            };

            return (
              <PricingCard
                key={plan.id}
                plan={plan}
                isRecommended={plan.recommended}
                translations={planTranslations}
                delay={0.1 + index * 0.1}
                onCTAClick={
                  plan.id === "free"
                    ? () => {
                        console.log("Opening SignUp Dialog");
                        setIsSignUpDialogOpen(true);
                      }
                    : undefined
                }
              />
            );
          })}
        </div>
      </section>

      {/* Comparison Dialog Section */}
      <section className="container pb-16 md:pb-24">
        <div className="flex justify-center" data-inview data-inview-delay={0.4}>
          <PlanComparisonDialog
            translations={{
              buttonText: t("comparison.buttonText"),
              dialogTitle: t("comparison.dialogTitle"),
              dialogDescription: t("comparison.dialogDescription"),
              table: {
                feature: t("comparison.table.feature"),
                features: {
                  pricing: t("comparison.table.features.pricing"),
                  initialCredit: t("comparison.table.features.initialCredit"),
                  adamoSign: t("comparison.table.features.adamoSign"),
                  adamoId: t("comparison.table.features.adamoId"),
                  adamoPay: t("comparison.table.features.adamoPay"),
                  biometricVerification: t(
                    "comparison.table.features.biometricVerification",
                  ),
                  documentValidation: t(
                    "comparison.table.features.documentValidation",
                  ),
                  electronicSignature: t(
                    "comparison.table.features.electronicSignature",
                  ),
                  paymentProcessing: t(
                    "comparison.table.features.paymentProcessing",
                  ),
                  currencyExchange: t(
                    "comparison.table.features.currencyExchange",
                  ),
                  api: t("comparison.table.features.api"),
                  subaccounts: t("comparison.table.features.subaccounts"),
                  userManagement: t("comparison.table.features.userManagement"),
                  customPermissions: t(
                    "comparison.table.features.customPermissions",
                  ),
                  support: t("comparison.table.features.support"),
                  sla: t("comparison.table.features.sla"),
                  analytics: t("comparison.table.features.analytics"),
                  customIntegrations: t(
                    "comparison.table.features.customIntegrations",
                  ),
                  compliance: t("comparison.table.features.compliance"),
                  onboarding: t("comparison.table.features.onboarding"),
                },
                values: {
                  basic: t("comparison.table.values.basic"),
                  advanced: t("comparison.table.values.advanced"),
                  full: t("comparison.table.values.full"),
                  limited: t("comparison.table.values.limited"),
                  email: t("comparison.table.values.email"),
                  priority: t("comparison.table.values.priority"),
                  dedicated: t("comparison.table.values.dedicated"),
                  yes: t("comparison.table.values.yes"),
                  no: t("comparison.table.values.no"),
                  upTo3: t("comparison.table.values.upTo3"),
                  included: t("comparison.table.values.included"),
                  notIncluded: t("comparison.table.values.notIncluded"),
                },
              },
              plans: {
                free: {
                  name: t("plans.free.name"),
                  price: t("plans.free.price"),
                },
                pro: {
                  name: t("plans.pro.name"),
                  price: t("plans.pro.price"),
                },
                enterprise: {
                  name: t("plans.enterprise.name"),
                  price: t("plans.enterprise.price"),
                },
              },
            }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-neutral-100 py-16 md:py-20">
        <div className="container">
          <div
            className="mx-auto max-w-2xl text-center"
            data-inview
            data-inview-delay={0.2}
          >
            <h2 className="heading-2 mb-4">{t("cta.title")}</h2>
            <p className="mb-8 text-lg text-neutral-600">{t("cta.description")}</p>
            <Button asChild size="lg">
              <Link href="/contact">{t("cta.button")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <SignUpDialog
        open={isSignUpDialogOpen}
        onOpenChange={setIsSignUpDialogOpen}
      />
    </>
  );
}
