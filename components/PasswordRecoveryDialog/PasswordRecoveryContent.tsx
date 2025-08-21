import { useState } from "react";

import { PasswordRecoveryCodeStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryCodeStep";
import { PasswordRecoveryEmailStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryEmailStep";
import { PasswordRecoveryNewPasswordStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryNewPasswordStep";

export type PasswordRecoveryStep = "email" | "code" | "new-password";

export function PasswordRecoveryContent() {
  const [step, setStep] = useState<PasswordRecoveryStep>("email");

  return (
    <>
      {step === "email" && <PasswordRecoveryEmailStep setStep={setStep} />}
      {step === "code" && <PasswordRecoveryCodeStep setStep={setStep} />}
      {step === "new-password" && (
        <PasswordRecoveryNewPasswordStep setStep={setStep} />
      )}
    </>
  );
}
