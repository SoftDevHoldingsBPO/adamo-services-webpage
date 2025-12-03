import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  DialogBack,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LocaleSelect from "@/components/ui/locale-select";

export function Disable2FADisabledStep() {
  const t = useTranslations("disable-2fa-dialog.disabled");

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
        <DialogClose asChild className="hidden md:flex">
          <DialogBack />
        </DialogClose>
        <DialogTitle className="hidden md:block">{t("title")}</DialogTitle>
        <DialogDescription>{t("description")}</DialogDescription>
      </DialogHeader>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-neutral-500">{t("warningMessage")}</p>
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
