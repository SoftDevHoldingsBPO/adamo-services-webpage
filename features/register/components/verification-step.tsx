"use client";

import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import { useRegister } from "@/features/register/contexts/register.context";
import RegisterService from "@/features/register/services/register.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import z from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import CountdownText from "@/components/CountdownText";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  CustomInputOTPGroup,
  CustomInputOTPSlot,
  InputOTP,
} from "@/components/ui/input-otp";

const VerificationSchema = z.object({
  code: SixCodeSchema,
});

type VerificationValues = z.infer<typeof VerificationSchema>;

export function VerificationStep() {
  const t = useTranslations("register-page.verification");
  const { registrationEmail, setCurrentStep } = useRegister();

  const form = useForm<VerificationValues>({
    resolver: zodResolver(VerificationSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { code: "" },
  });

  const hasCodeError = !!form.formState.errors.code;
  const [isLoading, setIsLoading] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  const handleResendCode = async () => {
    form.reset({ code: "" });
    setCountdownKey((k) => k + 1);
    try {
      await RegisterService.resendOtp(registrationEmail);
      ToastManager.show({
        variant: "success",
        message: t("resendSuccess"),
      });
    } catch {
      ToastManager.show({
        variant: "destructive",
        message: t("resendError"),
      });
    }
  };

  const handleSubmit = async (values: VerificationValues) => {
    setIsLoading(true);
    try {
      await RegisterService.verifyEmail(registrationEmail, values.code);
      setCurrentStep("products");
    } catch (error) {
      form.reset({ code: "" });
      const nestedErrorCode =
        error instanceof AxiosError
          ? (error.response?.data?.data?.error as string | undefined)
          : undefined;
      const KNOWN_CODES = ["invalid_otp"] as const;
      const isKnown = KNOWN_CODES.includes(
        nestedErrorCode as (typeof KNOWN_CODES)[number],
      );
      ToastManager.show({
        variant: "destructive",
        message: isKnown
          ? t(`apiErrors.${nestedErrorCode as "invalid_otp"}`)
          : t("apiErrors.serverError"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setCurrentStep("personal-information");
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="font-bold text-base text-neutral-700">{t("title")}</h2>
        <p className="text-base text-neutral-500">
          {t("description")}{" "}
          <span className="font-semibold text-neutral-800">
            {registrationEmail}
          </span>
        </p>
      </div>

      <Form {...form}>
        <form
          id="register-verification-form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full"
        >
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                    autoComplete="one-time-code"
                    {...field}
                    onChange={(value) => field.onChange(value.toUpperCase())}
                  >
                    <CustomInputOTPGroup>
                      <CustomInputOTPSlot index={0} isError={hasCodeError} />
                      <CustomInputOTPSlot index={1} isError={hasCodeError} />
                      <CustomInputOTPSlot index={2} isError={hasCodeError} />
                      <CustomInputOTPSlot index={3} isError={hasCodeError} />
                      <CustomInputOTPSlot index={4} isError={hasCodeError} />
                      <CustomInputOTPSlot index={5} isError={hasCodeError} />
                    </CustomInputOTPGroup>
                  </InputOTP>
                </FormControl>
                {hasCodeError && (
                  <p className="text-destructive text-xs">
                    {t("errors.codeInvalid")}
                  </p>
                )}
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex gap-2 items-center">
        <p className="text-sm text-neutral-500">{t("codeNotReceived")} </p>
        <CountdownText
          key={countdownKey}
          initialSeconds={59}
          text={(time) => t("resendCooldown", { time })}
          completedText={t("resend")}
          onCompletedClick={handleResendCode}
        />
      </div>

      <div className="flex gap-6">
        <Button
          type="button"
          variant="muted"
          onClick={handleCancel}
          disabled={isLoading}
        >
          {t("cancel")}
        </Button>
        <Button
          type="submit"
          form="register-verification-form"
          disabled={!form.formState.isValid || isLoading}
          loading={isLoading}
        >
          {t("continue")}
        </Button>
      </div>
    </>
  );
}
