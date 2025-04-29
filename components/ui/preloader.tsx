"use client";

import { gsap } from "gsap";

import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { Logo } from "../icon";

interface PreloaderProps {
  className?: string;
}

const Preloader = ({ className }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const logo = logoRef.current;
    if (!preloader || !logo) return;

    // Initial animation
    gsap.from(logo, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: "power2.out",
    });

    // Check if everything is loaded
    const checkLoaded = () => {
      gsap.to(preloader, {
        y: -100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          preloader.style.display = "none";
        },
      });
    };

    // Check if DOM is ready
    if (document.readyState === "complete") {
      setTimeout(checkLoaded, 1000); // Show logo for at least 1 second
    } else {
      window.addEventListener("load", () => {
        setTimeout(checkLoaded, 1000);
      });
    }

    return () => {
      window.removeEventListener("load", checkLoaded);
    };
  }, []);

  return (
    <div
      ref={preloaderRef}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-primary",
        className,
      )}
    >
      <div ref={logoRef} className="opacity-0">
        <Logo className="w-24 h-24 text-white" />
      </div>
    </div>
  );
};

export default Preloader;
