"use client";

import { BlogPostsResponse } from "@/services/blog";
import { getBlogPosts } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import SliderCTA from "./SliderCTA";
import SliderDesktop from "./SliderDesktop";
import SliderMobile from "./SliderMobile";

const BlogSlider = () => {
  const { data, isLoading } = useQuery<BlogPostsResponse>({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const latestThree = data?.blogPosts.slice(0, 3);

  return (
    <section className="pb-10 md:py-10">
      <div className="hidden lg:block">
        <SliderDesktop posts={latestThree ?? []} />
      </div>

      <div className="block lg:hidden">
        <SliderMobile posts={latestThree ?? []} />
      </div>
      <SliderCTA />
    </section>
  );
};

export default BlogSlider;
