"use client";

import { createContext, useContext, useRef, useState } from "react";

type NavigationContextType = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  toggleMenu: () => void;
  timeline: React.RefObject<gsap.core.Timeline | null>;
};

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

  const toggleMenu = () => {
    if (!timeline.current) return;

    if (!isOpen) {
      setIsOpen(true);
      timeline.current.timeScale(1).play();
    } else {
      timeline.current.timeScale(1.5).reverse();
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleMenu,
        timeline,
      }}
    >
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
