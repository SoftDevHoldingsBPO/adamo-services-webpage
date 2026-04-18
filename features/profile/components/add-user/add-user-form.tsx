"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { Loader2 } from "lucide-react";
import z from "zod";

import { ComponentType, useState } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { AdamoCheckIcon } from "@/components/icon/AdamoCheckIcon";
import { AdamoIDIcon } from "@/components/icon/AdamoIdIcon";
import { AdamoPayIcon } from "@/components/icon/AdamoPayIcon";
import { AdamoRiskIcon } from "@/components/icon/AdamoRiskIcon";
import { AdamoSignIcon } from "@/components/icon/AdamoSignIcon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const serviceIds = ["pay", "id", "risk", "sign", "check"] as const;
type ServiceId = (typeof serviceIds)[number];

const serviceColors: Record<ServiceId, string> = {
  pay: "#0E9384",
  id: "#0086C9",
  risk: "#7839EE",
  sign: "#3E4784",
  check: "#6366F1",
};

const serviceIcons: Record<ServiceId, ComponentType<{ className?: string }>> = {
  pay: AdamoPayIcon,
  id: AdamoIDIcon,
  risk: AdamoRiskIcon,
  sign: AdamoSignIcon,
  check: AdamoCheckIcon,
};

const AddUserFormSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z.string().email(),
  services: z
    .record(
      z.enum(serviceIds),
      z.object({
        enabled: z.boolean(),
        role: z.string().optional(),
      }),
    )
    .superRefine((services, ctx) => {
      const hasAtLeastOne = Object.values(services).some(
        (s) => s.enabled && s.role && s.role.length > 0,
      );
      if (!hasAtLeastOne) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "at_least_one_service",
        });
      }
      for (const [key, s] of Object.entries(services)) {
        if (s.enabled && (!s.role || s.role.length === 0)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "role_required",
            path: [key, "role"],
          });
        }
      }
    }),
});

export type AddUserFormValues = z.infer<typeof AddUserFormSchema>;

export type AddUserInitialData = Readonly<{
  name: string;
  surname: string;
  email: string;
  services: Partial<Record<ServiceId, { enabled: boolean; role: string }>>;
}>;

export type AddUserFormProps = Readonly<{
  initialData?: AddUserInitialData;
  onUserAdded?: (values: AddUserFormValues) => Promise<void>;
  onCancel?: () => void;
}>;

export function AddUserForm({
  initialData,
  onUserAdded,
  onCancel,
}: AddUserFormProps) {
  const t = useTranslations("add-user-dialog");
  const isEditMode = !!initialData;
  const [isPending, setIsPending] = useState(false);

  const form = useForm<AddUserFormValues>({
    resolver: zodResolver(AddUserFormSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      surname: initialData?.surname ?? "",
      email: initialData?.email ?? "",
      services: {
        pay: initialData?.services.pay ?? { enabled: false, role: "" },
        id: initialData?.services.id ?? { enabled: false, role: "" },
        risk: initialData?.services.risk ?? { enabled: false, role: "" },
        sign: initialData?.services.sign ?? { enabled: false, role: "" },
        check: initialData?.services.check ?? { enabled: false, role: "" },
      },
    },
  });

  const watchedServices = form.watch("services");

  const isValid =
    form.formState.isValid &&
    Object.values(watchedServices).some(
      (s) => s.enabled && s.role && s.role.length > 0,
    );

  const handleSubmit = async (values: AddUserFormValues) => {
    setIsPending(true);
    try {
      await onUserAdded?.(values);
    } finally {
      setIsPending(false);
    }
  };

  const roleOptions: Array<{ value: string; label: string }> = [
    { value: "admin", label: t("roles.admin") },
    { value: "preparer", label: t("roles.preparer") },
    { value: "auditor", label: t("roles.auditor") },
  ];

  return (
    <>
      <DialogHeader>
        <div className="md:hidden flex items-center gap-2 mb-2">
          <DialogClose onClick={onCancel}>
            <ArrowLeft />
          </DialogClose>
          <DialogTitle>{isEditMode ? t("editTitle") : t("title")}</DialogTitle>
        </div>
        <DialogTitle className="hidden md:block">
          {isEditMode ? t("editTitle") : t("title")}
        </DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <div className="flex-1 min-h-0 overflow-y-auto p-[5px]">
        <Form {...form}>
          <form
            id="add-user-form"
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("name")}</FormLabel>
                      <FormControl>
                        <Input placeholder={t("namePlaceholder")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("surname")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("surnamePlaceholder")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        readOnly={isEditMode}
                        className={cn(
                          isEditMode &&
                            "bg-neutral-100 text-neutral-500 cursor-default",
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-6">
              {serviceIds.map((serviceId) => {
                const Icon = serviceIcons[serviceId];
                const color = serviceColors[serviceId];
                const isEnabled = watchedServices[serviceId]?.enabled ?? false;

                return (
                  <div key={serviceId} className="flex items-start gap-4">
                    <FormField
                      control={form.control}
                      name={`services.${serviceId}.enabled`}
                      render={({ field }) => (
                        <Checkbox
                          className="mt-2.5"
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            field.onChange(checked);
                            if (!checked) {
                              form.setValue(`services.${serviceId}.role`, "");
                              form.clearErrors(`services.${serviceId}.role`);
                            }
                          }}
                        />
                      )}
                    />
                    <div className="flex flex-1 items-center gap-3 mt-1">
                      <div
                        className="flex size-8 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: color }}
                      >
                        <Icon className="size-4" />
                      </div>
                      <span className="text-sm text-neutral-600">
                        {t(`services.${serviceId}`)}
                      </span>
                    </div>
                    <FormField
                      control={form.control}
                      name={`services.${serviceId}.role`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <Select
                            disabled={!isEnabled}
                            value={field.value ?? ""}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger
                                className={cn(
                                  "w-full border",
                                  field.value
                                    ? "bg-white border-[#e5e7eb]"
                                    : "bg-neutral-100 border-neutral-200",
                                  "data-[state=open]:bg-white data-[state=open]:border-[#6ebeb5] data-[state=open]:shadow-[0px_0px_0px_4px_rgba(14,147,132,0.1)]",
                                  !isEnabled && "opacity-60",
                                )}
                              >
                                <SelectValue
                                  placeholder={t("rolePlaceholder")}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-[8px] border border-[#e5e7eb] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.08)] p-0">
                              {roleOptions.map((opt) => (
                                <SelectItem
                                  key={opt.value}
                                  value={opt.value}
                                  className="h-[44px] rounded-none px-4 border-b border-[#f3f4f6] last:border-b-0 focus:bg-[#f9fafb]"
                                >
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </form>
        </Form>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="muted" onClick={onCancel}>
            {t("cancel")}
          </Button>
        </DialogClose>
        <Button
          type="submit"
          form="add-user-form"
          disabled={!isValid || isPending}
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}
          {isEditMode ? t("save") : t("continue")}
        </Button>
      </DialogFooter>
    </>
  );
}
