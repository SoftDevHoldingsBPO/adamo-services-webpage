import { CheckIcon } from "@/components/icon";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface PlanFeatureListProps {
  features: string[];
  limitations?: string[];
  className?: string;
}

export function PlanFeatureList({
  features,
  limitations,
  className,
}: PlanFeatureListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {features.map((feature, index) => (
        <li key={`feature-${index}`} className="flex items-start gap-3">
          <CheckIcon className="mt-0.5 size-5 shrink-0 text-success-600" />
          <span className="text-sm text-neutral-700">{feature}</span>
        </li>
      ))}
      {limitations &&
        limitations.length > 0 &&
        limitations.map((limitation, index) => (
          <li key={`limitation-${index}`} className="flex items-start gap-3">
            <X className="mt-0.5 size-5 shrink-0 text-neutral-400" />
            <span className="text-sm text-neutral-500">{limitation}</span>
          </li>
        ))}
    </ul>
  );
}
