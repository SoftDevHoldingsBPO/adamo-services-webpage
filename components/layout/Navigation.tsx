"use client";

import { mainLinks, socialLinks } from "@/constants/navigation";
import { services } from "@/constants/services";
import { useNavigation } from "@/providers/NavigationProvider";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { memo, useRef } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useLockScroll } from "@/hooks/useLockScroll";

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

export const SocialLink = memo(({ href, icon: Icon }: SocialLinkProps) => (
  <Link
    href={href}
    className="text-white hover:text-neutral-300 transition-colors"
  >
    <Icon size={20} />
  </Link>
));
SocialLink.displayName = "SocialLink";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const Navigation = () => {
  const navigation = useRef<HTMLDivElement>(null);

  const { isOpen, timeline, setIsOpen, toggleMenu } = useNavigation();
  const t = useTranslations("nav");
  const router = useRouter();

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

  const handleClick = async (link: string) => {
    toggleMenu();
    await sleep(300);
    router.push(link);
  };

  return (
    <div
      ref={navigation}
      data-lenis-prevent
      className="fixed inset-0 z-30 -translate-y-full bg-primary pt-[88px]"
    >
      <div className="h-full pt-4 pb-16 md:py-12 overflow-y-auto overlay-scrollbar">
        <div className="container h-full md:h-auto">
          <div className="flex flex-col gap-6 md:gap-10 h-full">
            <h3 data-navigation-heading className="heading-2 text-white">
              {t("servicesTitle")}
            </h3>

            <div className="flex flex-col gap-10 md:grid md:grid-cols-8 md:gap-8 lg:grid-cols-12 flex-auto">
              <div className="md:col-span-6 lg:col-span-7">
                <div className="-mx-4 px-4 scroll-pl-4 flex flex-nowrap gap-8 overflow-x-auto snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-2">
                  {services.map((service) => (
                    <div
                      data-navigation-service
                      key={service.id}
                      className="w-[280px] md:w-auto snap-start shrink-0"
                    >
                      <ServiceCard
                        onClick={handleClick}
                        size="compact"
                        {...service}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 lg:col-span-4 lg:col-start-9 flex-auto flex flex-col gap-10 h-full md:gap-y-[90px]">
                <div
                  data-navigation-links
                  className="space-y-8 flex-auto md:flex-none"
                >
                  <h3 className="text-sm text-neutral-500 hidden md:block">
                    {t("navigation")}
                  </h3>
                  <div className="flex flex-wrap gap-8 md:flex-col">
                    {mainLinks.map((link) => (
                      <Link
                        key={link.key}
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleClick(link.href);
                        }}
                        className="text-sm text-white font-medium hover:text-neutral-300 transition-colors"
                      >
                        {t(link.key)}
                      </Link>
                    ))}
                  </div>
                </div>

                <div data-navigation-socials className="space-y-8 ">
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
      </div>
    </div>
  );
};

export default Navigation;
