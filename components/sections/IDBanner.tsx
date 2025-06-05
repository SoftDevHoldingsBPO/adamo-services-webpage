import { useTranslations } from "next-intl";
import Image from "next/image";

import { cn } from "@/lib/utils";

import ScrollAnimation from "../ScrollAnimation";
import { ArrowRight } from "../icon";
import { Button } from "../ui/button";
import IntroSection from "./IntroSection";

interface IDBannerProps extends React.HTMLAttributes<HTMLDivElement> {}

const IDBanner = ({ className }: IDBannerProps) => {
  const t = useTranslations("adamoId.banner");

  return (
    <div id="id-banner" className={cn(className)}>
      <IntroSection
        title={t("introTitle")}
        description={t("introDescription")}
      />
      <ScrollAnimation>
        <section
          data-scroll-animation="fade-up"
          aria-labelledby="id-banner-title"
          className={"max-w-[1264px] mx-auto md:px-4 mt-10 md:mt-24"}
        >
          <div className="p-6 pb-12 bg-adamo-id-600 md:p-8 md:rounded-4xl flex flex-col gap-y-10 gap-x-12 md:grid md:grid-cols-12 items-center">
            <div
              data-scroll-animation="fade-up"
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
                data-scroll-animation="fade-up"
                id="id-banner-title"
                className="heading-2 text-white "
              >
                {t("title")}
              </h2>

              <div data-scroll-animation="fade-up">
                <Button variant="ghost">
                  {t("button")} <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
};

export default IDBanner;
