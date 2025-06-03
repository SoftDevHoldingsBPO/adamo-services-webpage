import gsap from "gsap";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { usePathname } from "next/navigation";

type AnimationContextType = {
  isPreloaderDone: boolean;
  setIsPreloaderDone: (isPreloaderDone: boolean) => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
);

export const AnimationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const pathname = usePathname();

  const contextValue = useMemo(
    () => ({ isPreloaderDone, setIsPreloaderDone }),
    [isPreloaderDone],
  );

  // Inview animation
  useEffect(() => {
    if (!isPreloaderDone) return;
    const elements = document.querySelectorAll("[data-animation-inview]");

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.getAttribute("data-animation-inview-delay");
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: delay ? parseFloat(delay) : 0,
            });

            obs.unobserve(el);
          }
        });
      },
      {
        threshold: 0,
      },
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [isPreloaderDone, pathname]);

  return (
    <AnimationContext.Provider value={contextValue}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }

  return context;
};
