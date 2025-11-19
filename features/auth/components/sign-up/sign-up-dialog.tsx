"use client";

import { SignUpInformationStep } from "@/features/auth/components/sign-up/sign-up-information-step";
import { SignUpVerifyEmailStep } from "@/features/auth/components/sign-up/sign-up-verify-email-step";
import {
  SignUpProvider,
  useSignUp,
} from "@/features/auth/contexts/sign-up.context";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export type SignUpDialogProps = ComponentProps<typeof Dialog>;

export function SignUpDialog({
  open,
  onOpenChange,
  ...props
}: SignUpDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <SignUpProvider
          isSignUpDialogOpen={open ?? false}
          setIsSignUpDialogOpen={onOpenChange ?? (() => {})}
        >
          <SignUpContent />
        </SignUpProvider>
      </DialogContent>
    </Dialog>
  );
}

function SignUpContent() {
  const { signUpStep } = useSignUp();

  return (
    <>
      {signUpStep === "information" && <SignUpInformationStep />}
      {signUpStep === "code" && <SignUpVerifyEmailStep />}
    </>
  );
}
