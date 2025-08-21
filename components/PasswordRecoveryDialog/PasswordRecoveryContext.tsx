"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

export type PasswordRecoveryStep = "email" | "code" | "new-password";

export type PasswordRecoveryContextType = {
  passwordRecoveryStep: PasswordRecoveryStep;
  setPasswordRecoveryStep: (step: PasswordRecoveryStep) => void;
  isPasswordRecoveryDialogOpen: boolean;
  setIsPasswordRecoveryDialogOpen: (open: boolean) => void;
};

const PasswordRecoveryContext = createContext<
  PasswordRecoveryContextType | undefined
>(undefined);

type PasswordRecoveryProviderProps = {
  children: ReactNode;
  isPasswordRecoveryDialogOpen: boolean;
  setIsPasswordRecoveryDialogOpen: (open: boolean) => void;
};

export function PasswordRecoveryProvider({
  children,
  isPasswordRecoveryDialogOpen,
  setIsPasswordRecoveryDialogOpen,
}: PasswordRecoveryProviderProps) {
  const [passwordRecoveryStep, setPasswordRecoveryStep] =
    useState<PasswordRecoveryStep>("email");

  const value: PasswordRecoveryContextType = {
    passwordRecoveryStep,
    setPasswordRecoveryStep,
    isPasswordRecoveryDialogOpen,
    setIsPasswordRecoveryDialogOpen,
  };

  return (
    <PasswordRecoveryContext.Provider value={value}>
      {children}
    </PasswordRecoveryContext.Provider>
  );
}

export function usePasswordRecovery() {
  const context = useContext(PasswordRecoveryContext);
  if (context === undefined) {
    throw new Error(
      "usePasswordRecovery must be used within a PasswordRecoveryProvider",
    );
  }
  return context;
}

export default PasswordRecoveryContext;
