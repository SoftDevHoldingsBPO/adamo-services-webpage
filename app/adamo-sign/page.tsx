import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import VideoPlayer from "@/components/VideoPlayer";
import { ArrowRight } from "@/components/icon";
import FeatureParallax from "@/components/sections/FeatureParallax";
import PageParallax from "@/components/sections/PageParallax";
import { Button } from "@/components/ui/button";

import { AdamoSignHero } from "./components/AdamoSignHero";
import { CTA } from "./components/CTA";
import { ContactsSection } from "./components/ContactsSection";
import { FirmaLevels } from "./components/FirmaLevels";
import { LegalSection } from "./components/LegalSection";
import { ToolsBanner } from "./components/ToolsBanner";

export default function Page() {
  const t = useTranslations("adamoSign");
  const locale = useLocale();

  return (
    <>
      <AdamoSignHero />
      <ToolsBanner className="pt-20 md:pt-16 lg:pt-24" />
      <VideoPlayer
        srcES="/video/AdamoId-ES.mp4"
        srcEN="/video/AdamoId-EN.mp4"
        className="mt-[112px] lg:mt-[130px] hidden md:block"
      />
      <FirmaLevels />

      <PageParallax
        className="pb-20 md:pb-[160px]"
        pageImage={
          locale === "es"
            ? "/images/adamo-sign/document.png"
            : "/images/adamo-sign/document-en.png"
        }
        bgColor="bg-adamo-sign-700"
      />

      <ContactsSection />

      <FeatureParallax
        className="mt-[120px]"
        textContent={
          <>
            <h2 className="text-[17px] font-semibold">{t("archive.title")}</h2>
            <p className="mt-4 md:mt-8 text-sm md:text-base">
              {t.rich("archive.description", {
                br: () => <br />,
              })}
            </p>
            <div className="flex items-center gap-6 mt-14">
              <Button asChild>
                <Link href="/blog/the-revolution-of-biometric-identification-in-secure-payments">
                  {t("archive.button")}
                </Link>
              </Button>
              <Button asChild variant="link">
                <Link href="/blog">
                  {t("archive.link")} <ArrowRight className="-rotate-45" />
                </Link>
              </Button>
            </div>
          </>
        }
        imageContent={
          <>
            <Image
              className="sm:hidden rounded-xl drop-shadow-parallax"
              src="/images/adamo-sign/archive.png"
              alt=""
              width={345}
              height={428}
              priority
              quality={100}
            />
            <Image
              className="hidden sm:block lg:hidden drop-shadow-parallax"
              src="/images/adamo-sign/archive.png"
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
                  ? "/images/adamo-sign/archive.png"
                  : "/images/adamo-sign/archive-en.png"
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

      <CTA className="mt-20 md:mt-16 lg:mt-36" />

      <LegalSection />
    </>
  );
}
