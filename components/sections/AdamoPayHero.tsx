"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { useMediaQuery } from "usehooks-ts";

import { useRef } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";

import Hero from "./Hero";

const AdamoPayHero = () => {
  const t = useTranslations("adamoPay");
  const mobileImageRef = useRef<HTMLImageElement>(null);
  const desktopImageRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const lenis = useLenis();

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          duration: 1,
          overwrite: "auto",
          ease: "power1.in",
        },
        scrollTrigger: {
          trigger: heroRef.current,
          start: isMobile ? "top top" : "top 88",
          end: isMobile ? "+=500" : "+=800",
          scrub: true,
          pin: true,
        },
      });

      tl.to(heroContentRef.current, {
        autoAlpha: 0,
        y: -180,
      });

      tl.to(
        desktopImageRef.current,
        {
          width: 1072,
          y: -240,
        },
        0,
      );

      tl.to(
        mobileImageRef.current,
        {
          y: -280,
        },
        0,
      );
    },
    { scope: heroRef, dependencies: [isMobile] },
  );

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#exchange-banner", {
      easing: function easeInOutCubic(x: number): number {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
      },
      duration: 1.5,
      force: true,
    });
  };

  return (
    <Hero
      cursorText={t("hero.cursor-text")}
      ref={heroRef}
      onClick={handleScroll}
    >
      <div className="space-y-12" ref={heroContentRef}>
        <h1 data-animation="1" className="heading-1" id="hero-title">
          {t("hero.title")}
        </h1>
        <p data-animation="2" className="text-lg whitespace-pre-line" >
          {t("hero.description")}
        </p>
      </div>

      <div
        data-animation="3"
        className="absolute inset-x-0 flex justify-center bottom-[-210px] lg:bottom-[-206px] w-full"
      >
        <Image
          ref={mobileImageRef}
          src="/images/adamo-pay/adamo-pay-hero-mobile.png"
          alt="Adamo Pay"
          width={361}
          height={614}
          className="lg:hidden shadow-xl"
        />

        <Image
          ref={desktopImageRef}
          quality={100}
          width={864}
          height={614}
          src="/images/adamo-pay/adamo-pay-hero.png"
          alt="Adamo Pay"
          className="hidden lg:block shadow-2xl rounded-4xl"
        />
      </div>
    </Hero>
  );
};

export default AdamoPayHero;
