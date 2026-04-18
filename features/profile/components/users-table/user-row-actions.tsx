"use client";

import { Button } from "@adamosuiteservices/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@adamosuiteservices/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

import { useState } from "react";

import { useTranslations } from "next-intl";

import type { UserStatus } from "./types";

type UserRowActionsProps = {
  userStatus: UserStatus;
  isToggling: boolean;
  onEditRoles: () => void;
  onToggleStatus: () => void;
  onRemoveUser: () => void;
};

export function UserRowActions({
  userStatus,
  isToggling,
  onEditRoles,
  onToggleStatus,
  onRemoveUser,
}: UserRowActionsProps) {
  const t = useTranslations("users-table");
  const [open, setOpen] = useState(false);

  const handleSelectWithDialog = (callback: () => void) => (e: Event) => {
    e.preventDefault();
    setOpen(false);
    callback();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" disabled={isToggling}>
          <MoreVertical className="size-4 text-neutral-400" />
          <span className="sr-only">{t("actions.open")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={handleSelectWithDialog(onEditRoles)}>
          {t("actions.editRoles")}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleSelectWithDialog(onToggleStatus)}>
          {userStatus === "active"
            ? t("actions.disableUser")
            : t("actions.enableUser")}
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onSelect={handleSelectWithDialog(onRemoveUser)}
        >
          {t("actions.removeUser")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
