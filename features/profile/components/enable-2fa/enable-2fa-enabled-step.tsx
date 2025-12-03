import { ArrowLeft } from "lucide-react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LocaleSelect from "@/components/ui/locale-select";

export function Enable2FAEnabledStep() {
  const t = useTranslations("enable-2fa-dialog.enabled");

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
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-neutral-500">{t("successMessage")}</p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="muted">
            {t("accept")}
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
