"use client";

import {
  PRODUCT_FIELDS,
  ProductId,
  TERM_ID,
} from "@/features/register/constants/products.constants";
import { useRegister } from "@/features/register/contexts/register.context";
import RegisterService from "@/features/register/services/register.service";
import { buildProductInterests } from "@/features/register/utils/products.utils";
import { ToastManager } from "@adamosuiteservices/ui/toaster";

import { useState } from "react";

import { useTranslations } from "next-intl";

export function useProductsForm() {
  const t = useTranslations("register-page.products");
  const { setCurrentStep, registrationEmail } = useRegister();

  const [selectedProducts, setSelectedProducts] = useState<Set<ProductId>>(
    new Set(),
  );
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);
    try {
      await RegisterService.completeRegistration({
        email: registrationEmail,
        productInterests: buildProductInterests(selectedProducts, fieldValues),
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
    selectedProducts,
    termsAccepted,
    setTermsAccepted,
    fieldValues,
    fieldErrors,
    isLoading,
    isSubmitEnabled,
    setField,
    toggleProduct,
    handleSubmit,
    handleCancel,
  };
}
