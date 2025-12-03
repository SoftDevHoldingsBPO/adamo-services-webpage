"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

export type ChangePasswordStep = "current" | "new";

export type ChangePasswordContextType = {
  changePasswordStep: ChangePasswordStep;
  setChangePasswordStep: (step: ChangePasswordStep) => void;
  currentPassword: string;
  setCurrentPassword: (password: string) => void;
  isChangePasswordDialogOpen: boolean;
  setIsChangePasswordDialogOpen: (isOpen: boolean) => void;
};

const ChangePasswordContext = createContext<
  ChangePasswordContextType | undefined
>(undefined);

export type ChangePasswordProviderProps = PropsWithChildren<{
  isChangePasswordDialogOpen: boolean;
  setIsChangePasswordDialogOpen: (isOpen: boolean) => void;
}>;

export function ChangePasswordProvider({
  isChangePasswordDialogOpen,
  setIsChangePasswordDialogOpen,
  children,
}: ChangePasswordProviderProps) {
  const [changePasswordStep, setChangePasswordStep] =
    useState<ChangePasswordStep>("current");
  const [currentPassword, setCurrentPassword] = useState("");

  const value: ChangePasswordContextType = {
    changePasswordStep,
    setChangePasswordStep,
    currentPassword,
    setCurrentPassword,
    isChangePasswordDialogOpen,
    setIsChangePasswordDialogOpen,
  };

  return (
    <ChangePasswordContext.Provider value={value}>
      {children}
    </ChangePasswordContext.Provider>
  );
}

export function useChangePassword() {
  const context = useContext(ChangePasswordContext);

  if (context === undefined) {
    throw new Error(
      "useChangePassword must be used within a ChangePasswordProvider",
    );
  }

  return context;
}
