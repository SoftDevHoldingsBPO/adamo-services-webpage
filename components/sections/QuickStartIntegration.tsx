import { useTranslations } from "next-intl";
import Image from "next/image";

import { ArrowRight } from "../icon";
import { Button } from "../ui/button";

const QuickStartIntegration = () => {
  const t = useTranslations("quickStart");
  const title = t("title");
  const description = t("description");
  const button = t("button");

  return (
    <section className="container pt-8 md:py-10 ">
      <div className="relative -mx-4 md:-mx-0 md:rounded-3xl overflow-hidden">
        <Image
          src="/images/quick-start-bg.png"
          alt="Quick Start Integration"
          fill
        />
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 lg:gap-8 text-white relative z-10 p-10 md:p-8 lg:items-start lg:px-12 lg:grid-cols-[504px_1fr]">
          <h2 className="heading-2 md:py-10">{title}</h2>

          <div className="space-y-14 md:space-y-8 md:py-10">
            <p className="md:text-lg">{description}</p>

            <Button variant="secondary">
              {button}
              <ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickStartIntegration;
