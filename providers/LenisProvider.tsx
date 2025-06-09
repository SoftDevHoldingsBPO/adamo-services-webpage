"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";

import { useEffect, useRef } from "react";

import { usePathname } from "next/navigation";

import { useAnimation } from "./AnimationProvider";

gsap.registerPlugin(ScrollTrigger);

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<any>(null);
  const lenis = useLenis();
  const pathname = usePathname();

  const { isPreloaderDone } = useAnimation();

  useEffect(() => {
    if (!isPreloaderDone) return;

    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, [isPreloaderDone]);

  useEffect(() => {
    if (lenis && isPreloaderDone && window.location.hash === "")
      lenis.scrollTo(0, { immediate: true });
  }, [pathname, isPreloaderDone]);

  return (
    <ReactLenis
      options={{ autoRaf: false, lerp: 0.06, allowNestedScroll: true }}
      root
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
