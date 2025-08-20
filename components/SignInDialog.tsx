"use client";

import { z } from "@/i18n/zod-i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps, ReactNode } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import Link from "next/link";

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
  const t = useTranslations("sign-in-dialog");

  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
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
        <SignInForm onSubmit={console.log} />
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
  );
}

type SignInFormProps = {
  onSubmit: (values: SignInFormValues) => void;
};

function SignInForm({ onSubmit }: SignInFormProps) {
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
        onSubmit={form.handleSubmit((values) => {
          onSubmit(values);
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
          <Link href="" className="font-semibold text-neutral-700">
            {t("forgot-password-action")}
          </Link>
        </p>
        <div className="flex gap-6">
          <DialogClose asChild>
            <Button type="button" variant="muted">
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button type="submit" disabled={!form.formState.isValid}>
            {t("sign-in")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
