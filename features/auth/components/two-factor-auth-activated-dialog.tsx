import { ComponentProps } from "react";

import { useTranslations } from "next-intl";

import { Alert, AlertDescription } from "@/components/ui/alert";
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

export type TwoFactorAuthActivatedDialogProps = ComponentProps<typeof Dialog>;

export function TwoFactorAuthActivatedDialog({
  open,
  onOpenChange,
  ...props
}: TwoFactorAuthActivatedDialogProps) {
  const t = useTranslations("2fa-activated");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>
        <Alert variant="success">
          <AlertDescription>{t("content")}</AlertDescription>
        </Alert>
        <DialogFooter>
          <DialogClose asChild>
            <Button>{t("confirm")}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
