import { withPasswordConfirmation } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { useSignUp } from "@/components/SignUpDialog/SignUpContext";
import { Button } from "@/components/ui/button";
import {
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

  const { setSignUpStep } = useSignUp();

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
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="sign-up-information-step-form"
          onSubmit={form.handleSubmit((values) => {
            setSignUpStep("code");
          })}
          className="space-y-4"
        >
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
                <FormDescription>{t("descriptions.password")}</FormDescription>
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
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="muted">{t("cancel")}</Button>
        </DialogClose>
        <Button type="submit" form="sign-up-information-step-form">
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
