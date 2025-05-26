import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      rows={3}
      className={cn(
        "placeholder:text-neutral-400 selection:bg-primary selection:text-primary-foreground outline outline-neutral-200 flex w-full min-w-0 rounded-lg bg-transparent px-3 py-1 text-base transition-[color,box-shadow]  disabled:pointer-events-none disabled:cursor-not-allowed",
        "focus-visible:outline-neutral-600 focus-visible:ring-neutral-200 focus-visible:ring-[5px] py-3 resize-none",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
