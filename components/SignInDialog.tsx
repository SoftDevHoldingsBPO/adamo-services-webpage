"use client";

import { EmailSchema, PasswordSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import z from "zod";

import { ComponentProps, useState } from "react";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

import { PasswordRecoveryDialog } from "@/components/PasswordRecoveryDialog/PasswordRecoveryDialog";
import { SignUpDialog } from "@/components/SignUpDialog/SignUpDialog";
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

export type SignInDialogProps = {
  isAtTop: boolean;
} & ComponentProps<typeof Dialog>;

export function SignInDialog({
  isAtTop,
  open,
  onOpenChange,
  ...props
}: SignInDialogProps) {
  const [isSignUpDialogOpen, setIsSignUpDialogOpen] = useState(false);

  const [isPasswordRecoveryDialogOpen, setIsPasswordRecoveryDialogOpen] =
    useState(false);

  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  const handleOpenSignUpDialog = () => {
    setIsSignUpDialogOpen(true);
  };

  const handleOpenPasswordRecoveryDialog = () => {
    setIsPasswordRecoveryDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} {...props}>
        <DialogContent
          showCloseButton={isAtLeastTablet}
          isFullscreen={!isAtLeastTablet}
        >
          <SignInContent
            onSubmit={async (values) => {
              const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
              });

              if (result.error) {
                alert("Sign in error: " + result.error);
              } else if (result.ok) {
                // Sign in successful, close dialog
                if (onOpenChange) onOpenChange(false);
              }
            }}
            onClickSignUp={handleOpenSignUpDialog}
            onClickForgotPassword={handleOpenPasswordRecoveryDialog}
          />
        </DialogContent>
      </Dialog>
      <SignUpDialog
        open={isSignUpDialogOpen}
        onOpenChange={setIsSignUpDialogOpen}
      />
      <PasswordRecoveryDialog
        open={isPasswordRecoveryDialogOpen}
        onOpenChange={setIsPasswordRecoveryDialogOpen}
      />
    </>
  );
}

type SignInContentProps = {
  onSubmit: (values: SignInFormValues) => Promise<void>;
  onClickSignUp: () => void;
  onClickForgotPassword: () => void;
};

function SignInContent({
  onSubmit,
  onClickSignUp,
  onClickForgotPassword,
}: SignInContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const t = useTranslations("sign-in-dialog");

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
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
          onSubmit={form.handleSubmit(async (values) => {
            setIsLoading(true);

            try {
              await onSubmit(values);
            } finally {
              setIsLoading(false);
            }
          })}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input {...field} placeholder={t("placeholders.email")} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <Input
                    {...field}
                    type="password"
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
              onClick={onClickForgotPassword}
            >
              {t("forgot-password-action")}
            </button>
          </p>
        </form>
      </Form>
      <DialogFooter className="flex-col gap-14">
        <div className="flex gap-6">
          <DialogClose asChild>
            <Button type="button" variant="muted">
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button form="sign-in-form" type="submit" loading={isLoading}>
            {t("sign-in")}
          </Button>
        </div>
        <p className="text-sm text-neutral-500">
          {t("do-not-have-account")}{" "}
          <button
            type="button"
            className="font-semibold text-neutral-700"
            onClick={onClickSignUp}
          >
            {t("do-not-have-account-action")}
          </button>
        </p>
      </DialogFooter>
    </>
  );
}
