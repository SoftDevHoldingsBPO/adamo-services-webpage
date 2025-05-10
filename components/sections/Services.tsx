"use client";

import { services } from "@/constants/services";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useTranslations } from "next-intl";

import ServiceCard from "../ui/service-card";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const t = useTranslations("services");

  useGSAP(() => {
    const items = document.querySelectorAll("[data-service-item]");
    if (!items.length) return;
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
            // markers: true, // Uncomment for debugging
          },
          delay: i * 0.1,
        },
      );
    });
  });

  return (
    <section
      id="services"
      className="pt-20 pb-6 md:pt-20 md:pb-10"
      aria-labelledby="services-title"
      role="region"
    >
      <div className="container">
        <div
          data-service-item
          className="grid grid-cols-1 gap-6 py-6 xl:grid-cols-2 xl:gap-8 xl:py-10"
        >
          <h2 id="services-title" className="heading-2">
            {t("servicesTitle")}
          </h2>
          <p className="text-lg font-medium">{t("servicesDescription")}</p>
        </div>

        <div className="mt-6 lg:mt-8 -mx-4 lg:mx-0" role="list">
          <div className="flex px-4 gap-6 flex-nowrap overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-pl-4 lg:grid lg:grid-cols-2 lg:gap-8">
            {services.map((service) => (
              <div
                data-service-item
                key={service.id}
                className="snap-start shrink-0 w-[278px] md:w-auto"
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
