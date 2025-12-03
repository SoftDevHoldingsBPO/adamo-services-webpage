"use client";

import { useAuth } from "@/features/auth/contexts/auth.context";
import { ChangePasswordDialog } from "@/features/profile/components/change-password/change-password-dialog";
import { Disable2FADialog } from "@/features/profile/components/disable-2fa/disable-2fa-dialog";
import { Enable2FADialog } from "@/features/profile/components/enable-2fa/enable-2fa-dialog";

import { ComponentProps, useState } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

export type SecurityFormProps = ComponentProps<"article">;

export function SecurityForm({ className, ...props }: SecurityFormProps) {
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);

  const [isEnable2FADialogOpen, setIsEnable2FADialogOpen] = useState(false);
  const [isDisable2FADialogOpen, setIsDisable2FADialogOpen] = useState(false);

  const { signOut, user } = useAuth();

  const t = useTranslations("security-form");

  const isTwoFactorEnabled = user?.isTwoFactorEnabled ?? false;

  return (
    <>
      <article
        data-inview
        className={cn(
          "rounded-3xl bg-background drop-shadow-parallax p-6 border mx-4 max-w-5xl xl:mx-auto",
          className,
        )}
        {...props}
      >
        <h2 className="font-semibold text-base text-neutral-900 mb-4">
          {t("title")}
        </h2>
        <p className="text-neutral-700 mb-10">{t("description")}</p>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Button
            variant="muted"
            onClick={() => setIsChangePasswordDialogOpen(true)}
          >
            {t("changePassword")}
          </Button>
          {isTwoFactorEnabled ? (
            <Button onClick={() => setIsDisable2FADialogOpen(true)}>
              {t("disable2FA")}
            </Button>
          ) : (
            <Button onClick={() => setIsEnable2FADialogOpen(true)}>
              {t("enable2FA")}
            </Button>
          )}
        </div>
      </article>
      <ChangePasswordDialog
        open={isChangePasswordDialogOpen}
        onOpenChange={setIsChangePasswordDialogOpen}
        onPasswordChanged={signOut}
      />
      <Enable2FADialog
        open={isEnable2FADialogOpen}
        onOpenChange={setIsEnable2FADialogOpen}
      />
      <Disable2FADialog
        open={isDisable2FADialogOpen}
        onOpenChange={setIsDisable2FADialogOpen}
      />
    </>
  );
}
