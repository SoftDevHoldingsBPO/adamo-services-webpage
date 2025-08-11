"use client";

import { services } from "@/constants/services";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useTranslations } from "next-intl";

import ServiceCard from "../ui/service-card";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const t = useTranslations("services");

  return (
    <section
      id="services"
      className="pt-20 pb-6 md:pt-20 md:pb-10"
      aria-labelledby="services-title"
      role="region"
    >
      <div className="container">
        <div className="grid grid-cols-1 gap-6 py-6 xl:grid-cols-2 xl:gap-8 xl:py-10">
          <h2 data-inview id="services-title" className="heading-2">
            {t("servicesTitle")}
          </h2>
          <p
            data-inview
            data-inview-delay={0.2}
            className="text-lg font-medium"
          >
            {t("servicesDescription")}
          </p>
        </div>

        <div className="mt-6 lg:mt-8 -mx-4 lg:mx-0" role="list">
          <div className="flex px-4 gap-8 flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-pl-4 lg:grid lg:grid-cols-2 lg:px-0 overflow-y-hidden">
            {services.map((service, index) => (
              <div
                data-inview
                data-inview-delay={index % 2 === 1 ? 0.2 : 0}
                key={service.id}
                className="snap-start shrink-0 w-[278px] lg:w-auto"
              >
                <ServiceCard variant={service.id} service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
