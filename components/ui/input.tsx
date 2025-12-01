import * as React from "react";

import { cn } from "@/lib/utils";

import { HideIcon, SeeIcon } from "@/components/icon";

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
  disabled, // Destructure the disabled prop
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPasswordType = type === "password";
  const inputType = isPasswordType && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Determine if we should show the password toggle icon
  const shouldShowPasswordToggle = isPasswordType && !rightIcon;
  const effectiveRightIcon = shouldShowPasswordToggle ? (
    <button
      type="button"
      onClick={togglePasswordVisibility}
      className={cn(
        "pointer-events-auto cursor-pointer text-neutral-400 hover:text-neutral-600 transition-colors",
        // Disable styles for the password toggle button
        disabled &&
          "text-neutral-300 hover:text-neutral-300 cursor-not-allowed",
      )}
      tabIndex={-1}
      // Disable the button when the input is disabled
      disabled={disabled}
    >
      {showPassword ? <HideIcon /> : <SeeIcon />}
    </button>
  ) : (
    rightIcon
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="relative flex items-center w-full">
        {/* Render left icon if provided */}
        {leftIcon && (
          <div
            className={cn(
              "pointer-events-none absolute left-3 flex items-center",
              // Apply disabled styles to the icon container
              disabled && "text-neutral-400",
            )}
          >
            {leftIcon}
          </div>
        )}
        <input
          type={inputType}
          data-slot="input"
          className={cn(
            "placeholder:text-neutral-400 selection:bg-primary selection:text-primary-foreground outline outline-neutral-200 flex w-full min-w-0 rounded-lg bg-transparent px-3 py-1 text-base transition-[color,box-shadow] py-3",
            // Added explicit disabled styles here
            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:outline-neutral-200 disabled:text-neutral-500",
            "focus-visible:outline-neutral-600 focus-visible:ring-neutral-200 focus-visible:ring-[5px]",
            leftIcon && "pl-11",
            (effectiveRightIcon || shouldShowPasswordToggle) && "pr-11",
            isError &&
              "outline-destructive focus-visible:outline-destructive focus-visible:ring-destructive/20",
            className,
          )}
          // Pass the disabled prop down to the native input element
          disabled={disabled}
          {...props}
        />

        {/* Render right icon or password toggle */}
        {effectiveRightIcon && (
          <div
            className={cn(
              "absolute right-3 flex items-center",
              shouldShowPasswordToggle
                ? "pointer-events-auto"
                : "pointer-events-none",
              // Apply disabled styles to the icon container if it's not the password toggle button
              !shouldShowPasswordToggle && disabled && "text-neutral-400",
            )}
          >
            {effectiveRightIcon}
          </div>
        )}
      </div>
      {isError && errorMessage && (
        <p className="text-destructive text-sm">{errorMessage}</p>
      )}
    </div>
  );
}

export { Input };
