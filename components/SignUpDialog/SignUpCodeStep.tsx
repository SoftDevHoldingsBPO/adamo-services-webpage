import { SixCodeSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import CountdownText from "@/components/CountdownText";
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

export const SignUpCodeFormSchema = z.object({
  code: SixCodeSchema,
});

export type SignUpCodeFormValues = z.infer<typeof SignUpCodeFormSchema>;

export function SignUpCodeStep() {
  const t = useTranslations("sign-up-dialog.code-step");

  const { setSignUpStep } = useSignUp();

  const form = useForm<SignUpCodeFormValues>({
    resolver: zodResolver(SignUpCodeFormSchema),
    defaultValues: {
      code: "",
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
          id="sign-up-code-step-form"
          onSubmit={form.handleSubmit((values) => {
            setSignUpStep("2fa");
          })}
        >
          <p className="text-neutral-700 mb-8">user@example.com</p>
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="mb-6">
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <CustomInputOTPGroup>
                      <CustomInputOTPSlot index={0} />
                      <CustomInputOTPSlot index={1} />
                      <CustomInputOTPSlot index={2} />
                      <CustomInputOTPSlot index={3} />
                      <CustomInputOTPSlot index={4} />
                      <CustomInputOTPSlot index={5} />
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
              initialSeconds={10}
              text={t("code-not-received-cooldown")}
              completedText={t("code-not-received-action")}
            />
          </div>
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="muted">{t("cancel")}</Button>
        </DialogClose>
        <Button type="submit" form="sign-up-code-step-form">
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
