"use client";

import { BlogPostsResponse, getBlogPosts } from "@/services/blog";
import { useQuery } from "@tanstack/react-query";

import { useEffect } from "react";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";

import { inViewAnimation } from "@/lib/animations";

import BlogAuthor from "@/components/sections/Blog/BlogAuthor";

export default function Page() {
  const { id } = useParams();

  const { data } = useQuery<BlogPostsResponse>({
    queryKey: ["blogPosts"],
    queryFn: getBlogPosts,
  });

  const locale = useLocale();

  const tCategory = useTranslations("blogCategories");

  const post = data?.blogPosts.find((post) => post.id === id);

  const author = post?.author;
  const content = post?.locales[locale].content;

  useEffect(() => {
    if (post) {
      const disconnect = inViewAnimation();
      return disconnect;
    }
  }, [post]);
  if (!post) return null;

  return (
    <div
      data-inview
      data-inview-delay={0.15}
      className="container py-4 md:py-14 lg:py-28 space-y-16"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-2">
          <span className="text-xs font-semibold">{post.date}</span>
        </div>
        <div className="lg:col-span-8">
          <h2 className="heading-2">{post.locales[locale].title}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-2">
          <span className="text-xs font-semibold text-neutral-400">
            {tCategory(post.category)}
          </span>
        </div>
        <div className="lg:col-span-8">
          <BlogAuthor author={author} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8 mb-8">
        <div className="lg:col-span-2">&nbsp;</div>
        <div className="lg:col-span-8">
          <p className="text-lg font-medium">{post.locales[locale].excerpt}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-2">&nbsp;</div>
        <div className="lg:col-span-8">
          <Image
            src={post.coverImage}
            alt=""
            width={1000}
            height={1000}
            className="rounded-3xl"
          />

          <div className="mt-6 space-y-10">
            {content?.map((block, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: block }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
