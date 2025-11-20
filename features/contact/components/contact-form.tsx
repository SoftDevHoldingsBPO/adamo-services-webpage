"use client";

import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { ContactFormSchema } from "@/features/contact/schemas/contact-form.schema";
import ContactService from "@/features/contact/services/contact.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Country } from "country-state-city";

import { Controller, useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import CountryDropdown from "@/components/ui/country-select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SERVICES = [
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

const DEFAULT_VALUES: ContactFormSchema = {
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

  const form = useForm<ContactFormSchema>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { mutateAsync: contact, isPending: isPendingContact } = useMutation({
    mutationFn: ContactService.contact,
    onSuccess: () => {
      form.reset(DEFAULT_VALUES);

      ToastManager.show({
        variant: "success",
        message: t("success"),
      });
    },
    onError: (error) => {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    },
  });

  const onSubmit = async (data: ContactFormSchema) => {
    await contact({
      fullName: data.name,
      corporateEmail: data.email,
      companyName: data.company,
      companyWebsite: data.website,
      country: data.country,
      phone: data.phone,
      solutionsOfInterest: data.services,
      message: data.message,
    });
  };

  return (
    <div
      data-inview
      data-inview-delay={0.3}
      className="px-4 -mt-[474px] relative z-10 lg:-mt-[420px] max-w-[714px] xl:max-w-[1022px] mx-auto md:p-0 mb-5"
    >
      <div className="bg-white p-6 lg:p-10 rounded-3xl drop-shadow-parallax">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-y-6 gap-x-4 md:grid-cols-2">
            <Input
              isError={!!form.formState.errors.name}
              errorMessage={t("errors.name")}
              placeholder={t("placeholders.name")}
              {...form.register("name")}
            />
            <Input
              isError={!!form.formState.errors.email}
              errorMessage={t("errors.email")}
              placeholder={t("placeholders.email")}
              {...form.register("email")}
            />
            <Input
              isError={!!form.formState.errors.company}
              placeholder={t("placeholders.company")}
              errorMessage={t("errors.company")}
              {...form.register("company")}
            />
            <Input
              isError={!!form.formState.errors.website}
              placeholder={t("placeholders.website")}
              errorMessage={t("errors.website")}
              {...form.register("website")}
            />
            <div className="space-y-1">
              <Controller
                control={form.control}
                name="country"
                render={({ field }) => (
                  <>
                    <CountryDropdown
                      {...field}
                      triggerPlaceholder={t("placeholders.country")}
                      placeholder={t("placeholders.countrySearch")}
                      options={Country.getAllCountries()}
                    />
                    {form.formState.errors.country && (
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
              {...form.register("phone")}
            />
          </div>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-neutral-400">
              {t("placeholders.services")}
            </p>
            <div className="flex flex-wrap gap-8 lg:gap-12">
              {SERVICES.map((service) => (
                <label
                  key={service.id}
                  className="flex items-center gap-x-3 cursor-pointer"
                >
                  <Controller
                    control={form.control}
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
            {form.formState.errors.services && (
              <p className="text-destructive text-sm">{t("errors.services")}</p>
            )}
          </div>
          <Textarea
            className="mt-6"
            placeholder={t("placeholders.message")}
            {...form.register("message")}
          />
          <p className="mt-10 text-sm text-neutral-500">{t("required")}</p>
          <div className="mt-14">
            <Button
              type="submit"
              disabled={isPendingContact || !form.formState.isValid}
              loading={isPendingContact}
            >
              {t("send")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
