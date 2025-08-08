import { useTranslations } from "next-intl";
import Image from "next/image";

const BlogEmptyCategory = ({ category }: { category: string | null }) => {
  const t = useTranslations("emptyCategory");

  return (
    <div className="rounded-4xl overflow-hidden relative py-[135px] px-4 md:pt-48 md:pb-[106px] bg-primary">
      <Image
        src="/images/blog/empty-hero.png"
        alt="Blog Empty"
        fill
        className="object-cover blur-[75px] bg-blend-color-dodge"
        priority
      />

      <div className="relative flex flex-col items-center gap-12 text-white text-center">
        <h2 className="heading-2">{t("noMatches")}</h2>
        <p className="text-lg">
          {t("noMatchesDescription", { category: category || "" })}
          <br />
          {t("tryAnotherCategory")}
        </p>
      </div>
    </div>
  );
};

export default BlogEmptyCategory;
