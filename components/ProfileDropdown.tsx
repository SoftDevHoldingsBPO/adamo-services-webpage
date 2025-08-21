import { ComponentProps } from "react";

import { User } from "next-auth";
import { signOut } from "next-auth/react";

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar
          className={cn(className, "size-11 border-[3px] border-neutral-200")}
          {...props}
        >
          <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} />
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Ingresar a mi cuenta</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
