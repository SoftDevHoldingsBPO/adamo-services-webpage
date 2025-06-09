"use client";

import { motion, useScroll, useTransform } from "motion/react";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

import IntroSection from "./IntroSection";

interface PageParallaxProps {
  title: string;
  description: string;
  pageImage: string;
  className?: string;
  bgColor?: string;
}

const PageParallax = ({
  title,
  description,
  pageImage,
  className,
  bgColor = "bg-adamo-pay-700",
}: PageParallaxProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [overlayHeight, setOverlayHeight] = useState(0);

  useEffect(() => {
    function updateHeights() {
      if (!containerRef.current) return;
      setHeight(containerRef.current.offsetHeight);

      if (overlayRef.current) {
        setOverlayHeight(overlayRef.current.offsetHeight);
      }
    }

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-32, height - overlayHeight + 32],
  );

  return (
    <div className={cn(className)}>
      <IntroSection title={title} description={description} />
      <div
        ref={containerRef}
        data-inview
        className={cn("container relative mt-4 md:mt-20")}
      >
        <motion.div
          ref={overlayRef}
          style={{ y }}
          className={cn(
            "h-[85%] absolute inset-0 md:inset-x-8 top-0  mx-auto md:rounded-4xl",
            bgColor,
          )}
        />
        <div className="px-4 md:px-10 relative z-10">
          <Image
            width="1152"
            height="820"
            src={pageImage}
            alt="Page parallax"
            className="drop-shadow-parallax"
          />
        </div>
      </div>
    </div>
  );
};

export default PageParallax;
