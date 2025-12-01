import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import { useDisable2FA } from "@/features/profile/contexts/disable-2fa.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

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
import {
  CustomInputOTPGroup,
  CustomInputOTPSlot,
  InputOTP,
} from "@/components/ui/input-otp";
import LocaleSelect from "@/components/ui/locale-select";

export const Enter2FAFormSchema = z.object({
  code: SixCodeSchema,
});

export type Enter2FAFormValues = z.infer<typeof Enter2FAFormSchema>;

export function Disable2FACodeStep() {
  const { setDisable2FAStepWithCallback } = useDisable2FA();

  const form = useForm<Enter2FAFormValues>({
    resolver: zodResolver(Enter2FAFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleEnter2FASubmit = async (values: Enter2FAFormValues) => {
    setDisable2FAStepWithCallback("disabled");
  };

  return (
    <>
      <DialogHeader>
        <div className="md:hidden flex gap-2 items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DialogClose>
              <ArrowLeft />
            </DialogClose>
            <DialogTitle>Desactivar 2FA</DialogTitle>
          </div>
          <LocaleSelect />
        </div>
        <DialogClose asChild className="hidden md:flex">
          <DialogBack />
        </DialogClose>
        <DialogTitle className="hidden md:block">Desactivar 2FA</DialogTitle>
        <DialogDescription>
          Ingresa el código de 6 dígitos brindado por la aplicación de
          Autenticación.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          id="enter-2fa-form"
          onSubmit={form.handleSubmit(handleEnter2FASubmit)}
        >
          <fieldset className="space-y-4">
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
          </fieldset>
        </form>
      </Form>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="muted">
            Cancel
          </Button>
        </DialogClose>
        <Button
          type="submit"
          form="enter-2fa-form"
          disabled={!form.formState.isValid}
        >
          Desactivar 2FA
        </Button>
      </DialogFooter>
    </>
  );
}
