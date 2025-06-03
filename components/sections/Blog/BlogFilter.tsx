"use client";

import { categories } from "@/constants/navigation";
import { useBlog } from "@/providers/BlogProvider";

import { useRef, useState } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { SearchIcon } from "@/components/icon";

import BlogSearch from "./BlogSearch";

const BlogFilter = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { selectedCategory, setSelectedCategory } = useBlog();

  const tCategories = useTranslations("blogCategories");

  return (
    <div className="container pt-3 pb-6 hidden md:block relative">
      <div className="flex justify-center items-center gap-x-12 py-6 relative">
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

        <div className="flex items-center">
          <BlogSearch
            isOpen={showSearch}
            onClose={() => setShowSearch(false)}
          />

          <button
            type="button"
            className="text-neutral-500 hover:text-neutral-600 active:text-neutral-700"
            onClick={() => setShowSearch(!showSearch)}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;
