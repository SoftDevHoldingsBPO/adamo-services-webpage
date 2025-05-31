"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

import { BlogPost } from "./BlogGrid";

const BlogCard = ({
  category,
  author,
  date,
  coverImage,
  locales,
}: BlogPost) => {
  const tCategory = useTranslations("blogCategories");
  const locale = useLocale();

  return (
    <article className="bg-neutral-100 rounded-2xl overflow-hidden flex flex-col">
      <div className="relative h-36 w-full">
        <Image
          src={coverImage}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="px-4 pt-6 pb-8 flex flex-col flex-1">
        <span className="text-neutral-400">{tCategory(category)}</span>
        <h2 className="mt-3 font-display font-semibold text-primary text-xl !leading-tight flex-1">
          {locales[locale].title}
        </h2>

        {/* Author */}
        <div className="mt-6 flex items-center gap-3 ">
          <Image
            width={40}
            height={40}
            src={author.image}
            alt=""
            className="rounded-full shrink-0"
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-primary !leading-[20px]">
              {author.name}
            </span>
            <span className="text-xs text-neutral-400 !leading-[20px]">
              {author.role}
            </span>
          </div>
        </div>

        {/* Date */}
        <p className="mt-6 text-xs text-neutral-400 !leading-[20px]">{date}</p>
      </div>
    </article>
  );
};
export default BlogCard;
