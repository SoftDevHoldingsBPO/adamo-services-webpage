import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type FullPageLoaderProps = ComponentProps<"div"> & {
  message?: string;
};

export function FullPageLoader({
  message,
  className,
  ...props
}: FullPageLoaderProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-white",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-neutral-200 border-t-primary"></div>
        </div>
        {message && <p className="text-lg text-neutral-600">{message}</p>}
      </div>
    </div>
  );
}
