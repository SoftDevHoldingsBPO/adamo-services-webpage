"use client";

import { useBlog } from "@/providers/BlogProvider";
import { AnimatePresence, motion } from "motion/react";

import { useCallback, useEffect, useRef } from "react";

import { CancelFilledIcon } from "@/components/icon";

interface BlogSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const variants = {
  initial: {
    x: -16,
    opacity: 0,
    width: 42,
    left: "initial",
    right: "initial",
    transition: {
      x: { duration: 0.3, ease: "easeOut" },
      width: { duration: 0.3, ease: "easeOut" },
      left: { duration: 0.3, ease: "easeOut" },
      right: { duration: 0.3, ease: "easeOut" },
      opacity: { duration: 0.2, ease: "easeOut", delay: 0.1 },
    },
  },
  open: {
    x: 0,
    opacity: 1,
    width: "100%",
    left: 0,
    right: 0,
    transition: {
      x: { duration: 0.3, ease: "easeOut" },
      width: { duration: 0.3, ease: "easeOut" },
      left: { duration: 0.3, ease: "easeOut" },
      right: { duration: 0.3, ease: "easeOut" },
      opacity: { duration: 0.3, ease: "easeOut" },
    },
  },
};

const BlogSearch = ({ isOpen, onClose }: BlogSearchProps) => {
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

  useEffect(() => {
    return () => {
      setSearchQuery("");
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="initial"
          animate="open"
          exit="initial"
          variants={variants}
          className="absolute w-full z-20"
        >
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BlogSearch;
