"use client";

import { PersonalInformationStep } from "@/features/register/components/personal-information-step";
import { ProductsStep } from "@/features/register/components/products-step";
import { RegisterStepper } from "@/features/register/components/register-stepper";
import { RegistrationSuccessStep } from "@/features/register/components/registration-success-step";
import { VerificationStep } from "@/features/register/components/verification-step";
import {
  RegisterProvider,
  useRegister,
} from "@/features/register/contexts/register.context";

function RegisterContent() {
  const { currentStep, setCurrentStep } = useRegister();

  return (
    <>
      {/* Dark banner */}
      <div className="bg-primary h-72 mt-[100px] mx-4 rounded-4xl" />

      {/* White card */}
      <div className="relative -mt-56 mx-auto max-w-5xl px-4 md:px-0 mb-5">
        <div className="bg-white rounded-3xl drop-shadow-parallax px-6 pt-10 pb-12 md:px-10 flex flex-col gap-10 items-start">
          {currentStep !== "success" && (
            <RegisterStepper
              currentStep={currentStep}
              onNavigate={setCurrentStep}
            />
          )}

          {currentStep === "personal-information" && (
            <PersonalInformationStep />
          )}
          {currentStep === "verification" && <VerificationStep />}
          {currentStep === "products" && <ProductsStep />}
          {currentStep === "success" && <RegistrationSuccessStep />}
        </div>
      </div>
    </>
  );
}

export default function Page() {
  return (
    <RegisterProvider>
      <RegisterContent />
    </RegisterProvider>
  );
}
