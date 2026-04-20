"use client";

import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import {
  COUNTRY_PHONE_MAP,
  PHONE_COUNTRY_MAP,
} from "@/features/register/constants/personal-information.constants";
import { useRegister } from "@/features/register/contexts/register.context";
import {
  RegisterPersonalInfoSchema,
  RegisterPersonalInfoValues,
} from "@/features/register/schemas/register.schema";
import RegisterService from "@/features/register/services/register.service";
import {
  capitalizeCompanyName,
  capitalizeFullName,
} from "@/features/register/utils/personal-information.utils";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "country-state-city";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

export function usePersonalInformationForm() {
  const t = useTranslations("register-page.personal-information");
  const tErrors = useTranslations("register-page.personal-information.errors");
  const tPositions = useTranslations("register-page.positions");
  const tIndustries = useTranslations("register-page.industries");
  const router = useRouter();
  const {
    setCurrentStep,
    setRegistrationEmail,
    personalInfoValues,
    setPersonalInfoValues,
  } = useRegister();
  const locale = useLocale();

  const countryDisplayNames = new Intl.DisplayNames([locale], {
    type: "region",
  });
  const allCountries = Country.getAllCountries().map((c) => ({
    ...c,
    name: countryDisplayNames.of(c.isoCode) ?? c.name,
  }));

  const form = useForm<RegisterPersonalInfoValues>({
    resolver: zodResolver(RegisterPersonalInfoSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      fullName: "",
      companyName: "",
      position: "",
      industry: "",
      country: "",
      phoneCode: "+57",
      phone: "",
      ...personalInfoValues,
    },
  });

  const watched = form.watch([
    "email",
    "fullName",
    "companyName",
    "position",
    "industry",
    "country",
    "phone",
  ]);
  const allFilled = watched.every((v) => (v ?? "").trim().length > 0);

  const [isLoading, setIsLoading] = useState(false);

  function translateError(message: string | undefined): string | undefined {
    if (!message) return undefined;
    const key = message.replace(/^errors\./, "");
    try {
      return tErrors(key as Parameters<typeof tErrors>[0]);
    } catch {
      return message;
    }
  }

  function fieldError(
    name: keyof RegisterPersonalInfoValues,
  ): string | undefined {
    const msg = form.formState.errors[name]?.message;
    return translateError(msg);
  }

  const onSubmit = async (values: RegisterPersonalInfoValues) => {
    const selectedCountry = allCountries.find((c) => c.name === values.country);
    const countryISO = selectedCountry?.isoCode ?? "";
    const phoneCode = values.phoneCode ?? "";
    const expectedPhone = COUNTRY_PHONE_MAP[countryISO];
    const expectedISO = PHONE_COUNTRY_MAP[phoneCode];
    const mismatch =
      (expectedPhone !== undefined && phoneCode !== expectedPhone) ||
      (expectedISO !== undefined && countryISO !== expectedISO);

    if (mismatch) {
      form.setError("country", { message: "errors.countryPhoneMismatch" });
      form.setError("phoneCode", { message: "errors.countryPhoneMismatch" });
      return;
    }

    const capitalizedFullName = capitalizeFullName(values.fullName);
    const capitalizedCompanyName = capitalizeCompanyName(values.companyName);

    setPersonalInfoValues({
      ...values,
      fullName: capitalizedFullName,
      companyName: capitalizedCompanyName,
      country: countryISO,
    });
    setRegistrationEmail(values.email);

    setIsLoading(true);
    try {
      await RegisterService.checkEmail(values.email);
      await RegisterService.registerUser({
        email: values.email,
        fullName: capitalizedFullName,
        companyName: capitalizedCompanyName,
        jobTitle: values.position,
        industry: values.industry,
        country: countryISO,
        phoneCode,
        phone: values.phone,
        language: locale,
      });
      setCurrentStep("verification");
    } catch (error) {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return {
    t,
    tPositions,
    tIndustries,
    form,
    allFilled,
    isLoading,
    allCountries,
    handleSubmit: form.handleSubmit(onSubmit),
    handleCancel,
    fieldError,
  };
}
