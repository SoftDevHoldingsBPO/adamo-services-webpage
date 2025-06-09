"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useMediaQuery } from "usehooks-ts";

import { useEffect, useRef, useState } from "react";

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

  const { scrollYProgress } = useScroll({
    target: parallaxContainerRef,
    offset: ["start end", "end start"],
  });

  const [height, setHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);
  const [overlayHeight, setOverlayHeight] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    function updateHeights() {
      if (!parallaxContainerRef.current) return;
      setHeight(parallaxContainerRef.current.offsetHeight);

      if (parallaxTextRef.current) {
        setTextHeight(parallaxTextRef.current.offsetHeight);
      }
      if (parallaxOverlayRef.current) {
        setOverlayHeight(parallaxOverlayRef.current.offsetHeight);
      }
    }

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, []);

  const textY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height - textHeight - OFFSET_Y],
  );

  const overlayY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height - overlayHeight],
  );

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 64]);

  return (
    <section
      ref={parallaxContainerRef}
      className={cn("max-w-[1264px] mx-auto md:px-4", className)}
    >
      <div className="pt-24 pb-14 px-6 md:px-8 lg:px-12 md:py-14 lg:py-24 relative">
        <motion.div
          style={{ y: isDesktop ? overlayY : 0 }}
          ref={parallaxOverlayRef}
          className="absolute top-0 inset-x-0 h-full bg-neutral-100 md:rounded-4xl md:h-[860px] lg:h-[640px]"
        />
        <div className="flex flex-col items-center gap-8 md:gap-20 lg:gap-8 lg:grid lg:grid-cols-2 lg:items-start relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              style={{ y: isDesktop ? textY : 0 }}
              ref={parallaxTextRef}
            >
              {textContent}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 64 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div
              style={{ y: isDesktop ? imageY : 0 }}
              ref={parallaxImageRef}
            >
              {imageContent}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureParallax;
