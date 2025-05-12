import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "../icon";
import { Button } from "../ui/button";

const FeatureCard = () => {
  const t = useTranslations("featureCard");

  return (
    <section className="py-6 md:py-10 ">
      <div className="container">
        <div className="py-8 px-6 -mx-4 md:mx-0 md:rounded-4xl md:p-8 md:pr-12 bg-primary grid grid-cols-1 md:grid-cols-[312px_1fr] lg:grid-cols-2 gap-6 lg:gap-12 lg:items-center">
          <div>
            <Image
              src="/images/feature-card.png"
              alt="Feature Card"
              width={600}
              height={280}
              className="max-h-[280px] w-full h-full object-cover rounded-3xl"
            />
          </div>
          <div className="space-y-8">
            <h2 className="heading-2 text-white leading-relaxed tracking-normal md:leading-[1.25] md:tracking-[-1.6px]">
              {t("title")}
            </h2>

            <Button asChild variant="ghost">
              <Link href="/contact">
                {t("button")} <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureCard;
