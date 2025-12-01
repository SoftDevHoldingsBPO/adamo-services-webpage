import { Disable2FACodeStep } from "@/features/profile/components/disable-2fa/disable-2fa-code-step";
import { Disable2FADisabledStep } from "@/features/profile/components/disable-2fa/disable-2fa-disabled-step";
import { Disable2FAStartStep } from "@/features/profile/components/disable-2fa/disable-2fa-start-step";
import {
  Disable2FAProvider,
  Disable2FAStep,
  useDisable2FA,
} from "@/features/profile/contexts/disable-2fa.context";
import { Dialog } from "@radix-ui/react-dialog";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps, useState } from "react";

import { DialogContent } from "@/components/ui/dialog";

export type Disable2FADialogProps = ComponentProps<typeof Dialog>;

export function Disable2FADialog({
  open,
  onOpenChange,
  ...props
}: Disable2FADialogProps) {
  const [isNotStartStep, setIsNotStartStep] = useState<boolean>(false);

  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        // If the dialog is being closed, reset to the is not start step state
        if (!open) {
          setIsNotStartStep(false);
        }

        if (onOpenChange) {
          onOpenChange(open);
        }
      }}
      {...props}
    >
      <DialogContent
        // Show close button and fullscreen only if not in the start step
        showCloseButton={isAtLeastTablet && isNotStartStep}
        isFullscreen={!isAtLeastTablet && isNotStartStep}
      >
        <Disable2FAProvider
          isDisable2FADialogOpen={open ?? false}
          setIsDisable2FADialogOpen={onOpenChange ?? (() => {})}
          onStepChange={(step) => {
            setIsNotStartStep(step !== "start");
          }}
        >
          <Disable2FADialogContent />
        </Disable2FAProvider>
      </DialogContent>
    </Dialog>
  );
}

function Disable2FADialogContent() {
  const { disable2FAStep } = useDisable2FA();

  return (
    <>
      {disable2FAStep === "start" && <Disable2FAStartStep />}
      {disable2FAStep === "code" && <Disable2FACodeStep />}
      {disable2FAStep === "disabled" && <Disable2FADisabledStep />}
    </>
  );
}
