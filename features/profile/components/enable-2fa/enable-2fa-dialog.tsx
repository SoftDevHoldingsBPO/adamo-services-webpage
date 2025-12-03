"use client";

import { Enable2FAEnabledStep } from "@/features/profile/components/enable-2fa/enable-2fa-enabled-step";
import { Enable2FASetupStep } from "@/features/profile/components/enable-2fa/enable-2fa-setup-step";
import {
  Enable2FAProvider,
  useEnable2FA,
} from "@/features/profile/contexts/enable-2fa.context";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

export type Enable2FADialogProps = ComponentProps<typeof Dialog>;

export function Enable2FADialog({
  open,
  onOpenChange,
  ...props
}: Enable2FADialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <Enable2FAProvider
          isEnable2FADialogOpen={open ?? false}
          setIsEnable2FADialogOpen={onOpenChange ?? (() => {})}
        >
          <Enable2FADialogContent />
        </Enable2FAProvider>
      </DialogContent>
    </Dialog>
  );
}

function Enable2FADialogContent() {
  const { enable2FAStep } = useEnable2FA();

  return (
    <>
      {enable2FAStep === "setup" && <Enable2FASetupStep />}
      {enable2FAStep === "enabled" && <Enable2FAEnabledStep />}
    </>
  );
}
