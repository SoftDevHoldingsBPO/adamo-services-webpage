"use client";

import { PropsWithChildren, createContext, useContext, useState } from "react";

export type SignUpStep = "information" | "code" | "2fa";

export type SignUpContextType = {
  signUpStep: SignUpStep;
  setSignUpStep: (step: SignUpStep) => void;
  isSignUpDialogOpen: boolean;
  setIsSignUpDialogOpen: (isOpen: boolean) => void;
  is2FADialogActivatedOpen: boolean;
  setIs2FADialogActivatedOpen: (isOpen: boolean) => void;
};

const SignUpContext = createContext<SignUpContextType | undefined>(undefined);

export type SignUpProviderProps = PropsWithChildren<{
  isSignUpDialogOpen: boolean;
  setIsSignUpDialogOpen: (isOpen: boolean) => void;
}>;

export function SignUpProvider({
  isSignUpDialogOpen,
  setIsSignUpDialogOpen,
  children,
}: SignUpProviderProps) {
  const [signUpStep, setSignUpStep] = useState<SignUpStep>("information");

  const [is2FADialogActivatedOpen, setIs2FADialogActivatedOpen] =
    useState(false);

  const value: SignUpContextType = {
    signUpStep,
    setSignUpStep,
    isSignUpDialogOpen,
    setIsSignUpDialogOpen,
    is2FADialogActivatedOpen,
    setIs2FADialogActivatedOpen,
  };

  return (
    <SignUpContext.Provider value={value}>{children}</SignUpContext.Provider>
  );
}

export function useSignUp() {
  const context = useContext(SignUpContext);

  if (context === undefined) {
    throw new Error("useSignUp must be used within a SignUpProvider");
  }

  return context;
}

export default SignUpContext;
