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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const PasswordRecoveryFormSchema = z.object({
  email: z.string().email(),
});

export type PasswordRecoveryFormValues = z.infer<
  typeof PasswordRecoveryFormSchema
>;

export type PasswordRecoveryEmailStepProps = {
  setStep: (step: PasswordRecoveryStep) => void;
};

export function PasswordRecoveryEmailStep({
  setStep,
}: PasswordRecoveryEmailStepProps) {
  const t = useTranslations("password-recovery-dialog.email-step");

  const form = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(PasswordRecoveryFormSchema),
    defaultValues: {
      email: "",
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
          onSubmit={form.handleSubmit((values) => {
            setStep("code");
          })}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} placeholder={t("placeholders.email")} />
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
