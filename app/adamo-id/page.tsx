import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import VideoPlayer from "@/components/VideoPlayer";
import { ArrowRight } from "@/components/icon";
import AdamoIdHero from "@/components/sections/AdamoIdHero";
import FeatureParallax from "@/components/sections/FeatureParallax";
import IDBanner from "@/components/sections/IDBanner";
import PageParallax from "@/components/sections/PageParallax";
import { Button } from "@/components/ui/button";

export default function Page() {
  const t = useTranslations("adamoId");
  const locale = useLocale();

  return (
    <>
      <AdamoIdHero />
      <IDBanner className="pt-20 md:pt-16 lg:pt-24" />

      <VideoPlayer
        srcES="/video/AdamoId-ES.mp4"
        srcEN="/video/AdamoId-EN.mp4"
        className="mt-[112px] lg:mt-[130px] hidden md:block"
      />

      <FeatureParallax
        className="md:mt-[104px]"
        textContent={
          <>
            <h2 className="text-[17px] font-semibold">{t("idFlow.title")}</h2>
            <p className="mt-4 md:mt-8 text-sm md:text-base">
              {t("idFlow.description")}
            </p>
            <div className="flex items-center gap-6 mt-14">
              <Button asChild>
                <Link href="/blog/the-revolution-of-biometric-identification-in-secure-payments">
                  <span className="hidden md:block">{t("idFlow.button")}</span>
                  <span className="block md:hidden">
                    {t("idFlow.buttonMobile")}
                  </span>
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/blog">
                  {t("idFlow.link")} <ArrowRight className="-rotate-45" />
                </Link>
              </Button>
            </div>
          </>
        }
        imageContent={
          <>
            <Image
              className="sm:hidden rounded-xl drop-shadow-parallax"
              src="/images/adamo-id/flow-mobile.png"
              alt=""
              width={345}
              height={428}
              priority
              quality={100}
            />
            <Image
              className="hidden sm:block lg:hidden drop-shadow-parallax"
              src="/images/adamo-id/flow-tablet.png"
              alt=""
              width={896}
              height={684}
              priority
              quality={100}
            />
            <Image
              className="hidden lg:block drop-shadow-parallax"
              src={
                locale === "es"
                  ? "/images/adamo-id/flow-desktop.png"
                  : "/images/adamo-id/flow-desktop-en.png"
              }
              alt=""
              width={552}
              height={684}
              priority
              quality={100}
            />
          </>
        }
      />

      <PageParallax
        className="py-20 md:pt-16 lg:pt-24 md:pb-0 whitespace-pre-line"
        title={t("pageParallax.title")}
        description={t("pageParallax.description")}
        pageImage={
          locale === "es"
            ? "/images/adamo-id/page-parallax.png"
            : "/images/adamo-id/page-parallax-en.png"
        }
        bgColor="bg-adamo-id-700"
      />

      <FeatureParallax
        className="md:mt-[104px]"
        textContent={
          <>
            <h2 className="text-[17px] font-semibold">{t("idPanel.title")}</h2>
            <p className="mt-4 md:mt-8 text-sm md:text-base">
              {t("idPanel.description")}
            </p>
            <div className="flex items-center gap-6 mt-14">
              <Button asChild>
                <Link href="/contact">
                  <span className="hidden md:block">{t("idPanel.button")}</span>
                  <span className="block md:hidden">
                    {t("idPanel.buttonMobile")}
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
              src="/images/adamo-id/panel-mobile.png"
              alt=""
              width={345}
              height={418}
              priority
              quality={100}
            />
            <Image
              className="hidden sm:block lg:hidden drop-shadow-parallax"
              src="/images/adamo-id/panel-tablet.png"
              alt=""
              width={896}
              height={664}
              priority
              quality={100}
            />
            <Image
              className="hidden lg:block drop-shadow-parallax"
              src={
                locale === "es"
                  ? "/images/adamo-id/panel-desktop.png"
                  : "/images/adamo-id/panel-desktop-en.png"
              }
              alt=""
              width={552}
              height={664}
              priority
              quality={100}
            />
          </>
        }
      />

      <div className="bg-adamo-id-700 py-14 px-4 md:pt-[264px] md:pb-[120px] lg:pt-[376px] lg:pb-20 md:-mt-20 lg:-mt-[344px] md:rounded-bl-[48px] md:rounded-br-[48px]">
        <div className="max-w-[1232px] mx-auto">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <h2 data-inview className="heading-2 text-white lg:py-10">
              {t("ctaTitle")}
            </h2>
            <div data-inview data-inview-delay={0.2} className="py-6 lg:py-10">
              <p className="text-white md:text-lg">{t("ctaDescription")}</p>
              <Button asChild variant="secondary" className="mt-14 md:mt-8">
                <Link href="/contact">
                  {t("ctaButton")} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
