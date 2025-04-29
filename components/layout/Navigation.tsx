"use client";

import { mainLinks } from "@/constants/navigation";
import { services } from "@/constants/services";
import { useNavigation } from "@/providers/NavigationProvider";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { useRef } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { useLockScroll } from "@/hooks/useLockScroll";

import { Facebook, Instagram, LinkedIn, Threads } from "../icon";
import ServiceCard from "../ui/service-card";

const Navigation = () => {
  // Refs for GSAP animations
  const navigation = useRef<HTMLDivElement>(null);
  const navigationLeft = useRef<HTMLDivElement>(null);
  const navigationRight = useRef<HTMLDivElement>(null);
  const navigationHeading = useRef<HTMLHeadingElement>(null);

  const { isOpen, timeline, setIsOpen } = useNavigation();
  const t = useTranslations("nav");

  // Lock body scroll when navigation is open
  useLockScroll({ isOpen });

  // GSAP animation setup
  useGSAP(
    () => {
      if (!navigationLeft.current || !navigationRight.current) return;

      // Initial states
      gsap.set(navigation.current, { y: "-100%" });
      gsap.set(
        [
          navigationHeading.current,
          navigationLeft.current,
          navigationRight.current,
        ],
        {
          opacity: 0,
          y: -32,
        },
      );

      // Animation timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: "power3.out" },
        onReverseComplete: () => {
          setIsOpen(false);
        },
      });

      tl.to(navigation.current, {
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.to(
        [
          navigationHeading.current,
          navigationLeft.current,
          navigationRight.current,
        ],
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
        },
        "-=0.2",
      );

      timeline.current = tl;

      return () => {
        tl.kill();
        timeline.current = null;
      };
    },
    { dependencies: [], scope: navigation },
  );

  return (
    <div
      ref={navigation}
      data-lenis-prevent
      className="fixed z-[35] inset-0 h-dvh bg-primary text-white pt-[104px] px-4 overflow-y-auto overlay-scrollbar pb-10"
    >
      <div className="max-w-[1232px] mx-auto h-full flex flex-col min-h-[600px]">
        <h3
          ref={navigationHeading}
          className="heading-2 mb-6 md:mb-10 max-w-[600px]"
        >
          {t("servicesTitle")}
        </h3>

        {/* Main content grid */}
        <div className="grid grid-rows-[295px_1fr] md:grid-rows-[1fr] grid-cols-1 md:grid-cols-[1fr_218px] h-full gap-14 md:gap-16 xl:grid-cols-[1fr_380px] xl:gap-[138px] md:h-auto">
          {/* Services section - horizontal scroll on mobile, grid on desktop */}
          <div
            ref={navigationLeft}
            className="md:grid md:grid-cols-2 gap-8 flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar"
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="w-[280px] md:w-auto snap-start shrink-0"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>

          {/* Navigation links and social icons */}
          <div
            ref={navigationRight}
            className="flex flex-col flex-auto gap-y-6 md:gap-y-[90px]"
          >
            <div className="flex-auto md:flex-[initial]">
              <h3 className="text-sm text-neutral-500 mb-8 hidden md:block">
                {t("navigation")}
              </h3>
              <div className="flex flex-wrap gap-8 md:flex-col">
                {mainLinks.map((link) => (
                  <Link
                    key={link.key}
                    href={link.href}
                    className="text-sm font-medium hover:text-neutral-300 transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm text-neutral-500 mb-8 hidden md:block">
                {t("socialsTitle")}
              </h4>
              <div className="flex justify-center md:justify-start md:flex-col items-start gap-6">
                <Link href="#" className="text-white hover:text-neutral-300">
                  <Facebook size={20} />
                </Link>
                <Link href="#" className="text-white hover:text-neutral-300">
                  <Instagram size={20} />
                </Link>
                <Link href="#" className="text-white hover:text-neutral-300">
                  <Threads size={20} />
                </Link>
                <Link href="#" className="text-white hover:text-neutral-300">
                  <LinkedIn size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
