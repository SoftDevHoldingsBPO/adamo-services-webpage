"use client";

import { z } from "@/i18n/zod-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps, ReactNode, useState } from "react";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";

import { PasswordRecoveryDialog } from "@/components/PasswordRecoveryDialog/PasswordRecoveryDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  email: z.string().email(),
  password: z.string().min(8),
});

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export type SignInDialogProps = {
  isAtTop: boolean;
  renderTrigger: () => ReactNode;
} & ComponentProps<typeof Dialog>;

export function SignInDialog({
  isAtTop,
  renderTrigger,
  open,
  onOpenChange,
  ...props
}: SignInDialogProps) {
  const [isPasswordRecoveryDialogOpen, setIsPasswordRecoveryDialogOpen] =
    useState(false);

  const t = useTranslations("sign-in-dialog");

  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  const handleOpenPasswordRecoveryDialog = () => {
    setIsPasswordRecoveryDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} {...props}>
        <DialogTrigger asChild>{renderTrigger()}</DialogTrigger>
        <DialogContent
          showCloseButton={isAtLeastTablet}
          isFullscreen={!isAtLeastTablet}
        >
          <DialogHeader>
            <div className="md:hidden flex items-center justify-between mb-6">
              <DialogClose className="flex items-center gap-2">
                <ArrowLeft />
                <span>{t("header-text")}</span>
              </DialogClose>
              <LocaleSelect />
            </div>
            <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
            <DialogDescription>{t("description")}</DialogDescription>
          </DialogHeader>
          <SignInForm
            onClickForgotPassword={handleOpenPasswordRecoveryDialog}
            onSubmit={async (values) => {
              const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
              });

              if (result.error) {
                alert("Sign in error: " + result.error);
              } else if (result.ok) {
                // Sign in successful, you can redirect or close dialog
                if (onOpenChange) onOpenChange(false);
              }
            }}
          />
          <DialogFooter>
            <p className="text-sm text-neutral-500">
              {t("do-not-have-account")}{" "}
              <Link href="" className="font-semibold text-neutral-700">
                {t("do-not-have-account-action")}
              </Link>
            </p>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <PasswordRecoveryDialog
        open={isPasswordRecoveryDialogOpen}
        onOpenChange={setIsPasswordRecoveryDialogOpen}
      />
    </>
  );
}

type SignInFormProps = {
  onSubmit: (values: SignInFormValues) => Promise<void>;
  onClickForgotPassword: () => void;
};

function SignInForm({ onSubmit, onClickForgotPassword }: SignInFormProps) {
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
    <Form {...form}>
      <form
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

        <p className="mb-14 text-sm text-neutral-500">
          {t("forgot-password")}{" "}
          <button
            type="button"
            className="font-semibold text-neutral-700"
            onClick={onClickForgotPassword}
          >
            {t("forgot-password-action")}
          </button>
        </p>
        <div className="flex gap-6">
          <DialogClose asChild>
            <Button type="button" variant="muted">
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            loading={isLoading}
            type="submit"
            disabled={isLoading}
          >
            {t("sign-in")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
