import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { usePathname } from "next/navigation";

import { inViewAnimation } from "@/lib/animations";

import { useNavigation } from "./NavigationProvider";

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
  const { isOpen } = useNavigation();
  const pathname = usePathname();

  useEffect(() => {
    if (isPreloaderDone && !isOpen) {
      const cleanup = inViewAnimation();
      return cleanup;
    }
  }, [isPreloaderDone, pathname, isOpen]);

  const contextValue = useMemo(
    () => ({ isPreloaderDone, setIsPreloaderDone }),
    [isPreloaderDone],
  );

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
