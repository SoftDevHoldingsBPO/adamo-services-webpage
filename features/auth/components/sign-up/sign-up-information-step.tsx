"use client";

import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { useSignUp } from "@/features/auth/contexts/sign-up.context";
import { withPasswordConfirmation } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

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
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocaleSelect from "@/components/ui/locale-select";

export const SignUpInformationFormSchema = withPasswordConfirmation(
  z.object({
    names: z.string().min(1),
    lastNames: z.string().min(1),
    email: z.string().email(),
  }),
);

export type SignUpInformationFormValues = z.infer<
  typeof SignUpInformationFormSchema
>;

export function SignUpInformationStep() {
  const t = useTranslations("sign-up-dialog.information-step");

  const { setSignUpStep, setEmail } = useSignUp();

  const form = useForm<SignUpInformationFormValues>({
    resolver: zodResolver(SignUpInformationFormSchema),
    defaultValues: {
      names: "",
      lastNames: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: signUp, isPending: isPendingSignUp } = useMutation({
    mutationFn: AuthService.signUp,
    onSuccess: (_, { email }) => {
      setEmail(email);
      setSignUpStep("code");
    },
    onError: (error) => {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    },
  });

  const handleSignUpInformationSubmit = async (
    values: SignUpInformationFormValues,
  ) => {
    await signUp({
      name: values.names,
      surname: values.lastNames,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    });
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
          id="sign-up-information-step-form"
          onSubmit={form.handleSubmit(handleSignUpInformationSubmit)}
        >
          <fieldset disabled={isPendingSignUp} className="space-y-4">
            <FormField
              control={form.control}
              name="names"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      isError={!!form.formState.errors.names}
                      placeholder={t("placeholders.names")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastNames"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      isError={!!form.formState.errors.lastNames}
                      placeholder={t("placeholders.last-names")}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      type="email"
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
                      isError={!!form.formState.errors.password}
                      placeholder={t("placeholders.password")}
                      type="password"
                    />
                  </FormControl>
                  <FormDescription>
                    {t("descriptions.password")}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      isError={!!form.formState.errors.confirmPassword}
                      placeholder={t("placeholders.confirm-password")}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          form="sign-up-information-step-form"
          loading={isPendingSignUp}
        >
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
