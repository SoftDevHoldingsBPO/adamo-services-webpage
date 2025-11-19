import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { usePasswordRecovery } from "@/features/auth/contexts/password-recovery.context";
import { EmailSchema } from "@/features/auth/schemas/auth.schema";
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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocaleSelect from "@/components/ui/locale-select";

export const PasswordRecoveryFormSchema = z.object({
  email: EmailSchema,
});

export type PasswordRecoveryFormValues = z.infer<
  typeof PasswordRecoveryFormSchema
>;

export function PasswordRecoveryEmailStep() {
  const t = useTranslations("password-recovery-dialog.email-step");

  const { setEmail, setPasswordRecoveryStep } = usePasswordRecovery();

  const form = useForm<PasswordRecoveryFormValues>({
    resolver: zodResolver(PasswordRecoveryFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const {
    mutateAsync: startRecoverPassword,
    isPending: isPendingRecoverPassword,
  } = useMutation({
    mutationFn: AuthService.recoverPassword,
    onSuccess: (_, { email }) => {
      setEmail(email);
      setPasswordRecoveryStep("code");
    },
    onError: (error) => {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    },
  });

  const handleStartRecoverPassword = async (
    values: PasswordRecoveryFormValues,
  ) => {
    await startRecoverPassword({ email: values.email });
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
        <DialogClose>
          <DialogBack className="hidden md:block" />
        </DialogClose>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="password-recovery-email-step-form"
          onSubmit={form.handleSubmit(handleStartRecoverPassword)}
        >
          <fieldset disabled={isPendingRecoverPassword} className="space-y-4">
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
          form="password-recovery-email-step-form"
          loading={isPendingRecoverPassword}
          disabled={!form.formState.isValid || isPendingRecoverPassword}
        >
          {t("recover-password")}
        </Button>
      </DialogFooter>
    </>
  );
}
