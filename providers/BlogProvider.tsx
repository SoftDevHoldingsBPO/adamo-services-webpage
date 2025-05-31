"use client";

import { createContext, useContext, useMemo, useState } from "react";

interface BlogContextType {
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "all",
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const contextValue = useMemo(
    () => ({
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
    }),
    [selectedCategory, searchQuery],
  );

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};

export function useBlog() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
}
