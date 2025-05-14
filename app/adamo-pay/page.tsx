import { useTranslations } from "next-intl";
import Image from "next/image";

import Hero from "@/components/sections/Hero";

export default function Page() {
  const t = useTranslations("adamoPay");

  return (
    <>
      <Hero>
        <h1 data-animation="1" className="heading-1" id="hero-title">
          {t("hero.title")}
        </h1>
        <p data-animation="2" className="mt-12 text-lg">
          {t("hero.description")}
        </p>

        <div
          data-animation="3"
          className="absolute left-1/2 -translate-x-1/2 bottom-[-210px] lg:bottom-[-206px] w-[361px] h-[614px] lg:w-[864px] lg:h-[614px]"
        >
          <Image
            fill
            src="/images/adamo-pay-hero-mobile.png"
            sizes="361px"
            alt="Adamo Pay"
            className="lg:hidden shadow-xl"
          />

          <Image
            fill
            src="/images/adamo-pay-hero.png"
            alt="Adamo Pay"
            className="hidden lg:block shadow-2xl"
            sizes="864px"
            quality={100}
          />
        </div>
      </Hero>
    </>
  );
}
