"use client";

import {
  ContactFormSchema,
  contactFormSchema,
} from "@/schema/contactFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Country } from "country-state-city";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { sleep } from "@/lib/utils";

import { CheckIcon, SpinnerIcon } from "../icon";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import CountryDropdown from "../ui/country-select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const services = [
  {
    id: "adamo-pay",
    label: "Adamo Pay",
  },
  {
    id: "adamo-id",
    label: "Adamo ID",
  },
  {
    id: "adamo-risk",
    label: "Adamo Risk",
  },
  {
    id: "adamo-sign",
    label: "Adamo Sign",
  },
];

const defaultValues: ContactFormSchema = {
  name: "",
  email: "",
  company: "",
  website: "",
  country: "",
  phone: "",
  services: [],
  message: "",
};

const ContactForm = () => {
  const t = useTranslations("contactForm");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: ContactFormSchema) => {
    setSending(true);
    await sleep(2000);
    setSending(false);
    setSuccess(true);
    reset(defaultValues);
  };

  return (
    <div
      data-inview
      data-inview-delay={0.3}
      className="px-4 -mt-[474px] relative z-10 lg:-mt-[420px] max-w-[714px] xl:max-w-[1022px] mx-auto md:p-0 mb-5"
    >
      <div className="bg-white p-6 lg:p-10 rounded-3xl drop-shadow-parallax">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-y-6 gap-x-4 md:grid-cols-2">
            <Input
              isError={!!errors.name}
              errorMessage={t("errors.name")}
              placeholder={t("placeholders.name")}
              {...register("name")}
            />
            <Input
              isError={!!errors.email}
              errorMessage={t("errors.email")}
              placeholder={t("placeholders.email")}
              {...register("email")}
            />
            <Input
              isError={!!errors.company}
              placeholder={t("placeholders.company")}
              errorMessage={t("errors.company")}
              {...register("company")}
            />
            <Input
              isError={!!errors.website}
              placeholder={t("placeholders.website")}
              errorMessage={t("errors.website")}
              {...register("website")}
            />

            <div className="space-y-1">
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <>
                    <CountryDropdown
                      {...field}
                      triggerPlaceholder={t("placeholders.country")}
                      placeholder={t("placeholders.countrySearch")}
                      options={Country.getAllCountries()}
                    />
                    {errors.country && (
                      <p className="text-destructive text-sm">
                        {t("errors.country")}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <Input
              type="tel"
              placeholder={t("placeholders.phone")}
              {...register("phone")}
            />
          </div>

          <div className="mt-6 space-y-4">
            <p className="text-sm text-neutral-400">
              {t("placeholders.services")}
            </p>

            <div className="flex flex-wrap gap-8 lg:gap-12">
              {services.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center gap-x-3 cursor-pointer"
                >
                  <Controller
                    control={control}
                    name="services"
                    render={({ field }) => (
                      <Checkbox
                        id={service.id}
                        checked={field.value?.includes(service.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, service.id])
                            : field.onChange(
                                field.value?.filter((s) => s !== service.id),
                              );
                        }}
                      />
                    )}
                  />

                  <span className="text-sm text-neutral-600">
                    {service.label}
                  </span>
                </label>
              ))}
            </div>

            {errors.services && (
              <p className="text-destructive text-sm">{t("errors.services")}</p>
            )}
          </div>

          <Textarea
            className="mt-6"
            placeholder={t("placeholders.message")}
            {...register("message")}
          />

          <p className="mt-10 text-sm text-neutral-500">{t("required")}</p>

          <div className="mt-14">
            {success ? (
              <div className="flex items-center gap-x-4">
                <div className="py-3 text-success-600 font-medium inline-flex items-center gap-x-2">
                  {t("success")}
                  <CheckIcon />
                </div>
                <p>{t("successDescription")}</p>
              </div>
            ) : (
              <Button type="submit" disabled={sending}>
                {sending && <SpinnerIcon />}
                {t("send")}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
