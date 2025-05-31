"use client";

import { BlogPost, BlogPostsResponse, getBlogPosts } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import BlogFilter from "@/components/sections/Blog/BlogFilter";
import BlogGrid from "@/components/sections/Blog/BlogGrid";

export default function Page() {
  const { data } = useQuery<BlogPostsResponse>({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  return (
    <>
      <BlogFilter />
      <BlogGrid posts={data?.blogPosts ?? []} />
    </>
  );
}
