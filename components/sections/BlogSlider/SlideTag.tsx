import { cn } from "@/lib/utils";

interface SlideTagProps {
  children: React.ReactNode;
  className?: string;
}

const SlideTag = ({ children, className }: SlideTagProps) => {
  return (
    <div
      className={cn(
        "text-neutral-500 bg-neutral-50 inline-block py-3 px-6 rounded-full",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default SlideTag;
