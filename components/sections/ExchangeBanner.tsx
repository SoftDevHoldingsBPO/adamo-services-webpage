import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { ArrowRight } from "../icon";
import SwapHorizIcon from "../icon/SwapHorizIcon";
import { Button } from "../ui/button";
import IntroSection from "./IntroSection";

interface ExchangeBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

const ExchangeBanner = ({ className }: ExchangeBannerProps) => {
  const t = useTranslations("adamoPay.exchangeBanner");

  return (
    <div id="exchange-banner" className={cn(className)}>
      <IntroSection
        title={t("introTitle")}
        description={t("introDescription")}
      />
      <section
        aria-labelledby="exchange-banner-title"
        className={"max-w-[1264px] mx-auto md:px-4 mt-10 md:mt-24"}
      >
        <div className="p-6 pb-12 bg-adamo-pay-600 grid grid-cols-1 md:grid-cols-[312px_1fr] gap-[52px] md:items-center md:gap-6 lg:gap-12 lg:grid-cols-[464px_1fr]  md:rounded-4xl">
          <div className="relative w-full h-[280px] ">
            <Image
              fill
              src="/images/adamo-pay/exchange-banner-mobile.png"
              alt="Exchange Banner"
              className="object-cover rounded-3xl object-left-top block md:hidden"
              quality={100}
            />

            <Image
              fill
              src="/images/adamo-pay/exchange-banner-desktop.png"
              alt="Exchange Banner"
              className="object-cover rounded-3xl object-left-top hidden md:block"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            <div className="absolute inset-x-0 -bottom-3 md:-bottom-4 bg-white rounded-2xl p-4 max-w-[415px] mx-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-adamo-pay-100">
                    <SwapHorizIcon aria-hidden="true" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t("exchangeTitle")}</p>
                    <p className="text-sm text-neutral-400">
                      {t("exchangeDescription")}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{t("exchangeAmount")}</p>
                  <p className="text-sm text-neutral-400">
                    {t("exchangeDate")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <h2
              id="exchange-banner-title"
              className="heading-2 text-white max-w-xl"
            >
              {t("title")}
            </h2>

            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-12 md:gap-6 lg:gap-12">
              <Image
                src="/images/adamo-pay/flags.svg"
                alt="Exchange Banner"
                width={136}
                height={56}
              />

              <Button variant="ghost">
                {t("button")} <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExchangeBanner;
