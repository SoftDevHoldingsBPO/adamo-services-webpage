"use client";

import { services } from "@/constants/services";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { cn } from "@/lib/utils";

import ServiceCard from "@/components/ui/service-card";

import { ArrowRight, ArrowRightCircle } from "../icon";
import { Button } from "../ui/button";

gsap.registerPlugin(ScrollTrigger);

const TRANSITION_CLASSES = {
  hover: "group-hover:translate-x-8 transition-all duration-400 ease-in-out",
  hoverOpacity: "group-hover:md:opacity-0",
  soon: "text-neutral-400",
};

const ServiceItem = ({
  service,
  t,
}: {
  service: (typeof services)[0];
  t: any;
}) => {
  return (
    <div
      className="grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-2 py-10 md:py-16 border-b group hover:bg-neutral-50 transition-colors relative"
      role="article"
      aria-label={t(`${service.id}.title`)}
    >
      <div className="relative flex items-center">
        <div className="flex items-center gap-6 md:gap-8">
          <ArrowRightCircle
            className={cn(
              TRANSITION_CLASSES.hover,
              !service.soon && TRANSITION_CLASSES.hoverOpacity,
              service.soon && TRANSITION_CLASSES.soon,
            )}
            aria-hidden="true"
          />
          <h3
            className={cn(
              "text-sm font-display font-semibold md:text-[17px] md:leading-[1.25]",
              TRANSITION_CLASSES.hover,
              !service.soon && TRANSITION_CLASSES.hoverOpacity,
              service.soon && TRANSITION_CLASSES.soon,
            )}
          >
            {t(`${service.id}.title`)}
          </h3>

          {!service.soon && (
            <div
              className="absolute -bottom-16 right-0 max-w-[380px] w-full opacity-0 group-hover:-translate-y-16 transition-all group-hover:opacity-100 duration-400 ease-in-out hidden md:block"
              aria-hidden="true"
            >
              <ServiceCard
                {...service}
                className="shadow-[-48px_32px_56px_0px_rgba(77,87,97,0.08)]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="overflow-hidden">
        <p
          className={cn(
            "text-sm md:text-base",
            TRANSITION_CLASSES.hover,
            !service.soon && "group-hover:text-neutral-500",
            service.soon && TRANSITION_CLASSES.soon,
          )}
        >
          {t(`${service.id}.description`)}
        </p>

        <div className="mt-8 hidden md:block">
          {!service.soon ? (
            <Button
              variant="link"
              className="-rotate-45 group-hover:translate-x-8 group-hover:rotate-0 transition-all duration-400 ease-in-out"
              aria-label={t("viewService", {
                service: t(`${service.id}.title`),
              })}
            >
              <ArrowRight aria-hidden="true" />
            </Button>
          ) : (
            <div
              className="inline-flex py-3 px-6 bg-neutral-50 rounded-full text-neutral-400 group-hover:translate-x-8 transition-all duration-400 ease-in-out"
              role="status"
            >
              {t("soon")}
            </div>
          )}
        </div>
      </div>

      {!service.soon && (
        <Link
          href={service.href}
          className="absolute inset-0"
          aria-label={t("viewService", { service: t(`${service.id}.title`) })}
          tabIndex={0}
        />
      )}
    </div>
  );
};

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
          className="grid grid-cols-1 gap-6 xl:grid-cols-2 xl:gap-8 xl:py-10"
        >
          <h2 id="services-title" className="heading-2">
            {t("servicesTitle")}
          </h2>
          <p className="text-lg font-medium">{t("servicesDescription")}</p>
        </div>

        <div className="mt-6 md:mt-8" role="list">
          {services.map((service, idx) => (
            <div key={service.id} data-service-item>
              <ServiceItem service={service} t={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
