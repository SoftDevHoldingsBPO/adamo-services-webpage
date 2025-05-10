import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "@/components/icon";
import { Button } from "@/components/ui/button";

import { Post } from ".";
import SlideTag from "./SlideTag";

interface SlideBlogCardProps extends Post {
  className?: string;
}

const SlideBlogCard = ({
  id,
  img,
  title,
  desc,
  className,
}: SlideBlogCardProps) => {
  const t = useTranslations("blogSlider");

  return (
    <article
      className={cn("p-4 rounded-2xl bg-white max-w-[309px]", className)}
    >
      <Image src={img} alt={title} width={277} height={215} loading="lazy" />

      <SlideTag className="mt-6">Blog</SlideTag>

      <div className="mt-6">
        <h4 className="heading-2 line-clamp-2">{title}</h4>
        <p className="mt-4 text-sm line-clamp-3">{desc}</p>
      </div>

      <div className="flex gap-x-8 mt-14">
        <Button asChild>
          <Link href={`/posts/${id}`}>{t("readPost")}</Link>
        </Button>

        <Button asChild variant="link">
          <Link href={`/posts`}>
            {t("goToBlog")} <ArrowRight />
          </Link>
        </Button>
      </div>
    </article>
  );
};

export default SlideBlogCard;
