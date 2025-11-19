"use client";

import { PasswordRecoveryVerifyEmailStep } from "@/features/auth/components/password-recovery/password-recovery-verify-email-step";
import { PasswordRecoveryEmailStep } from "@/features/auth/components/password-recovery/password-recovery-email-step";
import { PasswordRecoveryNewPasswordStep } from "@/features/auth/components/password-recovery/password-recovery-new-password-step";
import {
  PasswordRecoveryProvider,
  usePasswordRecovery,
} from "@/features/auth/contexts/password-recovery.context";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export type PasswordRecoveryDialogProps = ComponentProps<typeof Dialog>;

export function PasswordRecoveryDialog({
  open,
  onOpenChange,
  ...props
}: PasswordRecoveryDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <PasswordRecoveryProvider
          isPasswordRecoveryDialogOpen={open ?? false}
          setIsPasswordRecoveryDialogOpen={onOpenChange ?? (() => {})}
        >
          <PasswordRecoveryContent />
        </PasswordRecoveryProvider>
      </DialogContent>
    </Dialog>
  );
}

function PasswordRecoveryContent() {
  const { passwordRecoveryStep } = usePasswordRecovery();

  return (
    <>
      {passwordRecoveryStep === "email" && <PasswordRecoveryEmailStep />}
      {passwordRecoveryStep === "code" && <PasswordRecoveryVerifyEmailStep />}
      {passwordRecoveryStep === "new-password" && (
        <PasswordRecoveryNewPasswordStep />
      )}
    </>
  );
}
