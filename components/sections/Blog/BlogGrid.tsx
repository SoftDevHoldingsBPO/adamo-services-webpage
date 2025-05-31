"use client";

import { useBlog } from "@/providers/BlogProvider";

import { useMemo } from "react";

import BlogCard from "./BlogCard";
import BlogEmpty from "./BlogEmpty";
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
  const { selectedCategory } = useBlog();

  const filteredPosts = useMemo(() => {
    return selectedCategory && selectedCategory !== "all"
      ? posts.filter((post) => post.category === selectedCategory)
      : posts;
  }, [selectedCategory, posts]);

  const postsToRender = selectedCategory === "all" ? posts : filteredPosts;
  const showHero = selectedCategory === "all" && posts.length > 0;

  if (filteredPosts.length === 0) {
    return (
      <div className="container">
        <BlogEmpty category={selectedCategory} />
      </div>
    );
  }

  return (
    <div className="container">
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
