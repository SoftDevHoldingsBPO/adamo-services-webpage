"use client";

import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

import { useRef } from "react";

import { useLocale } from "next-intl";
import Player from "next-video/player";

import { cn } from "@/lib/utils";

import ScrollAnimation from "./ScrollAnimation";

interface VideoPlayerProps {
  className?: string;
}

const VideoPlayer = ({ className }: VideoPlayerProps) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  const src = locale === "es" ? "/video/Promo-ES.mp4" : "/video/Promo-EN.mp4";

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 70%",
      end: "bottom top",
      onEnter: () => playerRef.current?.play(),
      onLeave: () => playerRef.current?.pause(),
      onEnterBack: () => playerRef.current?.play(),
      onLeaveBack: () => playerRef.current?.pause(),
    });
  });
  return (
    <ScrollAnimation>
      <div
        data-scroll-animation="fade-up"
        className={cn("px-4", className)}
        ref={containerRef}
      >
        <div className="rounded-4xl overflow-hidden">
          <Player muted loop playsInline ref={playerRef} src={src} />
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default VideoPlayer;
