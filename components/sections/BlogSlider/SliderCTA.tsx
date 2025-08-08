import { useTranslations } from "next-intl";
import Link from "next/link";

import { ArrowRight } from "@/components/icon";
import { Button } from "@/components/ui/button";

const SliderCTA = () => {
  const t = useTranslations("blogSlider");

  return (
    <section
      aria-labelledby="cta-heading"
      className="bg-primary py-[88px] rounded-bl-3xl rounded-br-3xl lg:rounded-bl-[56px] lg:rounded-br-[56px] lg:pt-[340px] lg:pb-[120px] lg:mt-[-182px] xl:mt-[-228px]"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-8 xl:grid-cols-12 xl:gap-8 max-w-[1136px] mx-auto">
          <div className="col-span-1 lg:col-span-3 xl:col-span-6 lg:py-10">
            <h2 id="cta-heading" className="heading-2 text-white">
              {t("ctaTitle")}
            </h2>
          </div>

          <div className="col-span-1 lg:col-span-4 xl:col-span-6 lg:py-10">
            <p className="font-medium md:text-lg text-white">
              {t("ctaDescription")}
            </p>

            <Button variant="ghost" className="mt-14 lg:mt-8" asChild>
              <Link href="/contact">
                {t("ctaButton")} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderCTA;
