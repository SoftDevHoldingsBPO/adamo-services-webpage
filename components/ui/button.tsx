import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import * as React from "react";

import { cn } from "@/lib/utils";

import { SpinnerIcon } from "@/components/icon";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl transition-all disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive font-medium",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active disabled:bg-primary-disabled disabled:text-primary-disabled-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover active:bg-secondary-active",
        link: "bg-transparent text-neutral-600 hover:text-neutral-700 active:text-neutral-800 !px-0",
        ghost:
          "bg-transparent text-white hover:text-neutral-100 active:text-neutral-200 !px-0",
        muted:
          "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 active:bg-neutral-300 disabled:bg-neutral-50 disabled:text-neutral-400",
      },
      size: {
        lg: "h-12 px-5 py-2 text-base",
        md: "h-10 px-4 py-2 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  "aria-label"?: string;
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  loading = false,
  children,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      aria-label={ariaLabel}
      aria-busy={loading}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <>
          {children}
          <SpinnerIcon className="animate-spin" />
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
