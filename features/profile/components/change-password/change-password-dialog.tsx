"use client";

import { ChangePasswordForm } from "@/features/profile/components/change-password/change-password-form";
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
        <ChangePasswordForm onPasswordChanged={onPasswordChanged} />
      </DialogContent>
    </Dialog>
  );
}
