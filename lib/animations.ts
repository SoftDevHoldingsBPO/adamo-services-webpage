import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right";

export interface ScrollAnimationOptions {
  type?: AnimationType;
  delay?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  end?: string;
  markers?: boolean;
}

const defaultOptions: ScrollAnimationOptions = {
  type: "fade-up",
  delay: 0,
  duration: 1,
  stagger: 0.2,
  start: "top 80%",
  end: "bottom 20%",
  markers: false,
};

const getAnimationVars = (type: AnimationType) => {
  switch (type) {
    case "fade-up":
      return { y: 64, opacity: 0 };
    case "fade-down":
      return { y: -64, opacity: 0 };
    case "fade-left":
      return { x: 64, opacity: 0 };
    case "fade-right":
      return { x: -64, opacity: 0 };
    default:
      return { y: 64, opacity: 0 };
  }
};

export const initScrollAnimation = (
  element: HTMLElement,
  options: ScrollAnimationOptions = {},
) => {
  const mergeOptions = { ...defaultOptions, ...options };

  const elements = element.querySelectorAll("[data-scroll-animation]");
  if (!elements.length) return;

  const type = (element as HTMLElement).dataset
    .scrollAnimation as AnimationType;
  const animationVars = getAnimationVars(type || mergeOptions.type!);

  const animation = gsap.fromTo(elements, animationVars, {
    ...animationVars,
    opacity: 1,
    x: 0,
    y: 0,
    duration: mergeOptions.duration,
    ease: "power2.out",
    stagger: mergeOptions.stagger,
    scrollTrigger: {
      trigger: element,
      start: mergeOptions.start,
      end: mergeOptions.end,
      markers: mergeOptions.markers,
    },
  });

  return () => {
    animation.kill();
  };
};
