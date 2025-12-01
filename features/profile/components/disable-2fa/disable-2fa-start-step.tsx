import { useDisable2FA } from "@/features/profile/contexts/disable-2fa.context";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function Disable2FAStartStep() {
  const { setDisable2FAStepWithCallback } = useDisable2FA();

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          Desactivar Doble Factor de Autenticación (2FA)
        </DialogTitle>
        <DialogDescription>
          Si desactivas el Doble Factor de Autenticación, se debilitará la
          seguridad de tu cuenta y estarás expuesto a ingresos no autorizados.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="muted">Cancelar</Button>
        </DialogClose>
        <Button
          variant="destructive-medium"
          onClick={() => setDisable2FAStepWithCallback("code")}
        >
          Desactivar 2FA
        </Button>
      </DialogFooter>
    </>
  );
}
