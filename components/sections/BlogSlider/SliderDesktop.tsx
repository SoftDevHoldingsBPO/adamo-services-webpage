"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "usehooks-ts";

import { useState } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "@/components/icon";
import { Button } from "@/components/ui/button";

import type { Post } from ".";

interface SliderDesktopProps {
  posts: Post[];
}

const DURATION = 0.6;
const EASING = "back.out(1.6)";

type Direction = "forward" | "backward";

const getWrappedIndex = (index: number, length: number) =>
  (index + length) % length;

const SliderDesktop = ({ posts }: SliderDesktopProps) => {
  const t = useTranslations("sliderDesktop");

  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [direction, setDirection] = useState<Direction>("forward");

  const [isAnimating, setIsAnimating] = useState(false);

  const isTablet = useMediaQuery("(max-width: 1280px)");

  const sizeDefault = isTablet ? 96 : 144;
  const sizeActive = isTablet ? 215 : 315;

  const xActive = isTablet ? 41 : 72;
  const yActive = isTablet ? 101 : 148;

  const xNext1 = isTablet ? 117 : 172;
  const yNext1 = isTablet ? 28 : 40;

  const yNext2 = isTablet ? 44 : 64;

  const VARS_FORWARD = {
    active: {
      x: xActive,
      y: yActive,
      opacity: 1,
      width: sizeActive,
      height: sizeActive,
      zIndex: 10,
    },
    prev: {
      x: xActive,
      y: "100%",
      opacity: 0,
      width: sizeActive,
      height: sizeActive,
      zIndex: 10,
    },
    next1: {
      x: xNext1,
      y: yNext1,
      opacity: 1,
      width: sizeDefault,
      height: sizeDefault,
      zIndex: 5,
    },
    next2: {
      x: 0,
      y: yNext2,
      opacity: 1,
      width: sizeDefault,
      height: sizeDefault,
      zIndex: 5,
    },
    next2Initial: {
      x: -200,
      y: yNext2,
      opacity: 0,
      width: sizeDefault,
      height: sizeDefault,
      zIndex: 5,
    },
  };

  const VARS_BACKWARD = {
    active: {
      x: xActive,
      y: yActive,
      opacity: 1,
      width: sizeActive,
      height: sizeActive,
      zIndex: 10,
    },
    activeInitial: {
      x: xActive,
      y: "100%",
      opacity: 0,
      width: sizeActive,
      height: sizeActive,
      zIndex: 10,
    },
    next1: {
      x: xNext1,
      y: yNext1,
      opacity: 1,
      width: sizeDefault,
      height: sizeDefault,
      zIndex: 5,
    },
    next2: {
      x: 0,
      y: yNext2,
      opacity: 1,
      width: sizeDefault,
      height: sizeDefault,
      zIndex: 5,
    },
    next3: {
      x: -200,
      y: yNext2,
      opacity: 0,
      width: sizeDefault,
      height: sizeDefault,
      zIndex: 5,
    },
  };

  const handleSlide = (dir: Direction) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setPreviousIndex(activeIndex);
    setDirection(dir);

    const delta = dir === "backward" ? -1 : 1;

    setActiveIndex((prev) => getWrappedIndex(prev + delta, posts.length));
  };

  useGSAP(
    () => {
      const ids = [
        activeIndex,
        getWrappedIndex(activeIndex - 1, posts.length),
        getWrappedIndex(activeIndex + 1, posts.length),
        getWrappedIndex(activeIndex + 2, posts.length),
        getWrappedIndex(activeIndex + 3, posts.length),
      ];

      const [active, prev, next1, next2, next3] = ids.map(
        (i) => `[data-blog-image="${i}"]`,
      );

      const tl = gsap.timeline({
        defaults: { duration: DURATION, ease: EASING },
        onComplete: () => setIsAnimating(false),
      });

      if (direction === "forward") {
        tl.to(active, VARS_FORWARD.active, 0);
        tl.to(prev, VARS_FORWARD.prev, 0);
        tl.to(next1, VARS_FORWARD.next1, 0);
        tl.set(next2, VARS_FORWARD.next2Initial, 0);
        tl.to(next2, VARS_FORWARD.next2, 0);
      } else {
        tl.set(active, VARS_BACKWARD.activeInitial, 0);
        tl.to(active, VARS_BACKWARD.active, 0);
        tl.to(next1, VARS_BACKWARD.next1, 0);
        tl.to(next2, VARS_BACKWARD.next2, 0);
        tl.to(next3, VARS_BACKWARD.next3, 0);
      }
    },
    { dependencies: [activeIndex, direction, isTablet] },
  );

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: DURATION, ease: EASING },
      });

      const active =
        "[data-slot-blog-slider='active'] > [data-slot-blog-slider-content]";
      const inactive =
        "[data-slot-blog-slider='inactive'] > [data-slot-blog-slider-content]";

      tl.fromTo(active, { x: -32, opacity: 0 }, { x: 0, opacity: 1 }, 0);
      tl.fromTo(inactive, { x: 0, opacity: 1 }, { x: 32, opacity: 0 }, 0);
    },
    { dependencies: [activeIndex] },
  );

  return (
    <div className="container">
      <div className="relative p-[88px] bg-neutral-100 rounded-4xl overflow-hidden">
        <button
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-4 shadow-2xl"
          onClick={() => handleSlide("backward")}
        >
          <ArrowRight className="text-neutral-900 rotate-180" />
        </button>

        <button
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-4 shadow-2xl"
          onClick={() => handleSlide("forward")}
        >
          <ArrowRight className="text-neutral-900" />
        </button>

        <div className="grid gap-x-6 grid-cols-[257px_1fr] xl:gap-x-[88px] xl:grid-cols-[387px_1fr] items-center">
          <div className="relative min-h-[333px] xl:min-h-[487px]">
            {posts.map((post, index) => {
              return (
                <div
                  key={post.id}
                  data-blog-image={index}
                  className="slide-image"
                >
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={240}
                    height={300}
                    className="object-cover w-full h-full pointer-events-none"
                  />
                </div>
              );
            })}
          </div>

          <div>
            <div className="text-neutral-500 bg-white inline-block py-3 px-6 rounded-full mb-14">
              Blog
            </div>

            <div className="relative min-h-[312px]">
              {posts.map((post, index) => {
                const isActive = index === activeIndex;
                const wasActive = index === previousIndex;

                if (!isActive && !wasActive) return null;

                return (
                  <div
                    key={post.id}
                    data-slot-blog-slider={isActive ? "active" : "inactive"}
                    className="absolute left-0 top-0 w-full"
                  >
                    <div data-slot-blog-slider-content>
                      <h4 className="heading-2 mb-8">{post.title}</h4>
                      <p>{post.desc}</p>
                    </div>

                    <div
                      key={post.id}
                      className={cn(
                        "gap-x-8 mt-14",
                        isActive ? "flex" : "hidden",
                      )}
                    >
                      <Button asChild>
                        <Link href={`/posts/${post.id}`}>{t("readPost")}</Link>
                      </Button>

                      <Button asChild variant="link">
                        <Link href={`/posts`}>
                          {t("goToBlog")} <ArrowRight />
                        </Link>
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderDesktop;
