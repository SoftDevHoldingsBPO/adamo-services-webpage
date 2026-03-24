import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { PasswordSchema } from "@/features/auth/schemas/auth.schema";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocaleSelect from "@/components/ui/locale-select";

export const ChangePasswordFormSchema = z
  .object({
    currentPassword: z.string().min(1),
    newPassword: PasswordSchema,
    confirmNewPassword: PasswordSchema,
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    params: { i18n: { key: "errors.confirm_password" } },
    path: ["confirmNewPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    params: { i18n: { key: "errors.new_password_same" } },
    path: ["newPassword"],
  });

export type ChangePasswordFormValues = z.infer<typeof ChangePasswordFormSchema>;

export type ChangePasswordFormProps = Readonly<{
  onPasswordChanged?: () => void;
}>;

export function ChangePasswordForm({
  onPasswordChanged,
}: ChangePasswordFormProps) {
  const t = useTranslations("change-password-dialog");

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { mutateAsync: updatePassword, isPending: isPendingUpdatePassword } =
    useMutation({
      mutationFn: AuthService.updatePassword,
      onSuccess: () => {
        ToastManager.show({
          variant: "success",
          message: t("success"),
        });

        if (onPasswordChanged) onPasswordChanged();
      },
      onError: (error) => {
        ToastManager.show({
          variant: "destructive",
          message: getFirstAxiosErrorMessage(error),
        });
      },
    });

  const handleUpdatePassword = async (values: ChangePasswordFormValues) => {
    await updatePassword(values);
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
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="change-password-form"
          onSubmit={form.handleSubmit(handleUpdatePassword)}
        >
          <fieldset disabled={isPendingUpdatePassword} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("currentPasswordLabel")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("newPasswordLabel")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>{t("passwordRequirements")}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("confirmPasswordLabel")}</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
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
          form="change-password-form"
          disabled={isPendingUpdatePassword}
          loading={isPendingUpdatePassword}
        >
          {t("save")}
        </Button>
      </DialogFooter>
    </>
  );
}
