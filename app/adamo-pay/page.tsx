import { useTranslations } from "next-intl";
import Image from "next/image";

import { ArrowRight } from "@/components/icon";
import AdamoPayHero from "@/components/sections/AdamoPayHero";
import ExchangeBanner from "@/components/sections/ExchangeBanner";
import FeatureBlock from "@/components/sections/FeatureBlock";
import FeatureParallax from "@/components/sections/FeatureParallax";
import PageParallax from "@/components/sections/PageParallax";
import { Button } from "@/components/ui/button";

export default function Page() {
  const t = useTranslations("adamoPay");

  return (
    <>
      <AdamoPayHero />
      <FeatureBlock
        className="my-10"
        title={t("feature1.title")}
        description={t("feature1.description")}
      />
      <ExchangeBanner />
      <FeatureParallax
        className="md:mt-[104px]"
        textContent={
          <>
            <h2 className="text-[17px] font-semibold">
              {t("paymentList.title")}
            </h2>
            <p className="mt-4 md:mt-8 text-sm md:text-base">
              {t("paymentList.description")}
            </p>
            <div className="flex items-center gap-6 mt-14">
              <Button>
                <span className="hidden md:block">
                  {t("paymentList.button")}
                </span>
                <span className="block md:hidden">
                  {t("paymentList.buttonMobile")}
                </span>
              </Button>
              <Button variant="link">
                {t("paymentList.link")} <ArrowRight className="-rotate-45" />
              </Button>
            </div>
          </>
        }
        imageContent={
          <>
            <Image
              className="sm:hidden rounded-xl drop-shadow-parallax"
              src="/images/adamo-pay/payment-list-mobile.png"
              alt="Payment list interface on mobile device"
              width={345}
              height={428}
              priority
              quality={100}
            />
            <Image
              className="hidden sm:block lg:hidden drop-shadow-parallax"
              src="/images/adamo-pay/payment-list-tablet.png"
              alt="Payment list interface on tablet device"
              width={896}
              height={684}
              priority
              quality={100}
            />
            <Image
              className="hidden lg:block drop-shadow-parallax"
              src="/images/adamo-pay/payment-list.png"
              alt="Payment list interface on desktop"
              width={552}
              height={684}
              priority
              quality={100}
            />
          </>
        }
      />

      <FeatureBlock
        title={t("feature2.title")}
        description={t("feature2.description")}
      />

      <PageParallax pageImage="/images/adamo-pay/page-parallax.png" />

      <FeatureParallax
        className="md:mt-[104px]"
        textContent={
          <>
            <h2 className="text-[17px] font-semibold">
              {t("paymentForm.title")}
            </h2>
            <p className="mt-4 md:mt-8 text-sm md:text-base">
              {t("paymentForm.description")}
            </p>
            <div className="flex items-center gap-6 mt-14">
              <Button>
                <span className="hidden md:block">
                  {t("paymentForm.button")}
                </span>
                <span className="block md:hidden">
                  {t("paymentForm.buttonMobile")}
                </span>
              </Button>
            </div>
          </>
        }
        imageContent={
          <>
            <Image
              className="sm:hidden rounded-xl drop-shadow-parallax"
              src="/images/adamo-pay/payment-form-mobile.png"
              alt="Payment form interface on mobile device"
              width={345}
              height={418}
              priority
              quality={100}
            />
            <Image
              className="hidden sm:block lg:hidden drop-shadow-parallax"
              src="/images/adamo-pay/payment-form-tablet.png"
              alt="Payment form interface on tablet device"
              width={896}
              height={664}
              priority
              quality={100}
            />
            <Image
              className="hidden lg:block drop-shadow-parallax"
              src="/images/adamo-pay/payment-form.png"
              alt="Payment form interface on desktop"
              width={552}
              height={664}
              priority
              quality={100}
            />
          </>
        }
      />
    </>
  );
}
