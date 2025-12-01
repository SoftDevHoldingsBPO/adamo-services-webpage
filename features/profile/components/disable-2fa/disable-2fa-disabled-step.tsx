import { SixCodeSchema } from "@/features/auth/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft } from "lucide-react";
import z from "zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  DialogBack,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LocaleSelect from "@/components/ui/locale-select";

export function Disable2FADisabledStep() {
  return (
    <>
      <DialogHeader>
        <div className="md:hidden flex gap-2 items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <DialogClose>
              <ArrowLeft />
            </DialogClose>
            <DialogTitle>Desactivar 2FA</DialogTitle>
          </div>
          <LocaleSelect />
        </div>
        <DialogClose asChild className="hidden md:flex">
          <DialogBack />
        </DialogClose>
        <DialogTitle className="hidden md:block">Desactivar 2FA</DialogTitle>
        <DialogDescription>
          El Doble Factor de Autenticación ha sido desactivado. La seguridad de
          tu cuenta es ahora más débil y puedes estar expuesto a ingresos no
          autorizados.
        </DialogDescription>
      </DialogHeader>
      <div className="bg-yellow-50 p-4 rounded-lg">
        <p className="text-neutral-500">
          Si deseas, puedes volver a activarlo en cualquier momento desde tu
          perfil de usuario.
        </p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="muted">
            Aceptar
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  );
}
