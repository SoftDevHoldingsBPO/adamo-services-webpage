"use client";

import { categories } from "@/constants/navigation";
import { useBlog } from "@/providers/BlogProvider";
import { AnimatePresence, motion } from "motion/react";

import { useState } from "react";

import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import { SearchIcon } from "@/components/icon";

import BlogSearch from "./BlogSearch";

const BlogFilter = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { selectedCategory, setSelectedCategory } = useBlog();

  const tCategories = useTranslations("blogCategories");

  return (
    <div className="container pt-3 pb-6 hidden md:block">
      <AnimatePresence mode="popLayout">
        {showSearch ? (
          <motion.div
            key="search"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
          >
            <BlogSearch onClose={() => setShowSearch(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="buttons"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center gap-x-12 py-6"
          >
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
              onClick={() => setShowSearch(!showSearch)}
            >
              <SearchIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogFilter;
