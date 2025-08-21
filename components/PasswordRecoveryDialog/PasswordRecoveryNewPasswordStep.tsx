import { z } from "@/i18n/zod-i18n";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { PasswordRecoveryStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryContent";
import { Button } from "@/components/ui/button";
import {
  DialogBack,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const PasswordRecoveryNewPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .refine((value) => /^(?=.*[A-Z])(?=.*\d).*$/.test(value), {
        params: {
          i18n: {
            key: "errors.password",
          },
        },
      }),
    confirmPassword: z.string().min(1),
  })
  .refine((data) => data.password === data.confirmPassword, {
    params: {
      i18n: {
        key: "errors.confirm_password",
      },
    },
    path: ["confirmPassword"],
  });

export type PasswordRecoveryNewPasswordFormValues = z.infer<
  typeof PasswordRecoveryNewPasswordFormSchema
>;

export type PasswordRecoveryNewPasswordStepProps = {
  setStep: (step: PasswordRecoveryStep) => void;
};

export function PasswordRecoveryNewPasswordStep({
  setStep,
}: PasswordRecoveryNewPasswordStepProps) {
  const t = useTranslations("password-recovery-dialog.new-password-step");

  const form = useForm<PasswordRecoveryNewPasswordFormValues>({
    resolver: zodResolver(PasswordRecoveryNewPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogClose>
          <DialogBack />
        </DialogClose>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="password-recovery-email-step-form"
          onSubmit={form.handleSubmit((values) => {})}
        >
          <p className="text-neutral-700 mb-8">eatteer@gmail.com</p>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("placeholders.password")}
                    {...field}
                  />
                </FormControl>
                <FormDescription>{t("descriptions.password")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("placeholders.confirm-password")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="muted">{t("cancel")}</Button>
        </DialogClose>
        <Button type="submit" form="password-recovery-email-step-form">
          {t("change-password")}
        </Button>
      </DialogFooter>
    </>
  );
}
