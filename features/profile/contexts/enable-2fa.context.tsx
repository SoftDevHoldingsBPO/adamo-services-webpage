"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

export type Enable2FAStep = "setup" | "enabled";

export type Enable2FAContextType = {
  enable2FAStep: Enable2FAStep;
  setEnable2FAStep: (step: Enable2FAStep) => void;
  isEnable2FADialogOpen: boolean;
  setIsEnable2FADialogOpen: (isOpen: boolean) => void;
};

const Enable2FAContext = createContext<Enable2FAContextType | undefined>(
  undefined,
);

export type Enable2FAProviderProps = PropsWithChildren<{
  isEnable2FADialogOpen: boolean;
  setIsEnable2FADialogOpen: (isOpen: boolean) => void;
}>;

export function Enable2FAProvider({
  isEnable2FADialogOpen,
  setIsEnable2FADialogOpen,
  children,
}: Enable2FAProviderProps) {
  const [enable2FAStep, setEnable2FAStep] = useState<Enable2FAStep>("setup");

  const value: Enable2FAContextType = {
    enable2FAStep,
    setEnable2FAStep,
    isEnable2FADialogOpen,
    setIsEnable2FADialogOpen,
  };

  return (
    <Enable2FAContext.Provider value={value}>
      {children}
    </Enable2FAContext.Provider>
  );
}

export function useEnable2FA() {
  const context = useContext(Enable2FAContext);

  if (context === undefined) {
    throw new Error("useEnable2FA must be used within an Enable2FAProvider");
  }

  return context;
}
