import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "@/components/icon";
import { Button } from "@/components/ui/button";

export function CTA({ className }: { className?: string }) {
  const t = useTranslations("adamoSign.cta");
  const locale = useLocale();

  return (
    <div className={cn("relative", className)}>
      <section className="px-4 max-w-[1056px] mx-auto text-center relative z-10">
        <h2
          data-inview
          className="font-display text-[17px] leading-[21px] font-semibold"
        >
          {t("title")}
        </h2>
        <p data-inview className="mt-10">
          {t("description")}
        </p>

        <Image
          data-inview
          className="drop-shadow-parallax mx-auto mt-10 md:mt-14"
          src={
            locale === "es"
              ? "/images/adamo-sign/traceability.png"
              : "/images/adamo-sign/traceability-en.png"
          }
          alt=""
          width={755}
          height={345}
          priority
          quality={100}
        />
      </section>

      {/* bg overlay */}
      <div
        className="bg-adamo-sign-700 h-[60%] md:h-[65%] absolute bottom-0 inset-x-0 md:rounded-bl-[48px] md:rounded-br-[48px]"
        aria-hidden
      ></div>

      <div className="mt-24 lg:mt-[140px]  pb-8">
        <div className="max-w-[1232px] mx-auto px-4">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <h3 data-inview className="heading-2 text-white lg:py-10">
              {t("footerTitle")}
            </h3>
            <div data-inview data-inview-delay={0.2} className="py-6 lg:py-10">
              <p className="text-white md:text-lg">{t("footerDescription")}</p>
              <Button asChild variant="secondary" className="mt-14 md:mt-8">
                <Link href="/contact">
                  {t("footerButton")} <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
