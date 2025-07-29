"use client";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { InfoIcon } from "@/components/icon";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LegalSection() {
  const t = useTranslations("adamoSign");
  const [open, setOpen] = useState(false);

  return (
    <div className="py-20 max-w-[1232px] mx-auto px-4">
      <div className="flex items-center gap-3 py-2">
        <h2 className="font-semibold text-neutral-700 font-display text-[17px] leading-[21px]">
          {t("legal")}
        </h2>

        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger onClick={() => setOpen(true)}>
            <InfoIcon className="text-neutral-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{t.rich("legalTooltip", { br: () => <br /> })}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
