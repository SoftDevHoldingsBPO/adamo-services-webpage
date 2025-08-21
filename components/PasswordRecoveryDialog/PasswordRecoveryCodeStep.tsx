import { z } from "@/i18n/zod-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { ComponentProps } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import CountdownText from "@/components/CountdownText";
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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export const PasswordRecoveryCodeFormSchema = z.object({
  code: z
    .string()
    .min(1)
    .refine((value) => /^\d{6}$/.test(value), {
      params: {
        i18n: {
          key: "errors.code",
        },
      },
    }),
});

export type PasswordRecoveryCodeFormValues = z.infer<
  typeof PasswordRecoveryCodeFormSchema
>;

export type PasswordRecoveryCodeStepProps = {
  setStep: (step: PasswordRecoveryStep) => void;
};

export function PasswordRecoveryCodeStep({
  setStep,
}: PasswordRecoveryCodeStepProps) {
  const t = useTranslations("password-recovery-dialog.code-step");

  const form = useForm<PasswordRecoveryCodeFormValues>({
    resolver: zodResolver(PasswordRecoveryCodeFormSchema),
    defaultValues: {
      code: "",
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
            setStep("new-password");
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
                    <InputOTPGroup className="w-full justify-between md:gap-6">
                      <PasswordRecoveryInputOTPSlot index={0} />
                      <PasswordRecoveryInputOTPSlot index={1} />
                      <PasswordRecoveryInputOTPSlot index={2} />
                      <PasswordRecoveryInputOTPSlot index={3} />
                      <PasswordRecoveryInputOTPSlot index={4} />
                      <PasswordRecoveryInputOTPSlot index={5} />
                    </InputOTPGroup>
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

type PasswordRecoveryInputOTPSlotProps = ComponentProps<typeof InputOTPSlot>;

function PasswordRecoveryInputOTPSlot({
  className,
  ...props
}: PasswordRecoveryInputOTPSlotProps) {
  return (
    <InputOTPSlot
      {...props}
      className={cn(
        "w-full shadow-none md:border border-neutral-200 md:rounded-lg md:h-auto md:aspect-video",
        className,
      )}
    />
  );
}
cn;
