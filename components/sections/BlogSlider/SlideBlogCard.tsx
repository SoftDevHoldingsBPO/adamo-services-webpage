import { BlogPost } from "@/services/blog";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "@/components/icon";
import { Button } from "@/components/ui/button";

import SlideTag from "./SlideTag";

interface SlideBlogCardProps {
  post: BlogPost;
  className?: string;
}

const SlideBlogCard = ({ post, className }: SlideBlogCardProps) => {
  const locale = useLocale();
  const t = useTranslations("blogSlider");

  return (
    <article
      className={cn(
        "p-4 rounded-2xl bg-white max-w-[309px] overflow-hidden",
        className,
      )}
    >
      <img
        src={post.coverImage}
        alt=""
        width={277}
        height={215}
        loading="lazy"
        className="w-[277px] h-[215px] object-cover rounded-2xl"
      />

      <SlideTag className="mt-6">Blog</SlideTag>

      <div className="mt-6">
        <h4 className="heading-2 line-clamp-2">{post.locales[locale].title}</h4>
        <p className="mt-4 text-sm line-clamp-3">
          {post.locales[locale].excerpt}
        </p>
      </div>

      <div className="flex gap-x-8 mt-14">
        <Button asChild>
          <Link href={`/blog/${post.id}`}>{t("readPost")}</Link>
        </Button>

        <Button asChild variant="link">
          <Link href={`/blog`}>
            {t("goToBlog")} <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default SlideBlogCard;
