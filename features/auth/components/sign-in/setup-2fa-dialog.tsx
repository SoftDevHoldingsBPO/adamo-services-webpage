import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useMediaQuery } from "usehooks-ts";
import z from "zod";

import { ComponentProps, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
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
import { Skeleton } from "@/components/ui/skeleton";

export const Setup2FAFormSchema = z.object({
  code: SixCodeSchema,
});

export type Setup2FAFormValues = z.infer<typeof Setup2FAFormSchema>;

export type Setup2FADialogProps = ComponentProps<typeof Dialog> &
  Readonly<{
    accessToken: string;
  }>;

export function Setup2FADialog({
  accessToken,
  open,
  onOpenChange,
}: Setup2FADialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <Setup2FAContent
          accessToken={accessToken}
          open={open}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}

type Setup2FAContentProps = Setup2FADialogProps;

function Setup2FAContent({ accessToken, onOpenChange }: Setup2FAContentProps) {
  const [code, setCode] = useState<string | null>(null);
  const [base64QrCode, setBase64QrCode] = useState<string | null>(null);

  const t = useTranslations("setup-2fa-dialog");
  const tCommon = useTranslations("common");

  const form = useForm<Setup2FAFormValues>({
    resolver: zodResolver(Setup2FAFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const { mutateAsync: setup2FA } = useMutation({
    mutationFn: AuthService.setup2FA,
    onSuccess: (setup2FAResponse) => {
      setCode(setup2FAResponse.data.base32);
      setBase64QrCode(setup2FAResponse.data.qr);
    },
    onError: (error) => {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    },
  });

  const { mutateAsync: verify2FA, isPending: isPendingVerify2FA } = useMutation(
    {
      mutationFn: AuthService.verify2FA,
      onSuccess: () => {
        ToastManager.show({
          variant: "success",
          message: t("success"),
        });

        if (onOpenChange) onOpenChange(false);
      },
      onError: (error) => {
        ToastManager.show({
          variant: "destructive",
          message: getFirstAxiosErrorMessage(error),
        });
      },
    },
  );

  useEffect(() => {
    if (!accessToken) return;

    setup2FA({ accessToken });
  }, [accessToken]);

  const handleSetup2FASubmit = async (values: Setup2FAFormValues) => {
    await verify2FA({
      accessToken,
      code: values.code,
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
          id="setup-2fa-form"
          onSubmit={form.handleSubmit(handleSetup2FASubmit)}
        >
          <fieldset disabled={isPendingVerify2FA}>
            <ul className="flex flex-col gap-8 w-full">
              <li className="flex gap-2 w-full">
                <div className="text-sm text-neutral-700 font-medium grid place-content-center border border-neutral-300 bg-neutral-100 size-7 aspect-square rounded-full">
                  1
                </div>
                <p className="text-neutral-500">{t("instructions.one")}</p>
              </li>
              <li className="flex gap-2 w-full">
                <div className="text-sm text-neutral-700 font-medium grid place-content-center border border-neutral-300 bg-neutral-100 size-7 aspect-square rounded-full">
                  2
                </div>
                <div className="flex flex-col">
                  <p className="text-neutral-500 mb-4">
                    {t("instructions.two", {
                      code: code ?? tCommon("loading"),
                    })}
                  </p>
                  {!base64QrCode && <Skeleton className="w-24 h-24" />}
                  {base64QrCode && (
                    <img src={base64QrCode} className="w-24 h-24" />
                  )}
                </div>
              </li>
              <li className="flex gap-2 w-full">
                <div className="text-sm text-neutral-700 font-medium grid place-content-center border border-neutral-300 bg-neutral-100 size-7 aspect-square rounded-full">
                  3
                </div>
                <div className="flex flex-col w-full">
                  <p className="text-neutral-500 mb-4">
                    {t("instructions.three")}
                  </p>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP
                            maxLength={6}
                            pattern={REGEXP_ONLY_DIGITS}
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
                </div>
              </li>
            </ul>
          </fieldset>
        </form>
      </Form>
      <DialogFooter>
        <Button
          type="submit"
          form="setup-2fa-form"
          disabled={!form.formState.isValid || isPendingVerify2FA}
          loading={isPendingVerify2FA}
        >
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
