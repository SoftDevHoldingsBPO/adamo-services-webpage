"use client";

import { useAnimation } from "@/providers/AnimationProvider";
import { BlogPostsResponse, getBlogPosts } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";

import { initInViewAnimation } from "@/lib/animations";

import BlogFilter from "@/components/sections/Blog/BlogFilter";
import BlogGrid from "@/components/sections/Blog/BlogGrid";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const { isPreloaderDone } = useAnimation();
  const { data, isLoading } = useQuery<BlogPostsResponse>({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  useEffect(() => {
    if (!isLoading && isPreloaderDone) {
      initInViewAnimation();
    }
  }, [isLoading, isPreloaderDone]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 xl:gap-y-12 container py-20">
        <Skeleton className="h-[320px] rounded-2xl" />
        <Skeleton className="h-[320px] rounded-2xl" />
        <Skeleton className="h-[320px] rounded-2xl" />
        <Skeleton className="h-[320px] rounded-2xl" />
        <Skeleton className="h-[320px] rounded-2xl" />
        <Skeleton className="h-[320px] rounded-2xl" />
      </div>
    );
  }

  return (
    <div>
      <BlogFilter />
      <BlogGrid posts={data?.blogPosts ?? []} />
    </div>
  );
}
