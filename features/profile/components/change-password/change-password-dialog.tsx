"use client";

import { ChangePasswordCurrentStep } from "@/features/profile/components/change-password/change-password-current-step";
import { ChangePasswordNewStep } from "@/features/profile/components/change-password/change-password-new-step";
import {
  ChangePasswordProvider,
  useChangePassword,
} from "@/features/profile/contexts/change-password.context";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export type ChangePasswordDialogProps = ComponentProps<typeof Dialog> &
  Readonly<{
    onPasswordChanged?: () => void;
  }>;

export function ChangePasswordDialog({
  open,
  onOpenChange,
  onPasswordChanged,
  ...props
}: ChangePasswordDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <ChangePasswordProvider
          isChangePasswordDialogOpen={open ?? false}
          setIsChangePasswordDialogOpen={onOpenChange ?? (() => {})}
        >
          <ChangePasswordDialogContent onPasswordChanged={onPasswordChanged} />
        </ChangePasswordProvider>
      </DialogContent>
    </Dialog>
  );
}

type ChangePasswordDialogContentProps = ChangePasswordDialogProps;

function ChangePasswordDialogContent({
  onPasswordChanged,
}: ChangePasswordDialogContentProps) {
  const { changePasswordStep } = useChangePassword();

  return (
    <>
      {changePasswordStep === "current" && <ChangePasswordCurrentStep />}
      {changePasswordStep === "new" && (
        <ChangePasswordNewStep onPasswordChanged={onPasswordChanged} />
      )}
    </>
  );
}
