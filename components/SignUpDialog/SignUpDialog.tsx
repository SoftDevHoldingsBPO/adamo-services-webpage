import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { SignUp2FA } from "@/components/SignUpDialog/SignUp2FA";
import { SignUpCodeStep } from "@/components/SignUpDialog/SignUpCodeStep";
import {
  SignUpProvider,
  useSignUp,
} from "@/components/SignUpDialog/SignUpContext";
import { SignUpInformationStep } from "@/components/SignUpDialog/SignUpInformationStep";
import { TwoFactorAuthDialogActivated } from "@/components/TwoFactorAuthDialogActivated";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export type SignUpDialogProps = ComponentProps<typeof Dialog>;

export function SignUpDialog(props: SignUpDialogProps) {
  return (
    <SignUpProvider
      isSignUpDialogOpen={props.open ?? false}
      setIsSignUpDialogOpen={props.onOpenChange ?? (() => {})}
    >
      <SignUpContent {...props} />
    </SignUpProvider>
  );
}

function SignUpContent({ open, onOpenChange, ...props }: SignUpDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  const { signUpStep, is2FADialogActivatedOpen, setIs2FADialogActivatedOpen } =
    useSignUp();

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange} {...props}>
        <DialogContent
          isFullscreen={!isAtLeastTablet}
          showCloseButton={isAtLeastTablet}
        >
          {signUpStep === "information" && <SignUpInformationStep />}
          {signUpStep === "code" && <SignUpCodeStep />}
          {signUpStep === "2fa" && <SignUp2FA />}
        </DialogContent>
      </Dialog>
      <TwoFactorAuthDialogActivated
        open={is2FADialogActivatedOpen}
        onOpenChange={setIs2FADialogActivatedOpen}
      />
    </>
  );
}
