import { ComponentProps } from "react";

import { useTranslations } from "next-intl";

import { useAuth } from "@/features/auth/contexts/auth.context";
import { cn } from "@/lib/utils";

import { WavingHandIcon } from "@/components/icon/WavingHandIcon";

export type HeaderProps = ComponentProps<"div">;

export function Header({ className, ...props }: HeaderProps) {
  const t = useTranslations("my-services");
  const { user } = useAuth();

  const greeting = user?.name
    ? t("header.greeting", { name: user.name })
    : t("header.greetingFallback");

  return (
    <div
      className={cn("flex items-center gap-6 mb-6 md:mb-10", className)}
      {...props}
    >
      <div className="p-4 border-8 border-white/20 rounded-full bg-neutral-800">
        <WavingHandIcon />
      </div>
      <p className="font-semibold text-2xl md:text-3xl">
        {greeting}
      </p>
    </div>
  );
}
