import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { PasswordRecoveryContent } from "@/components/PasswordRecoveryDialog/PasswordRecoveryContent";
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
        <PasswordRecoveryContent />
      </DialogContent>
    </Dialog>
  );
}
