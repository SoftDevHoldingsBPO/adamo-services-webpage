import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import VideoPlayer from "@/components/VideoPlayer";
import { ArrowRight } from "@/components/icon";
import AdamoPayHero from "@/components/sections/AdamoPayHero";
import AdamoPayMetrics from "@/components/sections/AdamoPayMetrics";
import ExchangeBanner from "@/components/sections/ExchangeBanner";
import FeatureParallax from "@/components/sections/FeatureParallax";
import PageParallax from "@/components/sections/PageParallax";
import { Button } from "@/components/ui/button";

export default function Page() {
  const t = useTranslations("adamoPay");
  const locale = useLocale();

  return (
    <>
      <AdamoPayHero />
      <ExchangeBanner className="pt-20 md:pt-16 lg:pt-24" />

      <VideoPlayer
        srcES="/video/Promo-ES.mp4"
        srcEN="/video/Promo-EN.mp4"
        className="mt-[112px] lg:mt-[130px] hidden md:block"
      />

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
              <Button asChild>
                <Link href="/blog/ai-and-ethics-in-financial-decision-making">
                  <span className="hidden md:block">
                    {t("paymentList.button")}
                  </span>
                  <span className="block md:hidden">
                    {t("paymentList.buttonMobile")}
                  </span>
                </Link>
              </Button>

              <Button asChild variant="link">
                <Link href="/blog">
                  {t("paymentList.link")} <ArrowRight className="-rotate-45" />
                </Link>
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
              src={
                locale === "es"
                  ? "/images/adamo-pay/payment-list.png"
                  : "/images/adamo-pay/payment-list-en.png"
              }
              alt="Payment list interface on desktop"
              width={552}
              height={684}
              priority
              quality={100}
            />
          </>
        }
      />

      <PageParallax
        className="py-20 md:pt-16 lg:pt-24 md:pb-0"
        title={t("pageParallax.title")}
        description={t("pageParallax.description")}
        pageImage={
          locale === "es"
            ? "/images/adamo-pay/page-parallax.png"
            : "/images/adamo-pay/page-parallax-en.png"
        }
      />

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
              <Button asChild>
                <Link href="/contact">
                  <span className="hidden md:block">
                    {t("paymentForm.button")}
                  </span>
                  <span className="block md:hidden">
                    {t("paymentForm.buttonMobile")}
                  </span>
                </Link>
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
              src={
                locale === "es"
                  ? "/images/adamo-pay/payment-form.png"
                  : "/images/adamo-pay/payment-form-en.png"
              }
              alt="Payment form interface on desktop"
              width={552}
              height={664}
              priority
              quality={100}
            />
          </>
        }
      />
      <AdamoPayMetrics className="md:mt-24" />
    </>
  );
}
