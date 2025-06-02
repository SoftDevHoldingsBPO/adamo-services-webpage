import React from "react";

import Image from "next/image";

import { cn } from "@/lib/utils";

interface BlogAuthorProps {
  author?: {
    name: string;
    image: string;
    role: string;
  };
  variant?: "light" | "dark";
  className?: string;
}

const BlogAuthor = ({
  author,
  className,
  variant = "dark",
}: BlogAuthorProps) => {
  if (!author) return null;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Image
        width={40}
        height={40}
        src={author.image}
        alt=""
        className="rounded-full shrink-0"
      />
      <div className="flex flex-col">
        <span
          className={cn(
            "text-xs font-bold !leading-[20px]",
            variant === "dark" && "text-primary",
            variant === "light" && "text-white",
          )}
        >
          {author.name}
        </span>
        <span className="text-xs text-neutral-400 !leading-[20px]">
          {author.role}
        </span>
      </div>
    </div>
  );
};

export default BlogAuthor;
