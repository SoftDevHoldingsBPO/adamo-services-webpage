import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import z from "zod";

import { ComponentProps } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import CountdownText from "@/components/CountdownText";
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
import {
  CustomInputOTPGroup,
  CustomInputOTPSlot,
  InputOTP,
} from "@/components/ui/input-otp";
import LocaleSelect from "@/components/ui/locale-select";

export const VerifyEmailFormSchema = z.object({
  code: SixCodeSchema,
});

export type VerifyEmailFormValues = z.infer<typeof VerifyEmailFormSchema>;

export type VerifyEmailDialogProps = ComponentProps<typeof Dialog> &
  Readonly<{
    email: string;
    onEmailVerified: () => void;
  }>;

export function VerifyEmailDialog({
  email,
  open,
  onOpenChange,
  onEmailVerified,
}: VerifyEmailDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <VerifyEmailContent email={email} onEmailVerified={onEmailVerified} />
      </DialogContent>
    </Dialog>
  );
}

type VerifyEmailContentProps = VerifyEmailDialogProps;

function VerifyEmailContent({
  email,
  onEmailVerified,
}: VerifyEmailContentProps) {
  const t = useTranslations("verify-email-dialog");

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(VerifyEmailFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutateAsync: verifyEmail, isPending: isPendingVerifyEmail } =
    useMutation({
      mutationFn: AuthService.verifyEmail,
      onSuccess: () => {
        ToastManager.show({
          variant: "success",
          message: t("success"),
        });

        onEmailVerified();
      },
      onError: (error) => {
        ToastManager.show({
          variant: "destructive",
          message: getFirstAxiosErrorMessage(error),
        });
      },
    });

  const handleVerifyEmail = async (values: VerifyEmailFormValues) => {
    await verifyEmail({
      email,
      otp: values.code,
    });
  };

  const handleResendCode = async () => {
    await AuthService.resendCode({ email, email_type: "new_register" });
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
          id="verify-email-form"
          onSubmit={form.handleSubmit(handleVerifyEmail)}
        >
          <fieldset disabled={isPendingVerifyEmail} className="space-y-4">
            <p className="text-neutral-700 mb-8">{email}</p>
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                      {...field}
                    >
                      <CustomInputOTPGroup>
                        <CustomInputOTPSlot
                          index={0}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={1}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={2}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={3}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={4}
                          isError={!!form.formState.errors.code}
                        />
                        <CustomInputOTPSlot
                          index={5}
                          isError={!!form.formState.errors.code}
                        />
                      </CustomInputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2 items-center">
              <p className="text-sm text-neutral-500">
                {t("code-not-received")}{" "}
              </p>
              <CountdownText
                initialSeconds={59}
                text={t("code-not-received-cooldown")}
                completedText={t("code-not-received-action")}
                onCompletedClick={handleResendCode}
              />
            </div>
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
          form="verify-email-form"
          disabled={!form.formState.isValid || isPendingVerifyEmail}
          loading={isPendingVerifyEmail}
        >
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
