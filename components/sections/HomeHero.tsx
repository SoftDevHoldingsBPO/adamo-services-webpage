"use client";

import { useLenis } from "lenis/react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { ArrowRight } from "../icon";
import { Button } from "../ui/button";

const HomeHero = () => {
  const t = useTranslations("hero");

  const lenis = useLenis();

  const handleScrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#services", {
      duration: 1.5,
      force: true,
    });
  };

  const handleStopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <section
      data-animation-opacity
      className="h-screen min-h-[720px] max-h-[960px] mx-auto md:px-4 lg:px-6 md:pt-[88px] md:pb-6 relative"
      aria-labelledby="hero-title"
    >
      <div className="h-full px-4 md:rounded-4xl overflow-hidden relative">
        {/* Cursor */}
        <div
          onClick={handleScrollToServices}
          data-cursor-text={t("cursor-text")}
          className="absolute inset-0 z-[25]"
          aria-hidden="true"
        >
          &nbsp;
        </div>
        {/* Gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 hero-gradient"
          role="presentation"
        >
          &nbsp;
        </div>
        {/* Video */}
        <video
          aria-hidden="true"
          className="absolute inset-0 z-10 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          title="Background video"
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content */}
        <div
          role="region"
          className="h-full max-w-[809px] mx-auto pt-32 md:text-center md:pt-48"
        >
          <h1
            data-animation="2"
            id="hero-title"
            className="heading-1 text-white relative z-20"
          >
            {t.rich("title", {
              accent: (chunks) => (
                <span className="text-tertiary ">{chunks}</span>
              ),
            })}
          </h1>
          <p
            data-animation="3"
            className="text-white text-lg mt-12 relative z-20"
          >
            {t("subtitle")}
          </p>
          <div
            role="group"
            aria-label="Hero actions"
            className="mt-28 flex flex-col items-start gap-8 md:flex-row md:justify-center"
          >
            <Button
              variant="secondary"
              aria-label={t("button1")}
              data-animation="4"
              className="relative z-30"
              onClick={handleScrollToServices}
            >
              {t("button1")}
            </Button>
            <Button
              variant="ghost"
              aria-label={t("button2")}
              data-animation="5"
              asChild
              onClick={handleStopPropagation}
              data-cursor-text=""
              className="relative z-30"
            >
              <Link href="/contact">
                {t("button2")} <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
