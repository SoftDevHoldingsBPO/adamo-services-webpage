import { useDisable2FA } from "@/features/profile/contexts/disable-2fa.context";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Disable2FAStartStep() {
  const { setDisable2FAStepWithCallback } = useDisable2FA();

  const t = useTranslations("disable-2fa-dialog.start");

  return (
    <>
      <DialogHeader>
        <DialogTitle>{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="muted">{t("cancel")}</Button>
        </DialogClose>
        <Button
          variant="destructive-medium"
          onClick={() => setDisable2FAStepWithCallback("code")}
        >
          {t("disable")}
        </Button>
      </DialogFooter>
    </>
  );
}
