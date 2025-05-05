"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const LenisProvider = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    const update = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <ReactLenis options={{ autoRaf: false, lerp: 0.06 }} root ref={lenisRef}>
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
