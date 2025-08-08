"use client";

import { useAnimation } from "@/providers/AnimationProvider";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

import { useEffect, useRef } from "react";

import { Logo } from "../icon";

const isHidden = false;

const Preloader = () => {
  // Refs for animation targets
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const opacityRef = useRef<HTMLDivElement>(null);

  const { setIsPreloaderDone } = useAnimation();

  useEffect(() => {
    if (isHidden) {
      document.body.setAttribute("data-preloader-complete", "true");
      setIsPreloaderDone(true);
    }
  }, []);

  useGSAP(
    () => {
      if (isHidden) return;

      const tl = gsap.timeline();
      tl.to(logoRef.current, {
        opacity: 1,
        duration: 1.5,
        scale: 2.5,
        ease: "power3.out",
      })
        .to(logoRef.current, {
          opacity: 0,
          duration: 1,
          scale: 2,
          ease: "power3.in",
        })
        .to(
          overlayRef.current,
          {
            height: "0%",
            duration: 1.4,
            ease: "power3.inOut",
          },
          "-=0.8",
        )
        .to(
          bgOverlayRef.current,
          {
            height: "0%",
            duration: 0.7,
            ease: "power3.inOut",
            onUpdate() {
              if (tl.progress() > 0.83) {
                setIsPreloaderDone(true);
                document.body.setAttribute("data-preloader-complete", "true");
              }
            },
          },
          "-=0.8",
        )
        .to(
          opacityRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "power3.inOut",
            onComplete: () => {
              gsap.set(preloaderRef.current, {
                display: "none",
              });
            },
          },
          "-=0.8",
        );
    },
    { dependencies: [], scope: preloaderRef },
  );

  if (isHidden) return null;

  return (
    <div ref={preloaderRef} className="fixed inset-0 z-50" aria-hidden="true">
      <div ref={overlayRef} className="fixed inset-0 z-[15] bg-primary" />
      <div
        ref={bgOverlayRef}
        className="fixed inset-0 z-10 bg-preloader-secondary"
      />
      <div ref={opacityRef} className="fixed inset-0 z-[5] bg-white" />
      <div className="absolute z-20 h-full w-full flex items-center justify-center">
        <div ref={logoRef} className="scale-90 opacity-0 t-20">
          <Logo className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
