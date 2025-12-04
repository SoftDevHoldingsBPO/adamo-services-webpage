import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { useSignUp } from "@/features/auth/contexts/sign-up.context";
import { useFirstLoginRedirect } from "@/features/auth/hooks/use-first-login-redirect";
import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import CountdownText from "@/components/CountdownText";
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

export const SignUpVerifyEmailFormSchema = z.object({
  code: SixCodeSchema,
});

export type SignUpVerifyEmailFormValues = z.infer<
  typeof SignUpVerifyEmailFormSchema
>;

export function SignUpVerifyEmailStep() {
  const t = useTranslations("sign-up-dialog.code-step");

  const { email, setIsSignUpDialogOpen } = useSignUp();
  const { markAsFirstLogin } = useFirstLoginRedirect();

  const form = useForm<SignUpVerifyEmailFormValues>({
    resolver: zodResolver(SignUpVerifyEmailFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutateAsync: verifyEmail, isPending: isPendingVerifyEmail } =
    useMutation({
      mutationFn: AuthService.verifyEmail,
      onSuccess: () => {
        ToastManager.show({
          variant: "success",
          message: t("success"),
        });

        // Mark as first login for redirect on next sign-in
        markAsFirstLogin();

        setIsSignUpDialogOpen(false);
      },
      onError: (error) => {
        ToastManager.show({
          variant: "destructive",
          message: getFirstAxiosErrorMessage(error),
        });
      },
    });

  const handleVerifyEmail = async (values: SignUpVerifyEmailFormValues) => {
    await verifyEmail({
      email,
      otp: values.code,
    });
  };

  const handleResendCode = async () => {
    await AuthService.resendCode({ email });
  };

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
        <DialogClose asChild className="hidden md:flex">
          <DialogBack />
        </DialogClose>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="sign-up-code-step-form"
          onSubmit={form.handleSubmit(handleVerifyEmail)}
        >
          <fieldset disabled={isPendingVerifyEmail} className="space-y-4">
            <p className="text-neutral-700 mb-8">{email}</p>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <CustomInputOTPGroup>
                        <CustomInputOTPSlot
                          index={0}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={1}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={2}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={3}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={4}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={5}
                          isError={!!form.formState.errors.code}
                        />
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
                initialSeconds={59}
                text={t("code-not-received-cooldown")}
                completedText={t("code-not-received-action")}
                onCompletedClick={handleResendCode}
              />
            </div>
          </fieldset>
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="muted">
            {t("cancel")}
          </Button>
        </DialogClose>
        <Button
          type="submit"
          form="sign-up-code-step-form"
          disabled={!form.formState.isValid || isPendingVerifyEmail}
          loading={isPendingVerifyEmail}
        >
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
