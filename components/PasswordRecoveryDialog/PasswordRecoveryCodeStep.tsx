import { SixCodeSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import CountdownText from "@/components/CountdownText";
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
import {
  CustomInputOTPGroup,
  CustomInputOTPSlot,
  InputOTP,
} from "@/components/ui/input-otp";
import LocaleSelect from "@/components/ui/locale-select";

export const PasswordRecoveryCodeFormSchema = z.object({
  code: SixCodeSchema,
});

export type PasswordRecoveryCodeFormValues = z.infer<
  typeof PasswordRecoveryCodeFormSchema
>;

export function PasswordRecoveryCodeStep() {
  const t = useTranslations("password-recovery-dialog.code-step");

  const { setPasswordRecoveryStep } = usePasswordRecovery();

  const form = useForm<PasswordRecoveryCodeFormValues>({
    resolver: zodResolver(PasswordRecoveryCodeFormSchema),
    defaultValues: {
      code: "",
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
        <DialogBack className="hidden md:block" />
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="password-recovery-email-step-form"
          onSubmit={form.handleSubmit((values) => {
            setPasswordRecoveryStep("new-password");
          })}
        >
          <p className="text-neutral-700 mb-8">eatteer@gmail.com</p>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <CustomInputOTPGroup>
                      <CustomInputOTPSlot index={0} />
                      <CustomInputOTPSlot index={1} />
                      <CustomInputOTPSlot index={2} />
                      <CustomInputOTPSlot index={3} />
                      <CustomInputOTPSlot index={4} />
                      <CustomInputOTPSlot index={5} />
                    </CustomInputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-2 items-center">
            <p className="text-sm text-neutral-500">
              {t("code-not-received")}{" "}
            </p>
            <CountdownText
              initialSeconds={10}
              text={t("code-not-received-cooldown")}
              completedText={t("code-not-received-action")}
            />
          </div>
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="muted">{t("cancel")}</Button>
        </DialogClose>
        <Button type="submit" form="password-recovery-email-step-form">
          {t("continue")}
        </Button>
      </DialogFooter>
    </>
  );
}
