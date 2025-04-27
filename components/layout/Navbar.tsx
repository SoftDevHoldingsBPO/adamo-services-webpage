"use client";

import { gsap } from "gsap";
import { useLenis } from "lenis/react";
import { useMediaQuery } from "usehooks-ts";

import { useRef, useState } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { HamburgerMenuIcon, Logo } from "../icon";
import { Button } from "../ui/button";
import LocaleSelect from "../ui/locale-select";

const HIDE_OFFSET = -100;
const ANIMATION_DURATION = 0.5;
const SCROLL_TOP_THRESHOLD = 50;

const Navbar = () => {
  const t = useTranslations("nav");
  const navbarRef = useRef<HTMLDivElement>(null);
  const lastScrollRef = useRef(0);
  const lastYRef = useRef(0);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  const desktop = useMediaQuery("(min-width: 768px)");

  const [isAtTop, setIsAtTop] = useState(true);
  const [isAppearing, setIsAppearing] = useState(false);

  const killAnimation = () => {
    if (animationRef.current) {
      animationRef.current.kill();
      animationRef.current = null;
    }
  };

  const showNavbar = (navbar: HTMLDivElement) => {
    killAnimation();
    setIsAppearing(true);
    animationRef.current = gsap.to(navbar, {
      y: 0,
      duration: ANIMATION_DURATION,
      ease: "power3.out",
    });
    lastYRef.current = 0;
  };

  const hideNavbar = (navbar: HTMLDivElement, newY: number) => {
    killAnimation();
    gsap.set(navbar, { y: newY });
    if (newY === HIDE_OFFSET) setIsAppearing(false);
    lastYRef.current = newY;
  };

  useLenis((lenis) => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const currentScroll = lenis.scroll;
    const direction = lenis.direction;
    const delta = currentScroll - lastScrollRef.current;

    const newY = Math.min(0, Math.max(HIDE_OFFSET, lastYRef.current - delta));

    if (direction < 0) {
      showNavbar(navbar);
    } else {
      hideNavbar(navbar, newY);
    }

    if (currentScroll <= SCROLL_TOP_THRESHOLD) {
      setIsAtTop(true);
    } else if (currentScroll > SCROLL_TOP_THRESHOLD) {
      setIsAtTop(false);
    }

    lastScrollRef.current = currentScroll;
  });

  return (
    <div
      ref={navbarRef}
      data-visible={isAppearing && !isAtTop}
      className={cn(
        "fixed px-4 py-6 left-0 top-0 w-full z-40 transition-colors duration-300 group bg-white border-b border-transparent",
        isAtTop
          ? "bg-transparent md:delay-400"
          : "bg-white delay-200 border-border",
      )}
    >
      <div className="flex items-center justify-between max-w-[1408px] mx-auto">
        <Link href="/">
          <Logo className="group-data-[visible=true]:text-primary text-white md:text-primary" />
        </Link>
        <div className="flex gap-x-6">
          <LocaleSelect
            className="text-white active:text-neutral-100 group-data-[visible=true]:text-neutral-600 group-data-[visible=true]:hover:text-neutral-700 group-data-[visible=true]:active:text-neutral-800 md:text-neutral-600 md:hover:text-neutral-700 md:active:text-neutral-800"
            align={desktop ? "start" : "end"}
          />

          {/* Mobile */}
          <div className="md:hidden">
            <Button
              size="md"
              variant={isAppearing && !isAtTop ? "primary" : "secondary"}
            >
              <HamburgerMenuIcon />
            </Button>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <Button asChild size="md">
              <Link href="/adamo-pay">{t("contact")}</Link>
            </Button>
          </div>

          {/* Desktop */}
          <div className="hidden md:block">
            <Button size="md">
              <HamburgerMenuIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
