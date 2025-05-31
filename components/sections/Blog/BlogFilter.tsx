"use client";

import { categories } from "@/constants/navigation";
import { useBlog } from "@/providers/BlogProvider";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { SearchIcon } from "@/components/icon";

const BlogFilter = () => {
  const { selectedCategory, setSelectedCategory } = useBlog();

  const tCategories = useTranslations("blogCategories");

  return (
    <div className="container pt-9 pb-12 hidden md:block">
      <div className="flex justify-center gap-x-12">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            className={cn(
              "text-[17px] leading-[20px] font-semibold hover:text-neutral-600 active:text-neutral-700 transition-colors",
              selectedCategory === category
                ? "text-primary"
                : "text-neutral-500",
              selectedCategory !== null &&
                category !== selectedCategory &&
                "text-neutral-300",
            )}
            onClick={() => {
              setSelectedCategory(category);
            }}
          >
            {tCategories(category)}
          </button>
        ))}

        <button
          type="button"
          className="text-neutral-500 hover:text-neutral-600 active:text-neutral-700"
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
};

export default BlogFilter;
