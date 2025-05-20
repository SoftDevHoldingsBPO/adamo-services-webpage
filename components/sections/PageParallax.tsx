"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

import IntroSection from "./IntroSection";

interface PageParallaxProps {
  title: string;
  description: string;
  pageImage: string;
  className?: string;
}

const PageParallax = ({
  title,
  description,
  pageImage,
  className,
}: PageParallaxProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(overlayRef.current, {
      y: "24%",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: overlayRef.current,
        // markers: true,
        scrub: true,
        start: "top 45%",
        end: "+=80%",
      },
    });
  }, []);

  return (
    <div className={cn(className)}>
      <IntroSection title={title} description={description} />
      <div className={cn("container relative mt-4 md:mt-20")}>
        <div
          ref={overlayRef}
          className="bg-adamo-pay-700 h-[85%] absolute inset-0 md:inset-x-8 top-0 -translate-y-6 md:-translate-y-10  mx-auto md:rounded-4xl"
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
