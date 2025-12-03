import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { PasswordWithConfirmationSchema } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { useChangePassword } from "@/features/profile/contexts/change-password.context";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocaleSelect from "@/components/ui/locale-select";

export const ChangePasswordNewFormSchema = PasswordWithConfirmationSchema;

export type ChangePasswordNewFormValues = z.infer<
  typeof ChangePasswordNewFormSchema
>;

export type ChangePasswordNewStepProps = Readonly<{
  onPasswordChanged?: () => void;
}>;

export function ChangePasswordNewStep({
  onPasswordChanged,
}: ChangePasswordNewStepProps) {
  const t = useTranslations("change-password-dialog.new-step");

  const { currentPassword, setIsChangePasswordDialogOpen } =
    useChangePassword();

  const form = useForm<ChangePasswordNewFormValues>({
    resolver: zodResolver(ChangePasswordNewFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { mutateAsync: updatePassword, isPending } = useMutation({
    mutationFn: AuthService.updatePassword,
    onSuccess: () => {
      ToastManager.show({
        variant: "success",
        message: t("success"),
      });

      setIsChangePasswordDialogOpen(false);

      if (onPasswordChanged) onPasswordChanged();
    },
    onError: (error) => {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    },
  });

  const handleUpdatePassword = async (values: ChangePasswordNewFormValues) => {
    await updatePassword({
      currentPassword,
      newPassword: values.password,
      confirmNewPassword: values.confirmPassword,
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
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="change-password-new-step-form"
          onSubmit={form.handleSubmit(handleUpdatePassword)}
        >
          <fieldset disabled={isPending} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
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
              name="confirmPassword"
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
          form="change-password-new-step-form"
          loading={isPending}
        >
          {t("save")}
        </Button>
      </DialogFooter>
    </>
  );
}
