import { ComponentProps } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "@/components/icon";
import IntroSection from "@/components/sections/IntroSection";
import { Button } from "@/components/ui/button";

export function ToolsBanner({ className }: ComponentProps<"div">) {
  const t = useTranslations("adamoSign.banner");

  return (
    <div id="tools-banner" className={cn(className)}>
      <IntroSection
        title={t("introTitle")}
        description={t("introDescription")}
      />

      <section
        data-inview
        aria-labelledby="id-banner-title"
        className={"max-w-[1264px] mx-auto md:px-4 mt-10 md:mt-24"}
      >
        <div className="p-6 pb-12 bg-adamo-sign-600 md:p-8 md:rounded-4xl flex flex-col gap-y-10 gap-x-12 md:grid md:grid-cols-12 items-center">
          <div
            data-inview
            className="relative w-full h-[280px] md:col-span-6 lg:col-span-5"
          >
            <Image
              fill
              src="/images/adamo-id/id-banner-mobile.png"
              alt="ID Banner"
              className="object-cover rounded-3xl object-left-top block md:hidden"
              quality={100}
            />

            <Image
              fill
              src="/images/adamo-id/id-banner-desktop.png"
              alt="ID Banner"
              className="object-cover rounded-3xl object-left-top hidden md:block"
              quality={100}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>

          <div className="md:col-span-6 lg:col-span-7 space-y-12">
            <h2
              data-inview
              id="id-banner-title"
              className="heading-2 text-white "
            >
              {t("title")}
            </h2>

            <div data-inview data-inview-delay={0.2}>
              <Button asChild variant="ghost">
                <Link href="/contact">
                  {t("button")} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
