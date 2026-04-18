import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import z from "zod";

import { ComponentProps } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

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

export const Enter2FAFormSchema = z.object({
  code: SixCodeSchema,
});

export type Enter2FAFormValues = z.infer<typeof Enter2FAFormSchema>;

export type Enter2FADialogProps = ComponentProps<typeof Dialog> &
  Readonly<{
    onSubmit: (values: Enter2FAFormValues) => void;
    loading?: boolean;
  }>;

export function Enter2FADialog({
  open,
  onOpenChange,
  loading,
  onSubmit,
}: Enter2FADialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <Enter2FAContent
          loading={loading}
          onSubmit={onSubmit}
          open={open}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}

type Enter2FAContentProps = Enter2FADialogProps;

function Enter2FAContent({ loading, onSubmit }: Enter2FAContentProps) {
  const t = useTranslations("enter-2fa-dialog");

  const form = useForm<Enter2FAFormValues>({
    resolver: zodResolver(Enter2FAFormSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleEnter2FASubmit = async (values: Enter2FAFormValues) => {
    onSubmit(values);
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
          id="enter-2fa-form"
          onSubmit={form.handleSubmit(handleEnter2FASubmit)}
        >
          <fieldset disabled={loading} className="space-y-4">
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
                      onChange={(value) => {
                        field.onChange(value);
                        if (value.length === 6) {
                          form.handleSubmit(handleEnter2FASubmit)();
                        }
                      }}
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
            {t("cancel")}
          </Button>
        </DialogClose>
        <Button
          type="submit"
          form="enter-2fa-form"
          loading={loading}
          disabled={!form.formState.isValid || loading}
        >
          {t("confirm")}
        </Button>
      </DialogFooter>
    </>
  );
}
