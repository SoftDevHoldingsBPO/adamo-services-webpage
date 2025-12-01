"use client";

import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export type ProfileHeaderProps = ComponentProps<"header">;

export function ProfileHeader({ className, ...props }: ProfileHeaderProps) {
  return (
    <header
      data-inview
      className={cn(
        "hidden xl:flex relative h-72 bg-primary w-full max-w-7xl mx-auto rounded-4xl mt-[92px]",
        className,
      )}
      {...props}
    ></header>
  );
}
