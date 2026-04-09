"use client";

import {
  INDUSTRY_KEYS,
  PHONE_CODE_OPTIONS,
  POSITION_KEYS,
} from "@/features/register/constants/personal-information.constants";
import { usePersonalInformationForm } from "@/features/register/hooks/use-personal-information-form";

import { Controller } from "react-hook-form";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import CountryDropdown from "@/components/ui/country-select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import OptionsDropdown from "@/components/ui/options-dropdown";

function Flag({ iso }: { iso: string }) {
  return (
    <Image
      src={`https://flagcdn.com/w20/${iso}.png`}
      alt={iso.toUpperCase()}
      width={20}
      height={15}
      className="rounded-sm shrink-0 object-cover"
      unoptimized
    />
  );
}

export function PersonalInformationStep() {
  const {
    t,
    tPositions,
    tIndustries,
    form,
    allFilled,
    isLoading,
    allCountries,
    handleSubmit,
    fieldError,
  } = usePersonalInformationForm();

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-base text-neutral-700">{t("title")}</h2>
        <p className="text-base text-neutral-500">{t("description")}</p>
      </div>

      <Form {...form}>
        <form
          id="register-personal-info-form"
          onSubmit={handleSubmit}
          className="w-full"
        >
          <div className="grid gap-y-6 gap-x-4 md:grid-cols-2">
            {/* Row 1: Email + Full name */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      isError={!!form.formState.errors.email}
                      placeholder={t("placeholders.email")}
                    />
                  </FormControl>
                  {fieldError("email") && (
                    <p className="text-destructive text-xs">
                      {fieldError("email")}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.fullName")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      isError={!!form.formState.errors.fullName}
                      placeholder={t("placeholders.fullName")}
                    />
                  </FormControl>
                  {fieldError("fullName") && (
                    <p className="text-destructive text-xs">
                      {fieldError("fullName")}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Row 2: Company name + Position */}
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.companyName")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      isError={!!form.formState.errors.companyName}
                      placeholder={t("placeholders.companyName")}
                    />
                  </FormControl>
                  {fieldError("companyName") && (
                    <p className="text-destructive text-xs">
                      {fieldError("companyName")}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.position")}</FormLabel>
                  <OptionsDropdown
                    value={field.value}
                    placeholder={t("placeholders.position")}
                    isError={!!form.formState.errors.position}
                    options={POSITION_KEYS.map((key) => ({
                      value: key,
                      label: tPositions(key),
                    }))}
                    onChange={field.onChange}
                  />
                  {fieldError("position") && (
                    <p className="text-destructive text-xs">
                      {fieldError("position")}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Row 3: Industry + Country */}
            <Controller
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.industry")}</FormLabel>
                  <OptionsDropdown
                    value={field.value}
                    placeholder={t("placeholders.industry")}
                    isError={!!form.formState.errors.industry}
                    options={INDUSTRY_KEYS.map((key) => ({
                      value: key,
                      label: tIndustries(key),
                    }))}
                    onChange={field.onChange}
                  />
                  {fieldError("industry") && (
                    <p className="text-destructive text-xs">
                      {fieldError("industry")}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <Controller
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("labels.country")}</FormLabel>
                  <CountryDropdown
                    {...field}
                    onChange={(val: string) => {
                      field.onChange(val);
                      form.clearErrors(["country", "phoneCode"]);
                    }}
                    triggerPlaceholder={t("placeholders.country")}
                    isError={!!form.formState.errors.country}
                    options={allCountries}
                  />
                  {fieldError("country") && (
                    <p className="text-destructive text-xs">
                      {fieldError("country")}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Row 4: Phone (half-width) */}
            <div className="grid gap-2 md:col-span-1">
              <FormLabel>{t("labels.phone")}</FormLabel>
              <div className="flex gap-4 items-center">
                <Controller
                  control={form.control}
                  name="phoneCode"
                  render={({ field }) => (
                    <div className="w-[130px] shrink-0">
                      <OptionsDropdown
                        value={field.value ?? ""}
                        options={PHONE_CODE_OPTIONS.map((opt) => ({
                          ...opt,
                          icon: <Flag iso={opt.iso} />,
                        }))}
                        isError={!!form.formState.errors.phoneCode}
                        onChange={(val: string) => {
                          field.onChange(val);
                          form.clearErrors(["country", "phoneCode"]);
                        }}
                      />
                    </div>
                  )}
                />
                <div className="flex-1 min-w-0">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            type="tel"
                            isError={!!form.formState.errors.phone}
                            placeholder={t("placeholders.phone")}
                          />
                        </FormControl>
                        {fieldError("phone") && (
                          <p className="text-destructive text-xs">
                            {fieldError("phone")}
                          </p>
                        )}
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {fieldError("phoneCode") && (
                <p className="text-destructive text-xs">
                  {fieldError("phoneCode")}
                </p>
              )}
            </div>
          </div>
        </form>
      </Form>

      <div className="flex gap-6">
        <Button
          type="submit"
          form="register-personal-info-form"
          disabled={!allFilled || isLoading}
          loading={isLoading}
        >
          {t("continue")}
        </Button>
      </div>
    </>
  );
}
