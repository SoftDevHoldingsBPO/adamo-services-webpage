import { createContext, useContext, useMemo, useState } from "react";

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
