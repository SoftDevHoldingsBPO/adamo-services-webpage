import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { WavingHandIcon } from "@/components/icon/WavingHandIcon";

export type HeaderProps = ComponentProps<"div">;

export function Header({ className, ...props }: HeaderProps) {
  return (
    <div
      className={cn("flex items-center gap-6 mb-6 md:mb-10", className)}
      {...props}
    >
      <div className="p-4 border-8 border-white/20 rounded-full bg-neutral-800">
        <WavingHandIcon />
      </div>
      <p className="font-semibold text-2xl md:text-3xl">
        Hola Juan! ¿Qué servicio deseas utilizar hoy?
      </p>
    </div>
  );
}
