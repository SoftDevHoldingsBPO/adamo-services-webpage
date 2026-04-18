"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";
import { OrgUser } from "@/features/auth/entities/user.entity";
import { ProfileService } from "@/features/profile/services/profile.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";

import { useEffect, useRef, useState } from "react";

import { useTranslations } from "next-intl";

import type {
  AddUserFormValues,
  AddUserInitialData,
} from "../add-user/add-user-form";
import type { User, UserStatus } from "./types";

const productToServiceKey: Record<string, string> = {
  adamo_id: "id",
  adamo_pay: "pay",
  adamo_sign: "sign",
  adamo_risk: "risk",
  adamo_check: "check",
};

const serviceKeyToProduct: Record<string, string> = {
  id: "adamo_id",
  pay: "adamo_pay",
  sign: "adamo_sign",
  risk: "adamo_risk",
  check: "adamo_check",
};

function toProperName(str: string): string {
  return str
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

export function useUsersTable() {
  const t = useTranslations("users-table");
  const tDialog = useTranslations("add-user-dialog");
  const { user: authUser } = useAuth();

  const buildOrgUserServiceRole = (roles: OrgUser["roles"]): string => {
    const withProduct = roles.filter(
      (r) => r.product && productToServiceKey[r.product],
    );
    if (withProduct.length > 0) {
      return withProduct
        .map((r) => {
          const serviceKey = productToServiceKey[r.product!];
          return `${tDialog(`services.${serviceKey}`)} (${tDialog(`roles.${r.role}`)})`;
        })
        .join(", ");
    }
    return roles.map((r) => r.role).join(", ");
  };

  const mapOrgUserToTableUser = (orgUser: OrgUser): User => ({
    id: orgUser.uuid,
    name: orgUser.fullName,
    email: orgUser.email,
    serviceRole: buildOrgUserServiceRole(orgUser.roles),
    status: orgUser.isActive ? "active" : "disabled",
    services: Object.fromEntries(
      orgUser.roles
        .filter((r) => r.product && productToServiceKey[r.product])
        .map((r) => [
          productToServiceKey[r.product!],
          { enabled: true, role: r.role },
        ]),
    ),
    createdAt: new Date(),
  });

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>(() =>
    (authUser?.orgUsers ?? [])
      .map(mapOrgUserToTableUser)
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
  const [togglingUserId, setTogglingUserId] = useState<string | null>(null);
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    userId?: string;
    initialData?: AddUserInitialData;
  }>({ open: false });
  const [removingUser, setRemovingUser] = useState<User | null>(null);

  useEffect(() => {
    setUsers(
      (authUser?.orgUsers ?? [])
        .map(mapOrgUserToTableUser)
        .sort((a, b) => a.name.localeCompare(b.name)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser?.orgUsers]);

  const filteredUsers = users
    .filter((user) => {
      const tokens = search.trim().toLowerCase().split(/\s+/).filter(Boolean);
      if (tokens.length === 0) return true;
      const haystack = `${user.name} ${user.email}`.toLowerCase();
      return tokens.every((token) => haystack.includes(token));
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const buildServiceRole = (
    entries: [string, { enabled: boolean; role?: string }][],
  ) =>
    entries
      .map(
        ([svc, s]) =>
          `${tDialog(`services.${svc}`)} (${tDialog(`roles.${s.role!}`)})`,
      )
      .join(", ");

  const handleToggleStatus = async (user: User) => {
    setTogglingUserId(user.id);
    const isActive = user.status !== "active";

    try {
      await ProfileService.toggleOrgUserStatus(user.id, isActive);
    } catch {
      setTogglingUserId(null);
      ToastManager.show({
        variant: "destructive",
        message: t("actions.toggleError"),
      });
      return;
    }

    try {
      const refreshed = await ProfileService.getOrgUsers(authUser!.email);
      setUsers(
        refreshed
          .map(mapOrgUserToTableUser)
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
    } catch {
      // silently keep stale data if refresh fails
    }

    const newStatus: UserStatus = isActive ? "active" : "disabled";
    ToastManager.show({
      variant: "success",
      message: t(
        newStatus === "disabled"
          ? "actions.disableSuccess"
          : "actions.enableSuccess",
        { name: user.name },
      ),
    });
    setTogglingUserId(null);
  };

  const handleEditRoles = (user: User) => {
    const parts = user.name.trim().split(/\s+/);
    const name = parts[0] ?? "";
    const surname = parts.slice(1).join(" ");
    setDialogState({
      open: true,
      userId: user.id,
      initialData: {
        name,
        surname,
        email: user.email,
        services: user.services,
      },
    });
  };

  const handleCloseDialog = () => {
    setDialogState((prev) => ({ ...prev, open: false }));
  };

  const handleUserAdded = async (values: AddUserFormValues) => {
    const products = Object.entries(values.services)
      .filter(([, s]) => s.enabled && s.role)
      .map(([svc, s]) => ({
        product: serviceKeyToProduct[svc] ?? svc,
        role: s.role!,
      }));

    try {
      await ProfileService.registerOrgUser({
        name: toProperName(values.name),
        surname: toProperName(values.surname),
        email: values.email,
        products,
      });
    } catch {
      ToastManager.show({
        variant: "destructive",
        message: t("actions.addError"),
      });
      throw new Error("register failed");
    }

    const fullName = `${toProperName(values.name)} ${toProperName(values.surname)}`;

    try {
      const refreshed = await ProfileService.getOrgUsers(authUser!.email);
      setUsers(
        refreshed
          .map(mapOrgUserToTableUser)
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
    } catch {
      // silently keep stale data if refresh fails
    }

    ToastManager.show({
      variant: "success",
      message: t("actions.addSuccess", { name: fullName }),
    });
    handleCloseDialog();
  };

  const handleUserEdited = async (values: AddUserFormValues) => {
    const userId = dialogState.userId;
    if (!userId) return;

    const products = Object.entries(values.services)
      .filter(([, s]) => s.enabled && s.role)
      .map(([svc, s]) => ({
        product: serviceKeyToProduct[svc] ?? svc,
        role: s.role!,
      }));

    try {
      await ProfileService.updateOrgUser(userId, {
        name: toProperName(values.name),
        surname: toProperName(values.surname),
        products,
      });
    } catch {
      ToastManager.show({
        variant: "destructive",
        message: t("actions.editError"),
      });
      throw new Error("update failed");
    }

    const fullName = `${toProperName(values.name)} ${toProperName(values.surname)}`;

    try {
      const refreshed = await ProfileService.getOrgUsers(authUser!.email);
      setUsers(
        refreshed
          .map(mapOrgUserToTableUser)
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
    } catch {
      // silently keep stale data if refresh fails
    }

    ToastManager.show({
      variant: "success",
      message: t("actions.editSuccess", { name: fullName }),
    });
    handleCloseDialog();
  };

  const handleRemoveUser = (user: User) => {
    setRemovingUser(user);
  };

  const handleConfirmRemove = async () => {
    if (!removingUser || !authUser) return;

    try {
      await ProfileService.deleteOrgUser(removingUser.id);
    } catch {
      ToastManager.show({
        variant: "destructive",
        message: t("actions.removeError"),
      });
      return;
    }

    const removedName = removingUser.name;
    setRemovingUser(null);

    try {
      const refreshed = await ProfileService.getOrgUsers(authUser.email);
      setUsers(
        refreshed
          .map(mapOrgUserToTableUser)
          .sort((a, b) => a.name.localeCompare(b.name)),
      );
    } catch {
      // keep stale data if refresh fails
    }

    ToastManager.show({
      variant: "success",
      message: t("actions.removeSuccess", { name: removedName }),
    });
  };

  return {
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
  };
}
