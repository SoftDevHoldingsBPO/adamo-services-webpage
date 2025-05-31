"use client";

import { BlogPostsResponse, getBlogPosts } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import BlogFilter from "@/components/sections/Blog/BlogFilter";
import BlogGrid from "@/components/sections/Blog/BlogGrid";

export default function Page() {
  const { data, isLoading } = useQuery<BlogPostsResponse>({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div data-cursor-text="">
      <BlogFilter />
      <BlogGrid posts={data?.blogPosts ?? []} />
    </div>
  );
}
