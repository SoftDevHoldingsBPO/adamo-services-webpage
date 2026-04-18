"use client";

import { Badge } from "@adamosuiteservices/ui/badge";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@adamosuiteservices/ui/table";
import { Loader2, Search } from "lucide-react";

import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { AddUserDialog } from "./add-user/add-user-dialog";
import { RemoveUserDialog } from "./remove-user/remove-user-dialog";
import { useUsersTable } from "./users-table/use-users-table";
import { UserRowActions } from "./users-table/user-row-actions";

export type UsersTableProps = ComponentProps<"section">;

export function UsersTable({ className, ...props }: UsersTableProps) {
  const {
    t,
    search,
    setSearch,
    filteredUsers,
    togglingUserId,
    dialogState,
    setDialogState,
    removingUser,
    setRemovingUser,
    handleToggleStatus,
    handleEditRoles,
    handleCloseDialog,
    handleUserAdded,
    handleUserEdited,
    handleRemoveUser,
    handleConfirmRemove,
  } = useUsersTable();

  return (
    <div className="w-full overflow-x-clip">
      <section
        data-inview
        className={cn(
          "rounded-3xl bg-background drop-shadow-parallax border mx-4 max-w-5xl xl:mx-auto p-6 flex flex-col gap-6",
          className,
        )}
        {...props}
      >
        {/* Table header bar */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center flex-1 min-w-[220px]">
            <p className="font-semibold text-sm text-neutral-700 shrink-0">
              {t("count", { count: filteredUsers.length })}
            </p>
          </div>
          <Button
            className="shrink-0"
            onClick={() => setDialogState({ open: true })}
          >
            {t("addUser")}
          </Button>
          <div className="flex-1 min-w-[220px]">
            <Input
              leftIcon={<Search className="size-6 text-neutral-400" />}
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="border border-neutral-200 rounded-2xl overflow-hidden overflow-x-clip">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] caption-bottom text-sm">
              <TableHeader className="bg-neutral-50">
                <TableRow className="border-b border-neutral-100">
                  <TableHead className="px-4 font-semibold text-xs text-neutral-700 uppercase tracking-wide w-1/3 h-16">
                    {t("columns.name")}
                  </TableHead>
                  <TableHead className="px-4 font-semibold text-xs text-neutral-700 uppercase tracking-wide w-1/3 h-16">
                    {t("columns.serviceRole")}
                  </TableHead>
                  <TableHead className="px-4 font-semibold text-xs text-neutral-700 uppercase tracking-wide h-16">
                    {t("columns.status")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="px-4 h-16 text-center text-sm text-neutral-400"
                    >
                      {t("noData")}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow
                      key={user.id}
                      className="border-b border-neutral-100"
                    >
                      <TableCell className="px-4 font-normal text-sm text-neutral-700 h-16">
                        {user.name}
                      </TableCell>
                      <TableCell className="px-4 text-sm text-neutral-700 h-16">
                        {user.serviceRole}
                      </TableCell>
                      <TableCell className="px-4 h-16">
                        <div className="flex items-center justify-between">
                          {togglingUserId === user.id ? (
                            <div className="flex items-center gap-2 text-neutral-400">
                              <Loader2 className="size-4 animate-spin" />
                              <span className="text-xs">
                                {user.status === "active"
                                  ? t("actions.disableUser")
                                  : t("actions.enableUser")}
                              </span>
                            </div>
                          ) : (
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "success-medium"
                                  : "warning-medium"
                              }
                            >
                              {user.status === "active"
                                ? t("status.active")
                                : t("status.disabled")}
                            </Badge>
                          )}
                          <UserRowActions
                            userStatus={user.status}
                            isToggling={togglingUserId === user.id}
                            onEditRoles={() => handleEditRoles(user)}
                            onToggleStatus={() => handleToggleStatus(user)}
                            onRemoveUser={() => handleRemoveUser(user)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </table>
          </div>
        </div>

        <AddUserDialog
          open={dialogState.open}
          onOpenChange={(open) => {
            if (!open) handleCloseDialog();
          }}
          initialData={dialogState.initialData}
          onUserAdded={
            dialogState.initialData ? handleUserEdited : handleUserAdded
          }
        />
        <RemoveUserDialog
          open={removingUser !== null}
          onOpenChange={(open) => {
            if (!open) setRemovingUser(null);
          }}
          userName={removingUser?.name}
          onConfirm={handleConfirmRemove}
        />
      </section>
    </div>
  );
}
