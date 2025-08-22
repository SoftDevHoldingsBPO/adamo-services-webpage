import { EmailSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { usePasswordRecovery } from "@/components/PasswordRecoveryDialog/PasswordRecoveryContext";
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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocaleSelect from "@/components/ui/locale-select";

export const PasswordRecoveryFormSchema = z.object({
  email: EmailSchema,
});

export type PasswordRecoveryFormValues = z.infer<
  typeof PasswordRecoveryFormSchema
>;

export function PasswordRecoveryEmailStep() {
  const t = useTranslations("password-recovery-dialog.email-step");

  const { setPasswordRecoveryStep } = usePasswordRecovery();

  const form = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(PasswordRecoveryFormSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <>
      <DialogHeader>
        <div className="md:hidden flex gap-2 items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DialogClose>
              <ArrowLeft />
            </DialogClose>
            <DialogTitle>{t("title")}</DialogTitle>
          </div>
          <LocaleSelect />
        </div>
        <DialogClose>
          <DialogBack className="hidden md:block" />
        </DialogClose>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="password-recovery-email-step-form"
          onSubmit={form.handleSubmit((values) => {
            setPasswordRecoveryStep("code");
          })}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    isError={!!form.formState.errors.email}
                    placeholder={t("placeholders.email")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <DialogFooter>
        <Button variant="muted">{t("cancel")}</Button>
        <Button type="submit" form="password-recovery-email-step-form">
          {t("recover-password")}
        </Button>
      </DialogFooter>
    </>
  );
}
