import { SixCodeSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { QrCode } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { useSignUp } from "@/components/SignUpDialog/SignUpContext";
import { Button } from "@/components/ui/button";
import {
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

export const SignUp2FAFormSchema = z.object({
  code: SixCodeSchema,
});

export type SignUp2FAFormValues = z.infer<typeof SignUp2FAFormSchema>;

export function SignUp2FA() {
  const t = useTranslations("sign-up-dialog.2fa-step");

  const { setSignUpStep, setIs2FADialogActivatedOpen, setIsSignUpDialogOpen } =
    useSignUp();

  const form = useForm<SignUp2FAFormValues>({
    resolver: zodResolver(SignUp2FAFormSchema),
    defaultValues: {
      code: "",
    },
  });

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
          id="sign-up-2fa-step-form"
          onSubmit={form.handleSubmit((values) => {
            setSignUpStep("information");
            setIs2FADialogActivatedOpen(true);
            setIsSignUpDialogOpen(false);
          })}
        >
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
                  {t("instructions.two", { code: "KCCW UJSD TTSC QWED" })}
                </p>
                <QrCode className="w-24 h-24" />
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
        </form>
      </Form>
      <DialogFooter>
        <Button type="submit" form="sign-up-2fa-step-form">
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
