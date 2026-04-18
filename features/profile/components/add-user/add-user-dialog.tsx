"use client";

import { useMediaQuery } from "usehooks-ts";

import { ComponentProps } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import {
  AddUserForm,
  AddUserFormValues,
  AddUserInitialData,
} from "./add-user-form";

export type AddUserDialogProps = ComponentProps<typeof Dialog> &
  Readonly<{
    initialData?: AddUserInitialData;
    onUserAdded?: (values: AddUserFormValues) => Promise<void>;
  }>;

export function AddUserDialog({
  open,
  onOpenChange,
  initialData,
  onUserAdded,
  ...props
}: AddUserDialogProps) {
  const isAtLeastTablet = useMediaQuery("(min-width: 768px)");

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        showCloseButton={isAtLeastTablet}
        isFullscreen={!isAtLeastTablet}
        className="overflow-hidden md:max-h-[calc(100dvh-4rem)]"
      >
        <AddUserForm
          initialData={initialData}
          onUserAdded={onUserAdded}
          onCancel={() => onOpenChange?.(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
