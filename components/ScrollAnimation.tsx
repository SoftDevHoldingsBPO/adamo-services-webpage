"use client";

import { useEffect, useRef } from "react";

import { ScrollAnimationOptions, initScrollAnimation } from "@/lib/animations";

interface ScrollAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  options?: ScrollAnimationOptions;
}

const ScrollAnimation = ({ children, options }: ScrollAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cleanup = initScrollAnimation(containerRef.current, options);
      return cleanup;
    }
  }, [options]);
  return <div ref={containerRef}>{children}</div>;
};

export default ScrollAnimation;
