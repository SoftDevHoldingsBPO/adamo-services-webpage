"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

export type Disable2FAStep = "start" | "code" | "disabled";

export type Disable2FAContextType = {
  disable2FAStep: Disable2FAStep;
  setDisable2FAStep: (step: Disable2FAStep) => void;
  setDisable2FAStepWithCallback: (step: Disable2FAStep) => void;
  isDisable2FADialogOpen: boolean;
  setIsDisable2FADialogOpen: (isOpen: boolean) => void;
};

const Disable2FAContext = createContext<Disable2FAContextType | undefined>(
  undefined,
);

export type Disable2FAProviderProps = PropsWithChildren<{
  isDisable2FADialogOpen: boolean;
  setIsDisable2FADialogOpen: (isOpen: boolean) => void;
  onStepChange?: (step: Disable2FAStep) => void;
}>;

export function Disable2FAProvider({
  isDisable2FADialogOpen,
  setIsDisable2FADialogOpen,
  onStepChange,
  children,
}: Disable2FAProviderProps) {
  const [disable2FAStep, setDisable2FAStep] = useState<Disable2FAStep>("start");

  const setDisable2FAStepWithCallback = (step: Disable2FAStep) => {
    setDisable2FAStep(step);

    if (onStepChange) {
      onStepChange(step);
    }
  };

  const value: Disable2FAContextType = {
    disable2FAStep,
    setDisable2FAStep,
    setDisable2FAStepWithCallback,
    isDisable2FADialogOpen,
    setIsDisable2FADialogOpen,
  };

  return (
    <Disable2FAContext.Provider value={value}>
      {children}
    </Disable2FAContext.Provider>
  );
}

export function useDisable2FA() {
  const context = useContext(Disable2FAContext);

  if (context === undefined) {
    throw new Error("useDisable2FA must be used within a Disable2FAProvider");
  }

  return context;
}

export default Disable2FAContext;
