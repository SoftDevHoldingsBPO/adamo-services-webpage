import { gsap } from "gsap";

export const inViewAnimation = () => {
  const elements = gsap.utils.toArray("[data-inview]") as Element[];

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.getAttribute("data-inview-delay");
          gsap.to(el, {
            y: 0,
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            delay: delay ? parseFloat(delay) : 0,
          });

          obs.unobserve(el);
        }
      });
    },
    {
      threshold: 0.25,
    },
  );

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect();
};
