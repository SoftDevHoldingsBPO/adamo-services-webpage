import { useTranslations } from "next-intl";

import { InfoIcon } from "@/components/icon";

export function LegalSection() {
  const t = useTranslations("adamoSign");

  return (
    <div className="py-20 max-w-[1232px] mx-auto px-4">
      <div className="flex items-center gap-3 py-2">
        <h2 className="font-semibold text-neutral-700 font-display text-[17px] leading-[21px]">
          {t("legal")}
        </h2>

        <InfoIcon className="text-neutral-400" />
      </div>
    </div>
  );
}
