"use client";

import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { PasswordRecoveryDialog } from "@/features/auth/components/password-recovery/password-recovery-dialog";
import {
  Enter2FADialog,
  Enter2FAFormValues,
} from "@/features/auth/components/sign-in/enter-2fa-dialog";
import { Setup2FADialog } from "@/features/auth/components/sign-in/setup-2fa-dialog";
import { VerifyEmailDialog } from "@/features/auth/components/sign-in/verify-email-dialog";
import { SignUpDialog } from "@/features/auth/components/sign-up/sign-up-dialog";
import { useAuth } from "@/features/auth/contexts/auth.context";
import { useFirstLoginRedirect } from "@/features/auth/hooks/use-first-login-redirect";
import {
  EmailSchema,
  PasswordSchema,
} from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import z from "zod";

import { ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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

const SignInFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export type SignInDialogProps = ComponentProps<typeof Dialog> &
  Readonly<{
    isAtTop: boolean;
  }>;

export function SignInDialog({
  isAtTop,
  open,
  onOpenChange,
  ...props
}: SignInDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <SignInContent
          isAtTop={isAtTop}
          open={open}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}

type SignInContentProps = SignInDialogProps;

function SignInContent({ onOpenChange }: SignInContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { fetchAndSetUser } = useAuth();
  const { checkAndClearFirstLogin } = useFirstLoginRedirect();

  const [twoFAAccessToken, setTwoFAAccessToken] = useState<
    string | undefined
  >();

  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

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

      // The token in response body indicates successful authentication
      if ("token" in signInResponse.data) {
        // Check for redirect_to query param
        const redirectTo = AuthQueryUtils.getRedirectUrl(searchParams);

        if (redirectTo) {
          window.location.href = redirectTo;
          return;
        }

        // Tokens are set as HTTP-only cookies by the API
        await fetchAndSetUser();

        ToastManager.show({
          variant: "success",
          message: t("success"),
        });

        if (onOpenChange) onOpenChange(false);

        // Check if this is a first login after registration
        const isFirstLogin = checkAndClearFirstLogin();

        if (isFirstLogin) {
          // Redirect to my-services
          router.push("/my-services");
        }
      }
    },
    onError: (error) => {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    },
  });

  const handleOpenSignUpDialog = () => {
    setIsSignUpDialogOpen(true);
  };

  const handleOpenPasswordRecoveryDialog = () => {
    setIsPasswordRecoveryDialogOpen(true);
  };

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
  };

  return (
    <>
      <DialogHeader>
        <div className="md:hidden flex gap-2 items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DialogClose>
              <ArrowLeft />
            </DialogClose>
            <DialogTitle>{t("header-text")}</DialogTitle>
          </div>
          <LocaleSelect />
        </div>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="sign-in-form"
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
                onClick={handleOpenPasswordRecoveryDialog}
              >
                {t("forgot-password-action")}
              </button>
            </p>
          </fieldset>
        </form>
      </Form>
      <DialogFooter className="flex-col gap-14">
        <div className="flex gap-6">
          <DialogClose asChild>
            <Button type="button" variant="muted">
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            form="sign-in-form"
            type="submit"
            loading={isPendingSignIn}
            disabled={isPendingSignIn || !form.formState.isValid}
          >
            {t("sign-in")}
          </Button>
        </div>
        <p className="text-sm text-neutral-500">
          {t("do-not-have-account")}{" "}
          <button
            type="button"
            className="font-semibold text-neutral-700"
            onClick={handleOpenSignUpDialog}
          >
            {t("do-not-have-account-action")}
          </button>
        </p>
      </DialogFooter>
      <SignUpDialog
        open={isSignUpDialogOpen}
        onOpenChange={setIsSignUpDialogOpen}
      />
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
