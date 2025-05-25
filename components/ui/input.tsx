import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  /** Optional icon to render on the left side of the input */
  leftIcon?: React.ReactNode;
  /** Optional icon to render on the right side of the input */
  rightIcon?: React.ReactNode;
  /** Optional error message to render below the input */
  errorMessage?: string;
  /** Optional error state to render below the input */
  isError?: boolean;
}

function Input({
  className,
  leftIcon,
  rightIcon,
  type,
  isError,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex items-center w-full">
        {/* Render left icon if provided */}
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          data-slot="input"
          className={cn(
            "placeholder:text-neutral-400 selection:bg-primary selection:text-primary-foreground outline outline-neutral-200 flex w-full min-w-0 rounded-lg bg-transparent px-3 py-1 text-base transition-[color,box-shadow]  disabled:pointer-events-none disabled:cursor-not-allowed",
            "focus-visible:outline-neutral-600 focus-visible:ring-neutral-200 focus-visible:ring-[5px] py-3",
            leftIcon && "pl-11",
            rightIcon && "pr-11",
            isError &&
              "outline-destructive focus-visible:outline-destructive focus-visible:ring-destructive/20",
            className,
          )}
          {...props}
        />

        {/* Render right icon if provided */}
        {rightIcon && (
          <div className="pointer-events-none absolute right-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>
      {isError && errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}

export { Input };
