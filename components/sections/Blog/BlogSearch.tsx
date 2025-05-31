"use client";

import { useBlog } from "@/providers/BlogProvider";

import { useCallback, useEffect, useRef } from "react";

import { CancelFilledIcon } from "@/components/icon";

interface BlogSearchProps {
  onClose: () => void;
}

const BlogSearch = ({ onClose }: BlogSearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery } = useBlog();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchQuery("");
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    inputRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      role="search"
      aria-label="Blog search"
      className="bg-neutral-100 relative w-full rounded-2xl py-6 px-4 flex"
    >
      <input
        ref={inputRef}
        autoComplete="off"
        type="text"
        placeholder="Search"
        className="outline-none w-full"
        aria-label="Search blog posts"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        aria-label="Close search"
        type="button"
        onClick={() => {
          setSearchQuery("");
          onClose();
        }}
      >
        <CancelFilledIcon className="text-neutral-500 hover:text-neutral-600 active:text-neutral-700 transition-colors" />
      </button>
    </div>
  );
};

export default BlogSearch;
