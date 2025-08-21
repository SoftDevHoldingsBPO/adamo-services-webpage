import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { PasswordRecoveryCodeStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryCodeStep";
import {
  PasswordRecoveryProvider,
  usePasswordRecovery,
} from "@/components/PasswordRecoveryDialog/PasswordRecoveryContext";
import { PasswordRecoveryEmailStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryEmailStep";
import { PasswordRecoveryNewPasswordStep } from "@/components/PasswordRecoveryDialog/PasswordRecoveryNewPasswordStep";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type PasswordRecoveryDialogProps = ComponentProps<typeof Dialog>;

export function PasswordRecoveryDialog(props: PasswordRecoveryDialogProps) {
  return (
    <PasswordRecoveryProvider
      isPasswordRecoveryDialogOpen={props.open ?? false}
      setIsPasswordRecoveryDialogOpen={props.onOpenChange ?? (() => {})}
    >
      <PasswordRecoveryContent {...props} />
    </PasswordRecoveryProvider>
  );
}

function PasswordRecoveryContent({
  open,
  onOpenChange,
  ...props
}: PasswordRecoveryDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  const { passwordRecoveryStep } = usePasswordRecovery();

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        {passwordRecoveryStep === "email" && <PasswordRecoveryEmailStep />}
        {passwordRecoveryStep === "code" && <PasswordRecoveryCodeStep />}
        {passwordRecoveryStep === "new-password" && (
          <PasswordRecoveryNewPasswordStep />
        )}
      </DialogContent>
    </Dialog>
  );
}
