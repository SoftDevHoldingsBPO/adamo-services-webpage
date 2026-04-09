"use client";

import { RegisterStep } from "@/features/register/components/register-stepper";
import { RegisterPersonalInfoValues } from "@/features/register/schemas/register.schema";

import { PropsWithChildren, createContext, useContext, useState } from "react";

export type RegisterContextType = {
  currentStep: RegisterStep;
  setCurrentStep: (step: RegisterStep) => void;
  registrationEmail: string;
  setRegistrationEmail: (email: string) => void;
  personalInfoValues: Partial<RegisterPersonalInfoValues>;
  setPersonalInfoValues: (values: RegisterPersonalInfoValues) => void;
};

const RegisterContext = createContext<RegisterContextType | undefined>(
  undefined,
);

export function RegisterProvider({ children }: PropsWithChildren) {
  const [currentStep, setCurrentStep] = useState<RegisterStep>(
    "personal-information",
  );
  const [registrationEmail, setRegistrationEmail] = useState<string>("");
  const [personalInfoValues, setPersonalInfoValues] = useState<
    Partial<RegisterPersonalInfoValues>
  >({});

  return (
    <RegisterContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        registrationEmail,
        setRegistrationEmail,
        personalInfoValues,
        setPersonalInfoValues,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  const context = useContext(RegisterContext);

  if (context === undefined) {
    throw new Error("useRegister must be used within a RegisterProvider");
  }

  return context;
}
