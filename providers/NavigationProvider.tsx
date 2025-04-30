"use client";

import { gsap } from "gsap";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";

const ANIMATION_CONFIG = {
  OPEN: {
    TIMESCALE: 1,
    DURATION: 0.6,
    EASE: "power3.out",
  },
  CLOSE: {
    TIMESCALE: 1.2,
  },
} as const;

interface NavigationContextType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleMenu: () => void;
  timeline: React.RefObject<gsap.core.Timeline | null>;
}

const NavigationContext = createContext<NavigationContextType | undefined>(
  undefined,
);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeline = useRef<gsap.core.Timeline | null>(null);

  const toggleMenu = useCallback(() => {
    if (!timeline.current) return;

    if (!isOpen) {
      setIsOpen(true);
      timeline.current.timeScale(ANIMATION_CONFIG.OPEN.TIMESCALE).play();
    } else {
      timeline.current.timeScale(ANIMATION_CONFIG.CLOSE.TIMESCALE).reverse();
    }
  }, [isOpen]);

  const contextValue = {
    isOpen,
    setIsOpen,
    toggleMenu,
    timeline,
  };

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
