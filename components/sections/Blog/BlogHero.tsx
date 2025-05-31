"use client";

// Import Swiper styles
import { BlogPost } from "@/services/blog";
import "swiper/css";
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { useState } from "react";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/lib/utils";

import BlogAuthor from "./BlogAuthor";

const BlogHeroPagination = ({
  activeIndex,
  length,
}: {
  activeIndex: number;
  length: number;
}) => {
  const swiper = useSwiper();

  return (
    <div className="flex items-center gap-4">
      {Array.from({ length }).map((_, index) => (
        <button
          key={index}
          onClick={() => swiper.slideTo(index)}
          className={cn(
            "rounded-full",
            activeIndex === index
              ? "bg-white w-3 h-3"
              : "bg-neutral-400 w-1.5 h-1.5",
          )}
        />
      ))}
    </div>
  );
};

const BlogHero = ({ posts }: { posts: BlogPost[] }) => {
  const locale = useLocale();
  const tCategory = useTranslations("blogCategories");

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="rounded-4xl p-6 relative overflow-hidden md:p-8 lg:p-14 mb-6 md:mb-12">
      <Image
        src="/images/blog/blog-hero.png"
        alt="Blog Hero"
        fill
        className="object-cover"
        priority
      />

      <div className="relative">
        <Swiper
          spaceBetween={32}
          slidesPerView={1}
          onSlideChange={(e) => setActiveIndex(e.activeIndex)}
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-14">
                <div className="relative h-[250px] rounded-3xl overflow-hidden md:h-full">
                  <Image
                    src={post.coverImage}
                    alt={post.locales[locale].title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <p className="text-lg font-medium text-white opacity-30">
                    {tCategory(post.category)}
                  </p>

                  <h3 className="text-white text-[32px] tracking-[-0.035em] font-semibold font-display leading-[40px] mt-6 min-h-[160px]">
                    {post.locales[locale].title}
                  </h3>

                  <BlogAuthor
                    author={post.author}
                    variant="light"
                    className="mt-10"
                  />

                  <div className="mt-8 md:mt-16">
                    <BlogHeroPagination
                      activeIndex={activeIndex}
                      length={posts.length}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BlogHero;
