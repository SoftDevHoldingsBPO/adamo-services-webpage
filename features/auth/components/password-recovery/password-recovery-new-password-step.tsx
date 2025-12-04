import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { usePasswordRecovery } from "@/features/auth/contexts/password-recovery.context";
import { PasswordWithConfirmationSchema } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

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

export const PasswordRecoveryNewPasswordFormSchema =
  PasswordWithConfirmationSchema;

export type PasswordRecoveryNewPasswordFormValues = z.infer<
  typeof PasswordRecoveryNewPasswordFormSchema
>;

export type PasswordRecoveryNewPasswordStepProps = Readonly<{
  onPasswordChanged?: () => void;
}>;

export function PasswordRecoveryNewPasswordStep({
  onPasswordChanged,
}: PasswordRecoveryNewPasswordStepProps) {
  const t = useTranslations("password-recovery-dialog.new-password-step");

  const { email, tempPassword, setIsPasswordRecoveryDialogOpen } =
    usePasswordRecovery();

  const form = useForm<PasswordRecoveryNewPasswordFormValues>({
    resolver: zodResolver(PasswordRecoveryNewPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: resetPassword, isPending: isPendingResetPassword } =
    useMutation({
      mutationFn: AuthService.resetPassword,
      onSuccess: () => {
        ToastManager.show({
          variant: "success",
          message: t("success"),
        });

        setIsPasswordRecoveryDialogOpen(false);

        if (onPasswordChanged) onPasswordChanged();
      },
      onError: (error) => {
        ToastManager.show({
          variant: "destructive",
          message: getFirstAxiosErrorMessage(error),
        });
      },
    });

  const handleChangePassword = async (
    values: PasswordRecoveryNewPasswordFormValues,
  ) => {
    await resetPassword({
      email,
      temporaryPassword: tempPassword,
      newPassword: values.password,
      confirmPassword: values.confirmPassword,
    });
  };

  return (
    <>
      <DialogHeader>
        <div className="md:hidden flex gap-2 items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DialogTitle>{t("title")}</DialogTitle>
          </div>
          <LocaleSelect />
        </div>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="password-recovery-new-password-step-form"
          onSubmit={form.handleSubmit(handleChangePassword)}
        >
          <fieldset disabled={isPendingResetPassword} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("placeholders.password")}
                      isError={!!form.formState.errors.password}
                      {...field}
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
                <FormItem className="mb-6">
                  <FormControl>
                    <Input
                      type="password"
                      isError={!!form.formState.errors.confirmPassword}
                      placeholder={t("placeholders.confirm-password")}
                      {...field}
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
          form="password-recovery-new-password-step-form"
          disabled={!form.formState.isValid || isPendingResetPassword}
          loading={isPendingResetPassword}
        >
          {t("change-password")}
        </Button>
      </DialogFooter>
    </>
  );
}
