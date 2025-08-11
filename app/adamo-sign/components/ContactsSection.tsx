"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "usehooks-ts";

import { useLayoutEffect, useRef, useState } from "react";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import IntroSection from "@/components/sections/IntroSection";
import { Button } from "@/components/ui/button";

const OFFSET_Y = 240;

export function ContactsSection({ className }: { className?: string }) {
  const t = useTranslations("adamoSign.contactsSection");
  const locale = useLocale();

  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const parallaxOverlayRef = useRef<HTMLDivElement>(null);
  const parallaxImageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: parallaxContainerRef,
    offset: ["start end", "end start"],
  });

  const [height, setHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const [overlayHeight, setOverlayHeight] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useLayoutEffect(() => {
    const els = [
      parallaxContainerRef.current,
      parallaxTextRef.current,
      parallaxOverlayRef.current,
    ].filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const measure = () => {
      if (parallaxContainerRef.current) {
        setHeight(parallaxContainerRef.current.getBoundingClientRect().height);
      }
      if (parallaxTextRef.current) {
        setTextHeight(parallaxTextRef.current.getBoundingClientRect().height);
      }
      if (parallaxOverlayRef.current) {
        setOverlayHeight(
          parallaxOverlayRef.current.getBoundingClientRect().height,
        );
      }
    };

    measure();
    requestAnimationFrame(measure);

    const ro = new ResizeObserver(measure);
    els.forEach((el) => ro.observe(el));
    window.addEventListener("load", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [isDesktop, locale]);

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height - textHeight - OFFSET_Y],
  );

  const overlayY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height - overlayHeight],
  );

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 64]);

  const onImageLoaded = () => {
    if (parallaxContainerRef.current) {
      const h = parallaxContainerRef.current.getBoundingClientRect().height;
      setHeight(h);
    }
  };

  return (
    <>
      <IntroSection
        title={t("introTitle")}
        description={t("introDescription")}
      />
      {/*  */}

      <section
        ref={parallaxContainerRef}
        className={cn("max-w-[1264px] mx-auto md:px-4 mt-20", className)}
      >
        <div className="pt-24 pb-14 px-6 md:px-8 lg:px-12 md:py-14 lg:py-24 relative">
          <motion.div
            style={{ y: isDesktop ? overlayY : 0 }}
            ref={parallaxOverlayRef}
            className="absolute top-0 inset-x-0 h-full bg-neutral-100 md:rounded-4xl md:h-[660px] lg:h-[480px]"
          />
          <div className="flex flex-col items-center gap-8 md:gap-20 lg:gap-8 lg:grid lg:grid-cols-2 lg:items-start relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 64 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                style={{ y: isDesktop ? imageY : 0 }}
                ref={parallaxImageRef}
              >
                <Image
                  className="sm:hidden rounded-xl drop-shadow-parallax"
                  src="/images/adamo-sign/contacts.png"
                  alt=""
                  width={345}
                  height={428}
                  priority
                  quality={100}
                  onLoadingComplete={onImageLoaded}
                />
                <Image
                  className="hidden sm:block lg:hidden drop-shadow-parallax"
                  src="/images/adamo-sign/contacts.png"
                  alt=""
                  width={896}
                  height={684}
                  priority
                  quality={100}
                  onLoadingComplete={onImageLoaded}
                />
                <Image
                  className="hidden lg:block drop-shadow-parallax"
                  src={
                    locale === "es"
                      ? "/images/adamo-sign/contacts.png"
                      : "/images/adamo-sign/contacts-en.png"
                  }
                  alt=""
                  width={552}
                  height={684}
                  priority
                  quality={100}
                  onLoadingComplete={onImageLoaded}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                style={{ y: isDesktop ? textY : 0 }}
                ref={parallaxTextRef}
              >
                <h2 className="text-[17px] font-semibold">{t("title")}</h2>
                <p className="mt-4 md:mt-8 text-sm md:text-base">
                  {t.rich("description", {
                    br: () => <br />,
                  })}
                </p>
                <div className="flex items-center gap-6 mt-14">
                  <Button asChild>
                    <Link href="/blog/the-revolution-of-biometric-identification-in-secure-payments">
                      {t("button")}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
