"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface PageParallaxProps {
  pageImage: string;
  className?: string;
}

const PageParallax = ({ pageImage, className }: PageParallaxProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(overlayRef.current, {
      y: "24%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: overlayRef.current,
        markers: true,
        scrub: true,
        start: "top 55%",
        end: "+=80%",
      },
    });
  }, []);

  return (
    <div className={cn("container relative", className)}>
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
  );
};

export default PageParallax;
