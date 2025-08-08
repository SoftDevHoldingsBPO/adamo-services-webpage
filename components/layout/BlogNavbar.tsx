"use client";

import { categories, socialLinks } from "@/constants/navigation";
import { useBlog } from "@/providers/BlogProvider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { useLockScroll } from "@/hooks/useLockScroll";

import {
  ArrowRight,
  CloseIcon,
  HamburgerMenuIcon,
  Logo,
  SearchIcon,
} from "../icon";
import BlogSearch from "../sections/Blog/BlogSearch";
import { Button } from "../ui/button";
import LocaleSelect from "../ui/locale-select";
import { SocialLink } from "./Navigation";

const BlogNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const navigation = useRef<HTMLDivElement | null>(null);
  const { setSelectedCategory } = useBlog();

  const pathname = usePathname();
  const isBlogPostPage = pathname.startsWith("/blog/") && pathname !== "/blog";

  const router = useRouter();

  const t = useTranslations("blogNavbar");
  const tCategories = useTranslations("blogCategories");

  useLockScroll({ isOpen });
  useLenis(({ scroll }) => {
    setIsScrolled(scroll > 20);
  });

  useGSAP(() => {
    gsap.set(navigation.current, { y: "-100%" });
    gsap.set("[data-navigation-item]", {
      opacity: 0,
      y: -48,
    });

    tl.current = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power3.out",
      },
      onReverseComplete: () => setIsOpen(false),
    });

    const timeline = tl.current;

    timeline.to(navigation.current, {
      y: 0,
      duration: 0.6,
    });

    timeline.to(
      "[data-navigation-item]",
      {
        opacity: 1,
        y: 0,
        stagger: {
          each: 0.2,
          amount: 0.4,
        },
      },
      "-=0.4",
    );
  });

  const toggle = async () => {
    if (!tl.current) return;

    const timeline = tl.current;

    if (!isOpen) {
      setIsOpen(true);
      timeline.timeScale(1).play();
    } else {
      timeline.timeScale(1.2).reverse();
    }
  };

  const close = () => {
    if (!tl.current) return;

    const timeline = tl.current;
    timeline.timeScale(1.2).reverse();
  };

  useEffect(() => {
    const handleResize = () => {
      if (!isOpen) return;
      tl.current?.timeScale(1.2).reverse();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  return (
    <>
      <div
        data-inview
        data-inview-delay={0.1}
        className={cn(
          "group px-4 lg:px-8 sticky top-0 bg-white transition-all duration-300 ease-out z-20",
          isOpen ? "text-white bg-primary" : "text-primary bg-white",
          isScrolled && !isOpen ? "py-3 shadow-sm" : "py-6",
        )}
      >
        <div className="flex items-center justify-between relative">
          {!isBlogPostPage && (
            <Link
              href="/"
              className="inline-flex items-center gap-x-6 md:gap-x-12"
            >
              <Logo />

              <p className="text-sm font-medium hidden md:block">
                {t("logoDesktop")}
              </p>
              <p className="text-sm font-medium block md:hidden">
                {t("logoMobile")}
              </p>
            </Link>
          )}

          {isBlogPostPage && (
            <button
              onClick={() => {
                router.back();
                close();
              }}
              className="inline-flex items-center gap-x-6 md:gap-x-12"
            >
              <ArrowRight className="rotate-[180deg]" />

              <span className="text-sm font-medium">{t("back")}</span>
            </button>
          )}

          <div className="flex items-center gap-x-4 md:hidden ">
            {!isOpen && !isBlogPostPage && (
              <div className="flex items-center gap-x-2">
                <BlogSearch
                  isOpen={showSearch}
                  onClose={() => setShowSearch(false)}
                />
                <Button size="md" onClick={() => setShowSearch(true)}>
                  <SearchIcon />
                </Button>
              </div>
            )}

            <Button
              size="md"
              variant={isOpen ? "secondary" : "primary"}
              onClick={toggle}
              className="md:hidden"
            >
              {isOpen ? <CloseIcon /> : <HamburgerMenuIcon />}
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-x-10">
            <LocaleSelect />

            <Button asChild size="md" variant="link">
              <Link href="/">
                {t("goToAdamo")}
                <ArrowRight className="rotate-[-45deg]" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        ref={navigation}
        data-lenis-prevent
        className="fixed inset-0 h-dvh w-full bg-primary -translate-y-full pt-[88px] z-10"
      >
        <div className="h-full overflow-y-auto p-4 pb-16 flex flex-col justify-between gap-8">
          <div className="flex flex-col text-center space-y-6">
            {categories.map((category) => (
              <button
                type="button"
                data-navigation-item
                className="text-3xl font-semibold text-white"
                onClick={() => {
                  setSelectedCategory(category);
                  toggle();
                }}
                key={category}
              >
                {tCategories(category)}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-y-8">
            <div data-navigation-item>
              <LocaleSelect className="text-white active:text-neutral-100 group-data-[at-top=false]:text-neutral-600 group-data-[at-top=false]:hover:text-neutral-700 group-data-[at-top=false]:active:text-neutral-800 md:text-neutral-600 md:hover:text-neutral-700 md:active:text-neutral-800 group-data-[open=true]:!text-white" />
            </div>

            <div data-navigation-item>
              <Button asChild size="md" variant="ghost">
                <Link href="/">
                  {t("goToAdamo")}
                  <ArrowRight className="rotate-[-45deg]" />
                </Link>
              </Button>
            </div>
          </div>

          <div data-navigation-item className="flex justify-center gap-x-10">
            {socialLinks.map((link, index) => (
              <SocialLink key={index} {...link} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogNavbar;
