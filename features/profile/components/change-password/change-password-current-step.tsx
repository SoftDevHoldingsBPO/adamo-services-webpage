import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { PasswordSchema } from "@/features/auth/schemas/auth.schema";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import LocaleSelect from "@/components/ui/locale-select";

export const ChangePasswordCurrentFormSchema = z.object({
  currentPassword: PasswordSchema,
});

export type ChangePasswordCurrentFormValues = z.infer<
  typeof ChangePasswordCurrentFormSchema
>;

export function ChangePasswordCurrentStep() {
  const t = useTranslations("change-password-dialog.current-step");

  const { setCurrentPassword, setChangePasswordStep } = useChangePassword();

  const form = useForm<ChangePasswordCurrentFormValues>({
    resolver: zodResolver(ChangePasswordCurrentFormSchema),
    defaultValues: {
      currentPassword: "",
    },
  });

  const { mutateAsync: verifyPassword, isPending: isPendingVerifyPassword } =
    useMutation({
      mutationFn: AuthService.verifyPassword,
      onSuccess: (_, { password }) => {
        setCurrentPassword(password);
        setChangePasswordStep("new");
      },
      onError: (error) => {
        ToastManager.show({
          variant: "destructive",
          message: getFirstAxiosErrorMessage(error),
        });
      },
    });

  const handleVerifyPassword = async (
    values: ChangePasswordCurrentFormValues,
  ) => {
    await verifyPassword({ password: values.currentPassword });
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
          id="change-password-current-step-form"
          onSubmit={form.handleSubmit(handleVerifyPassword)}
        >
          <fieldset disabled={isPendingVerifyPassword} className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("label")}</FormLabel>
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
          form="change-password-current-step-form"
          disabled={!form.formState.isValid || isPendingVerifyPassword}
          loading={isPendingVerifyPassword}
        >
          {t("continue")}
        </Button>
      </DialogFooter>
    </>
  );
}
