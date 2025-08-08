import { useTranslations } from "next-intl";
import Link from "next/link";

import { ArrowRight } from "@/components/icon";
import AboutHero from "@/components/sections/AboutHero";
import { Button } from "@/components/ui/button";

export default function Page() {
  const t = useTranslations("about");
  return (
    <>
      <AboutHero />

      <div
        data-inview
        data-inview-delay={0.3}
        className="container pt-12 pb-14 md:py-24"
      >
        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
          <h2 className="heading-2 lg:py-10">{t("section1.title")}</h2>

          <div>
            <p className="py-6 lg:py-10 text-lg font-medium">
              {t("section1.subtitle")}
            </p>

            <p className="mt-10 lg:mt-0 text-neutral-500">
              {t("section1.description")}
            </p>

            <Button asChild variant="link" className="mt-14">
              <Link href="/contact">
                {t("section1.button")} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
