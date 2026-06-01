"use client";

import {
  PAY_RESTRICTED_COUNTRIES,
  PRODUCT_FIELDS,
  ProductId,
  TERM_ID,
} from "@/features/register/constants/products.constants";
import { useRegister } from "@/features/register/contexts/register.context";
import type { PlanFeature } from "@/features/register/services/register.service";
import RegisterService from "@/features/register/services/register.service";
import { buildProductInterests } from "@/features/register/utils/products.utils";
import { ToastManager } from "@adamosuiteservices/ui/toaster";

import { useEffect, useState } from "react";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";

export function useProductsForm() {
  const t = useTranslations("register-page.products");
  const locale = useLocale();
  const { setCurrentStep, registrationEmail, personalInfoValues } =
    useRegister();

  const isPayRestricted = PAY_RESTRICTED_COUNTRIES.has(
    personalInfoValues.country ?? "",
  );

  const [selectedProducts, setSelectedProducts] = useState<Set<ProductId>>(
    new Set(),
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [freemiumBadges, setFreemiumBadges] = useState<
    Partial<Record<ProductId, number>>
  >({});

  useEffect(() => {
    const PRODUCT_ID_MAP: Record<string, ProductId> = {
      adamo_id: "adamo-id",
      adamo_sign: "adamo-sign",
      adamo_risk: "adamo-risk",
      adamo_check: "adamo-check",
    };

    const fetchFreemiumPlan = async () => {
      try {
        const { features } = await RegisterService.getFreemiumPlan();
        const badges: Partial<Record<ProductId, number>> = {};
        features.forEach((feature: PlanFeature) => {
          const productId = PRODUCT_ID_MAP[feature.product];
          if (productId && !feature.requiresContact) {
            badges[productId] = feature.limit;
          }
        });
        setFreemiumBadges(badges);
      } catch (error) {
        console.error("Error fetching freemium plan:", error);
      }
    };

    fetchFreemiumPlan();
  }, []);

  const setField = (key: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const toggleProduct = (id: ProductId) => {
    const isCurrentlySelected = selectedProducts.has(id);
    setSelectedProducts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    if (isCurrentlySelected) {
      const keys = PRODUCT_FIELDS[id];
      setFieldValues((prev) => {
        const next = { ...prev };
        keys.forEach((key) => delete next[key]);
        return next;
      });
      setFieldErrors((prev) => {
        const next = { ...prev };
        keys.forEach((key) => delete next[key]);
        return next;
      });
    }
  };

  const handleSubmit = async () => {
    const newErrors: Record<string, boolean> = {};
    for (const id of selectedProducts) {
      for (const key of PRODUCT_FIELDS[id]) {
        if (!fieldValues[key]) {
          newErrors[key] = true;
        }
      }
    }
    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    console.log({
      email: registrationEmail,
      productInterests: buildProductInterests(
        selectedProducts,
        fieldValues,
        personalInfoValues.country ?? "",
      ),
      acceptedTerms: {
        termId: TERM_ID,
        updatedAt: new Date().toISOString(),
      },
    });

    setIsLoading(true);
    try {
      await RegisterService.completeRegistration({
        email: registrationEmail,
        productInterests: buildProductInterests(
          selectedProducts,
          fieldValues,
          personalInfoValues.country ?? "",
        ),
        acceptedTerms: {
          termId: TERM_ID,
          updatedAt: new Date().toISOString(),
        },
      });
      setCurrentStep("success");
    } catch {
      ToastManager.show({
        variant: "destructive",
        message: t("apiErrors.serverError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentStep("personal-information");
  };

  const isSubmitEnabled =
    selectedProducts.size > 0 && termsAccepted && !isLoading;

  return {
    t,
    locale,
    selectedProducts,
    termsAccepted,
    setTermsAccepted,
    fieldValues,
    fieldErrors,
    isLoading,
    isSubmitEnabled,
    isPayRestricted,
    freemiumBadges,
    setField,
    toggleProduct,
    handleSubmit,
    handleCancel,
  };
}
