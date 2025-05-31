"use client";

import { useBlog } from "@/providers/BlogProvider";

import { useMemo } from "react";

import { useLocale } from "next-intl";

import BlogCard from "./BlogCard";
import BlogEmpty from "./BlogEmptyCategory";
import BlogEmptySearch from "./BlogEmptySearch";
import BlogHero from "./BlogHero";

export type BlogPost = {
  id: string;
  category: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
  date: string;
  coverImage: string;
  locales: {
    [locale: string]: {
      title: string;
      excerpt: string;
      content: string[];
    };
  };
};

const BlogGrid = ({ posts }: { posts: BlogPost[] }) => {
  const { searchQuery, selectedCategory } = useBlog();
  const locale = useLocale();

  const filteredPosts = useMemo(() => {
    // If there's a search query, search through all posts
    if (searchQuery) {
      return posts.filter((post) =>
        post.locales[locale].title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()),
      );
    }

    // If no search query, filter by category
    return selectedCategory && selectedCategory !== "all"
      ? posts.filter((post) => post.category === selectedCategory)
      : posts;
  }, [selectedCategory, posts, searchQuery, locale]);

  const postsToRender = filteredPosts;
  const showHero =
    selectedCategory === "all" && !searchQuery && posts.length > 0;

  if (filteredPosts.length === 0 && searchQuery) {
    return (
      <div className="container">
        <BlogEmptySearch query={searchQuery} />
      </div>
    );
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="container">
        <BlogEmpty category={selectedCategory} />
      </div>
    );
  }

  return (
    <div className="container pb-24">
      {showHero && <BlogHero posts={posts.slice(0, 4)} />}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:gap-y-12">
        {postsToRender.map((post) => (
          <BlogCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;
