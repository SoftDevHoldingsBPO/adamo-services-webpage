"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";

export type PasswordRecoveryStep = "email" | "code" | "new-password";

export type PasswordRecoveryContextType = {
  email: string;
  setEmail: (email: string) => void;
  tempPassword: string;
  setTempPassword: (tempPassword: string) => void;
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
  const [email, setEmail] = useState<string>("");

  const [tempPassword, setTempPassword] = useState<string>("");

  const [passwordRecoveryStep, setPasswordRecoveryStep] =
    useState<PasswordRecoveryStep>("email");

  const value: PasswordRecoveryContextType = {
    email,
    setEmail,
    tempPassword,
    setTempPassword,
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
