import { PasswordWithConfirmationSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { PasswordRecoveryStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryContent";
import { Button } from "@/components/ui/button";
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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocaleSelect from "@/components/ui/locale-select";

export const PasswordRecoveryNewPasswordFormSchema =
  PasswordWithConfirmationSchema;

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
        <div className="md:hidden flex gap-2 items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DialogTitle>{t("title")}</DialogTitle>
          </div>
          <LocaleSelect />
        </div>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="password-recovery-email-step-form"
          onSubmit={form.handleSubmit((values) => {})}
        >
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
