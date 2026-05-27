"use client";

import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { PasswordRecoveryDialog } from "@/features/auth/components/password-recovery/password-recovery-dialog";
import {
  Enter2FADialog,
  Enter2FAFormValues,
} from "@/features/auth/components/sign-in/enter-2fa-dialog";
import { Setup2FADialog } from "@/features/auth/components/sign-in/setup-2fa-dialog";
import { VerifyEmailDialog } from "@/features/auth/components/sign-in/verify-email-dialog";
import { useAuth } from "@/features/auth/contexts/auth.context";
import { EmailSchema } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const SignInFormSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1),
});

type SignInFormValues = z.infer<typeof SignInFormSchema>;

export default function SignInPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { fetchAndSetUser } = useAuth();

  const [twoFAAccessToken, setTwoFAAccessToken] = useState<
    string | undefined
  >();
  const [isPasswordRecoveryDialogOpen, setIsPasswordRecoveryDialogOpen] =
    useState(false);
  const [isSetup2FADialogOpen, setIsSetup2FADialogOpen] = useState(false);
  const [isEnter2FADialogOpen, setIsEnter2FADialogOpen] = useState(false);
  const [isVerifyEmailDialogOpen, setIsVerifyEmailDialogOpen] = useState(false);

  const t = useTranslations("sign-in-dialog");

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signIn, isPending: isPendingSignIn } = useMutation({
    mutationFn: AuthService.signIn,
    onSuccess: async (signInResponse) => {
      if ("twoFactorSetupRequired" in signInResponse.data) {
        setIsSetup2FADialogOpen(true);
        setTwoFAAccessToken(signInResponse.data.temporaryToken);
        return;
      }
      if ("twoFactorRequired" in signInResponse.data) {
        setIsEnter2FADialogOpen(true);
        return;
      }
      if ("verification" in signInResponse.data) {
        if (
          signInResponse.data.verification.required &&
          signInResponse.data.verification.method === "email"
        ) {
          setIsVerifyEmailDialogOpen(true);
          return;
        }
      }

      if ("token" in signInResponse.data) {
        const redirectTo = AuthQueryUtils.getRedirectUrl(searchParams);

        if (redirectTo) {
          window.location.href = redirectTo;
          return;
        }

        await fetchAndSetUser();

        ToastManager.show({
          variant: "success",
          message: t("success"),
        });

        router.push("/my-services");
      }
    },
    onError: (error) => {
      const errorCode = getFirstAxiosErrorMessage(error);
      const message =
        errorCode === "errors.auth.invalid_totp"
          ? t("errors.invalid_totp")
          : errorCode;

      ToastManager.show({
        variant: "destructive",
        message,
      });
    },
  });

  const handleSignIn = async (values: SignInFormValues) => {
    await signIn({
      email: values.email,
      password: values.password,
    });
  };

  const handleSignInWith2FA = async (values: Enter2FAFormValues) => {
    await signIn(
      {
        email: form.getValues("email"),
        password: form.getValues("password"),
        totp: values.code,
      },
      {
        onSuccess: () => {
          setIsEnter2FADialogOpen(false);
        },
      },
    );
  };

  const handleEmailVerified = () => {
    setIsVerifyEmailDialogOpen(false);
    setIsSetup2FADialogOpen(true);
  };

  return (
    <>
      {/* Dark banner */}
      <div className="bg-primary h-72 mt-[100px] mx-4 rounded-4xl" />

      {/* White card */}
      <div className="relative -mt-56 mx-auto max-w-2xl px-4 md:px-0 mb-5">
        <div className="bg-white rounded-3xl drop-shadow-parallax px-6 pt-10 pb-12 md:px-10 flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-neutral-900">
              {t("title")}
            </h2>
            <p className="text-sm text-neutral-500">{t("description")}</p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              id="sign-in-page-form"
              className="flex flex-col"
              onSubmit={form.handleSubmit(handleSignIn)}
            >
              <fieldset disabled={isPendingSignIn} className="space-y-6">
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
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          isError={!!form.formState.errors.password}
                          placeholder={t("placeholders.password")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-sm text-neutral-500">
                  {t("forgot-password")}{" "}
                  <button
                    type="button"
                    className="font-semibold text-neutral-700"
                    onClick={() => setIsPasswordRecoveryDialogOpen(true)}
                  >
                    {t("forgot-password-action")}
                  </button>
                </p>
              </fieldset>
            </form>
          </Form>

          {/* Footer */}
          <div className="flex flex-col gap-10">
            <div className="flex gap-6">
              <Button
                type="button"
                variant="muted"
                onClick={() => router.push("/")}
              >
                {t("cancel")}
              </Button>
              <Button
                form="sign-in-page-form"
                type="submit"
                disabled={isPendingSignIn || !form.formState.isValid}
                loading={isPendingSignIn}
              >
                {t("sign-in")}
              </Button>
            </div>
            <p className="text-sm text-neutral-500">
              {t("do-not-have-account")}{" "}
              <button
                type="button"
                className="font-semibold text-neutral-700"
                onClick={() => router.push("/register")}
              >
                {t("do-not-have-account-action")}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Sub-dialogs (same as in the sign-in modal) */}
      <PasswordRecoveryDialog
        open={isPasswordRecoveryDialogOpen}
        onOpenChange={setIsPasswordRecoveryDialogOpen}
      />
      {twoFAAccessToken && (
        <Setup2FADialog
          accessToken={twoFAAccessToken}
          open={isSetup2FADialogOpen}
          onOpenChange={setIsSetup2FADialogOpen}
        />
      )}
      <Enter2FADialog
        open={isEnter2FADialogOpen}
        onOpenChange={setIsEnter2FADialogOpen}
        loading={isPendingSignIn}
        onSubmit={handleSignInWith2FA}
      />
      <VerifyEmailDialog
        email={form.getValues("email")}
        open={isVerifyEmailDialogOpen}
        onOpenChange={setIsVerifyEmailDialogOpen}
        onEmailVerified={handleEmailVerified}
      />
    </>
  );
}
