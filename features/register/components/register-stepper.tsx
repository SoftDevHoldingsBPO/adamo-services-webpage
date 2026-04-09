"use client";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

export type RegisterStep =
  | "personal-information"
  | "verification"
  | "products"
  | "success";

interface StepperProps {
  currentStep: RegisterStep;
  onNavigate?: (step: RegisterStep) => void;
}

const STEPS: RegisterStep[] = [
  "personal-information",
  "verification",
  "products",
];

interface StepIndicatorProps {
  isActive: boolean;
  isCompleted: boolean;
}

function StepIndicator({ isActive, isCompleted }: StepIndicatorProps) {
  return (
    <div
      className={cn(
        "size-5 rounded-full border shrink-0",
        isActive || isCompleted
          ? "border-adamo-pay-600 shadow-[0px_0px_0px_4px_rgba(14,147,132,0.1)]"
          : "border-neutral-300",
      )}
    >
      {(isActive || isCompleted) && (
        <div className="flex items-center justify-center size-full">
          <div className="size-2 rounded-full bg-adamo-pay-600" />
        </div>
      )}
    </div>
  );
}

function StepLine() {
  return <div className="w-6 h-px bg-neutral-300 shrink-0" />;
}

export function RegisterStepper({ currentStep, onNavigate }: StepperProps) {
  const t = useTranslations("register-page.steps");
  const currentIndex = STEPS.indexOf(currentStep);

  return (
    <div className="flex gap-2 items-center flex-wrap md:flex-nowrap">
      {STEPS.map((step, index) => {
        const isCompleted = index < currentIndex;
        const isActive = index === currentIndex;
        // From the products step onward, verification cannot be navigated back to
        const isBlocked =
          step === "verification" && currentIndex >= STEPS.indexOf("products");
        const isClickable = isCompleted && !!onNavigate && !isBlocked;

        return (
          <div key={step} className="flex gap-2 items-center">
            {index > 0 && <StepLine />}
            <button
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable && onNavigate(step)}
              className={cn(
                "flex gap-2 items-center",
                isClickable ? "cursor-pointer" : "cursor-default",
              )}
            >
              <StepIndicator isActive={isActive} isCompleted={isCompleted} />
              <span
                className={cn(
                  "text-sm whitespace-nowrap",
                  isActive ? "text-neutral-700" : "text-neutral-400",
                  isClickable && "hover:text-neutral-700 transition-colors",
                  !isActive && "hidden md:inline",
                )}
              >
                {t(step)}
              </span>
            </button>
          </div>
        );
      })}
    </div>
  );
}
