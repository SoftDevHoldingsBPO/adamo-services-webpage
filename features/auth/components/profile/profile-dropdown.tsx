import { useAuth } from "@/features/auth/contexts/auth.context";
import { User } from "@/features/auth/entities/user.entity";

import { ComponentProps } from "react";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { getInitials } from "@/lib/get-initials";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const APP_ROUTES = [
  {
    path: "/adamo-id",
    translationKey: "goToAdamoId" as const,
    url: process.env.NEXT_PUBLIC_ADAMO_ID_URL,
  },
  {
    path: "/adamo-pay",
    translationKey: "goToAdamoPay" as const,
    url: process.env.NEXT_PUBLIC_ADAMO_PAY_URL,
  },
  {
    path: "/adamo-sign",
    translationKey: "goToAdamoSign" as const,
    url: process.env.NEXT_PUBLIC_ADAMO_SIGN_URL,
  },
  {
    path: "/adamo-risk",
    translationKey: "goToAdamoRisk" as const,
    url: process.env.NEXT_PUBLIC_ADAMO_RISK_URL,
  },
] as const;

export type ProfileDropdownProps = { user: User } & ComponentProps<
  typeof Avatar
>;

export function ProfileDropdown({
  user,
  className,
  ...props
}: ProfileDropdownProps) {
  const t = useTranslations("profile-dropdown");

  const pathname = usePathname();

  const { signOut } = useAuth();

  const currentApp = APP_ROUTES.find((app) => pathname.startsWith(app.path));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          className={cn(
            className,
            "size-11 border-[3px] bg-background border-neutral-200",
          )}
          {...props}
        >
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {currentApp && currentApp.url && (
          <>
            <DropdownMenuItem asChild>
              <a href={currentApp.url} rel="noopener noreferrer">
                {t(currentApp.translationKey)}
              </a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href="/my-services">{t("goToDashboard")}</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">{t("goToAccount")}</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>{t("signOut")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
