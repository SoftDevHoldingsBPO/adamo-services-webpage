import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { ArrowRight } from "../icon";
import { Button } from "../ui/button";

interface AdamoPayMetricsProps extends React.HTMLAttributes<HTMLDivElement> {}

const AdamoPayMetrics = ({ className }: AdamoPayMetricsProps) => {
  const t = useTranslations("adamoPay.metrics");

  return (
    <div className="mb-12">
      <div className={cn("max-w-[1296px] mx-auto md:px-8 relative", className)}>
        <div className="bg-adamo-pay-600 py-14 px-6 md:rounded-4xl md:pb-[296px] md:px-8 xl:pt-[104px] xl:pb-[288px] xl:px-12 relative">
          <h2 className="heading-2 text-white md:text-center">{t("title")}</h2>

          <div className="flex justify-center mt-8">
            <Button variant="ghost">
              {t("button")} <ArrowRight />
            </Button>
          </div>

          <Image
            src="/images/adamo-pay/metrics.svg"
            alt="Adamo Pay Metrics"
            width={780}
            height={320}
            className="mt-8 drop-shadow-xl md:absolute bottom-[-80px] inset-x-0 mx-auto md:mt-0"
          />
        </div>
      </div>

      <div className="bg-adamo-pay-700 py-14 px-4 md:pt-[264px] md:pb-[120px] lg:pt-[376px] lg:pb-20 md:-mt-6 lg:-mt-[144px] md:rounded-bl-[48px] md:rounded-br-[48px]">
        <div className="max-w-[1232px] mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <h2 className="heading-2 text-white lg:py-10">{t("ctaTitle")}</h2>
            <div className="py-6 lg:py-10">
              <p className="text-white md:text-lg">{t("ctaDescription")}</p>
              <Button variant="secondary" className="mt-14 md:mt-8">
                {t("ctaButton")} <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdamoPayMetrics;
