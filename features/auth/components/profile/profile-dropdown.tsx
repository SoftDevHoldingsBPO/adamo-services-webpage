import { useAuth } from "@/features/auth/contexts/auth.context";
import { User } from "@/features/auth/entities/user.entity";

import { ComponentProps } from "react";

import { useTranslations } from "next-intl";

import { getInitials } from "@/lib/get-initials";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type ProfileDropdownProps = { user: User } & ComponentProps<
  typeof Avatar
>;

export function ProfileDropdown({
  user,
  className,
  ...props
}: ProfileDropdownProps) {
  const { signOut } = useAuth();
  const t = useTranslations("profile-dropdown");

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
        <DropdownMenuItem>{t("goToAccount")}</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          {t("signOut")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
