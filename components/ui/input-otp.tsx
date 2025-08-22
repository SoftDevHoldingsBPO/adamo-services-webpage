"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputOTPProps {
  containerClassName?: string;
  /** Optional error state to render error styling on slots */
  isError?: boolean;
}

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentProps<typeof OTPInput> & InputOTPProps
>(({ className, containerClassName, isError, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName,
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    data-slot="input-otp"
    {...props}
  />
));
InputOTP.displayName = "InputOTP";

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

function CustomInputOTPGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn(
        "flex items-center w-full justify-between gap-2 md:gap-6",
        className,
      )}
      {...props}
    />
  );
}

function InputOTPSlot({
  index,
  className,
  isError,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  isError?: boolean;
}) {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm shadow-xs transition-all outline outline-transparent first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        isError && "outline-destructive focus-visible:outline-destructive focus-visible:ring-destructive/20",
        className,
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

function CustomInputOTPSlot({
  className,
  isError,
  ...props
}: React.ComponentProps<typeof InputOTPSlot>) {
  return (
    <InputOTPSlot
      {...props}
      isError={isError}
      className={cn(
        "w-full shadow-none border border-neutral-200 rounded-lg h-auto aspect-square md:aspect-[16/11]",
        className,
      )}
    />
  );
}

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentProps<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <MinusIcon />
  </div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
  CustomInputOTPSlot,
  CustomInputOTPGroup,
};
