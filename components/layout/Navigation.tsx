"use client";

import { mainLinks } from "@/constants/navigation";
import { services } from "@/constants/services";
import { useNavigation } from "@/providers/NavigationProvider";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { memo, useRef } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { useLockScroll } from "@/hooks/useLockScroll";

import { Facebook, Instagram, LinkedIn, Threads } from "../icon";
import ServiceCard from "../ui/service-card";

const ANIMATION_CONFIG = {
  INITIAL: {
    Y: "-100%",
    OPACITY: 0,
    OFFSET_Y: -48,
  },
  DURATION: 0.6,
  EASE: "power3.out",
  STAGGER: 0.2,
  OFFSET_TIME: "-=0.3",
} as const;

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ size: number }>;
}

const SocialLink = memo(({ href, icon: Icon }: SocialLinkProps) => (
  <Link
    href={href}
    className="text-white hover:text-neutral-300 transition-colors"
  >
    <Icon size={20} />
  </Link>
));
SocialLink.displayName = "SocialLink";

const socialLinks = [
  { href: "#", icon: Facebook },
  { href: "#", icon: Instagram },
  { href: "#", icon: Threads },
  { href: "#", icon: LinkedIn },
];

const Navigation = () => {
  const navigation = useRef<HTMLDivElement>(null);

  const { isOpen, timeline, setIsOpen } = useNavigation();
  const t = useTranslations("nav");

  useLockScroll({ isOpen });

  useGSAP(
    () => {
      // Initial states
      gsap.set(navigation.current, { y: ANIMATION_CONFIG.INITIAL.Y });
      gsap.set(
        [
          "[data-navigation-heading]",
          "[data-navigation-service]",
          "[data-navigation-links]",
          "[data-navigation-socials]",
        ],
        {
          opacity: ANIMATION_CONFIG.INITIAL.OPACITY,
          y: ANIMATION_CONFIG.INITIAL.OFFSET_Y,
        },
      );

      // Animation timeline
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: ANIMATION_CONFIG.DURATION,
          ease: ANIMATION_CONFIG.EASE,
        },
        onReverseComplete: () => {
          setIsOpen(false);
        },
      });

      tl.to(navigation.current, {
        y: 0,
        duration: ANIMATION_CONFIG.DURATION,
        ease: ANIMATION_CONFIG.EASE,
      });

      tl.to(
        "[data-navigation-heading]",
        {
          y: 0,
          duration: ANIMATION_CONFIG.DURATION,
          ease: ANIMATION_CONFIG.EASE,
          opacity: 1,
        },
        ANIMATION_CONFIG.OFFSET_TIME,
      );

      tl.to(
        "[data-navigation-service]",
        {
          y: 0,
          duration: ANIMATION_CONFIG.DURATION,
          ease: ANIMATION_CONFIG.EASE,
          opacity: 1,
          stagger: {
            each: 0.2,
            amount: 0.4,
          },
        },
        "-=0.4",
      );

      tl.to(
        "[data-navigation-links]",
        {
          y: 0,
          duration: ANIMATION_CONFIG.DURATION,
          ease: ANIMATION_CONFIG.EASE,
          opacity: 1,
        },
        "-=0.74",
      );

      tl.to(
        "[data-navigation-socials]",
        {
          y: 0,
          duration: ANIMATION_CONFIG.DURATION,
          ease: ANIMATION_CONFIG.EASE,
          opacity: 1,
        },
        "-=0.44",
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
      className="fixed z-[35] inset-0 h-dvh bg-primary text-white pt-[104px] px-4 overflow-y-auto overlay-scrollbar pb-10 translate-y-full"
    >
      <div className="max-w-[1232px] mx-auto h-full flex flex-col min-h-[600px]">
        <h3
          data-navigation-heading
          className="heading-2 mb-6 md:mb-10 max-w-[600px]"
        >
          {t("servicesTitle")}
        </h3>

        <div className="grid grid-rows-[295px_1fr] md:grid-rows-[1fr] grid-cols-1 md:grid-cols-[1fr_218px] h-full gap-14 md:gap-16 xl:grid-cols-[1fr_380px] xl:gap-[138px] md:h-auto">
          <div className="md:grid md:grid-cols-2 gap-8 flex flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {services.map((service) => (
              <div
                data-navigation-service
                key={service.id}
                className="w-[280px] md:w-auto snap-start shrink-0"
              >
                <ServiceCard size="compact" {...service} />
              </div>
            ))}
          </div>

          <div className="flex flex-col flex-auto gap-y-6 md:gap-y-[90px]">
            <div data-navigation-links className="flex-auto md:flex-[initial]">
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

            <div data-navigation-socials className="space-y-8">
              <h4 className="text-sm text-neutral-500 hidden md:block">
                {t("socialsTitle")}
              </h4>
              <div className="flex justify-center md:justify-start md:flex-col items-start gap-6">
                {socialLinks.map((link, index) => (
                  <SocialLink key={index} {...link} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
