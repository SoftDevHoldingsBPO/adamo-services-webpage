"use client";

import { Loader2 } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

import { ComponentProps, useState } from "react";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type RemoveUserDialogProps = ComponentProps<typeof Dialog> &
  Readonly<{
    userName?: string;
    onConfirm?: () => Promise<void>;
  }>;

export function RemoveUserDialog({
  open,
  onOpenChange,
  userName,
  onConfirm,
  ...props
}: RemoveUserDialogProps) {
  const t = useTranslations("remove-user-dialog");
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");
  const [isPending, setIsPending] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
      >
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("description", { name: userName ?? "" })}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="muted" disabled={isPending}>
              {t("cancel")}
            </Button>
          </DialogClose>
          <Button
            variant="destructive-medium"
            disabled={isPending}
            onClick={async () => {
              setIsPending(true);
              try {
                await onConfirm?.();
              } finally {
                setIsPending(false);
              }
            }}
          >
            {isPending && <Loader2 className="size-4 animate-spin" />}
            {t("remove")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
