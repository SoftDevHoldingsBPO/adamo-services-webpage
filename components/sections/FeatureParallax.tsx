"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";

import { cn } from "@/lib/utils";

const OFFSET_Y = 240;

interface FeatureParallaxProps {
  className?: string;
  textContent: React.ReactNode;
  imageContent: React.ReactNode;
}

const FeatureParallax = ({
  className,
  textContent,
  imageContent,
}: FeatureParallaxProps) => {
  const parallaxContainerRef = useRef<HTMLDivElement>(null);
  const parallaxTextRef = useRef<HTMLDivElement>(null);
  const parallaxOverlayRef = useRef<HTMLDivElement>(null);
  const parallaxImageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const container = parallaxContainerRef.current;
        const text = parallaxTextRef.current;
        const overlay = parallaxOverlayRef.current;
        const image = parallaxImageRef.current;

        if (!container || !text || !overlay || !image) return;

        const containerHeight = container.getBoundingClientRect().height;
        const textHeight = text.getBoundingClientRect().height;
        const overlayHeight = overlay.getBoundingClientRect().height;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "+=85%",
            scrub: true,
            // markers: true,
          },
        });

        tl.to(
          text,
          {
            y: containerHeight - textHeight - OFFSET_Y,
            ease: "power1.inOut",
          },
          0,
        );

        tl.to(
          image,
          {
            y: 24,
            ease: "power1.inOut",
          },
          0,
        );

        tl.to(
          overlay,
          {
            y: containerHeight - overlayHeight,
            ease: "power1.inOut",
          },
          0,
        );
      });

      return () => mm.revert();
    },
    { scope: parallaxContainerRef },
  );

  return (
    <section
      ref={parallaxContainerRef}
      className={cn("max-w-[1264px] mx-auto md:px-4", className)}
    >
      <div className="pt-24 pb-14 px-6 md:px-8 lg:px-12 md:py-14 lg:py-24 relative">
        <div
          ref={parallaxOverlayRef}
          className="absolute top-0 inset-x-0 h-full bg-neutral-100 md:rounded-4xl md:h-[860px] lg:h-[640px]"
        />
        <div className="flex flex-col items-center gap-8 md:gap-20 lg:gap-8 lg:grid lg:grid-cols-2 lg:items-start relative z-10">
          <div ref={parallaxTextRef}>{textContent}</div>
          <div ref={parallaxImageRef}>{imageContent}</div>
        </div>
      </div>
    </section>
  );
};

export default FeatureParallax;
