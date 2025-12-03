import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import AuthService from "@/features/auth/services/auth.service";
import { useEnable2FA } from "@/features/profile/contexts/enable-2fa.context";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useEffect, useState } from "react";
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

export const Enable2FASetupFormSchema = z.object({
  code: SixCodeSchema,
});

export type Enable2FASetupFormValues = z.infer<typeof Enable2FASetupFormSchema>;

export function Enable2FASetupStep() {
  const [code, setCode] = useState<string | null>(null);
  const [base64QrCode, setBase64QrCode] = useState<string | null>(null);

  const t = useTranslations("enable-2fa-dialog.setup");
  const tCommon = useTranslations("common");

  const { setEnable2FAStep, setIsEnable2FADialogOpen } = useEnable2FA();

  const form = useForm<Enable2FASetupFormValues>({
    resolver: zodResolver(Enable2FASetupFormSchema),
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

  const { mutateAsync: verify2FA, isPending } = useMutation({
    mutationFn: AuthService.verify2FA,
    onSuccess: () => {
      setEnable2FAStep("enabled");
    },
    onError: (error) => {
      ToastManager.show({
        variant: "destructive",
        message: getFirstAxiosErrorMessage(error),
      });
    },
  });

  useEffect(() => {
    setup2FA({});
  }, []);

  const handleSetup2FASubmit = async (values: Enable2FASetupFormValues) => {
    await verify2FA({
      accessToken: "",
      code: values.code,
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
          </div>
          <DialogTitle>{t("title")}</DialogTitle>
          <LocaleSelect />
        </div>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="enable-2fa-setup-form"
          onSubmit={form.handleSubmit(handleSetup2FASubmit)}
        >
          <fieldset disabled={isPending}>
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
          form="enable-2fa-setup-form"
          disabled={!form.formState.isValid}
        >
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
