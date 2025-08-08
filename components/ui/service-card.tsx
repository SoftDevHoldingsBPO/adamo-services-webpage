"use client";

import { Service } from "@/constants/services";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useRef } from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "../icon";
import { Button } from "./button";

interface ServiceCardProps {
  service: Service;
  variant: "adamoId" | "adamoPay" | "adamoSign" | "adamoRisk" | "disabled";
}

const variantClasses = {
  adamoId: "bg-adamo-id-600 text-adamo-id-900",
  adamoPay: "bg-adamo-pay-600 text-adamo-pay-900",
  adamoSign: "bg-adamo-sign-600 text-adamo-sign-900",
  adamoRisk: "bg-adamo-risk-600 text-adamo-risk-900",
  disabled: "bg-neutral-200 text-neutral-400",
};

const ServiceCard = ({ service, variant = "disabled" }: ServiceCardProps) => {
  const { id, imagePath, href, iconPath } = service;

  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const tl = useRef<gsap.core.Timeline | null>(null);

  const t = useTranslations("services");
  const title = t(`${id}.title`);
  const description = t(`${id}.description`);

  const isDisabled = service.variant === "disabled";

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add("(min-width: 1280px)", () => {
      if (
        !cardRef.current ||
        !imageRef.current ||
        !contentRef.current ||
        !headingRef.current
      )
        return;

      tl.current = gsap.timeline({
        paused: true,
        defaults: {
          ease: "back.out(2.2)",
          duration: 0.5,
        },
      });

      const timeline = tl.current;

      timeline.to(imageRef.current, {
        scale: 1.1,
        rotate: 2,
        y: 0,
      });
      timeline.to(
        contentRef.current,
        {
          height: 230,
        },
        "<",
      );
      timeline.to(
        headingRef.current,
        {
          marginTop: -48,
          opacity: 0,
        },
        "<",
      );
    });
  });

  const handleMouseEnter = () => {
    if (!tl.current) return;

    const timeline = tl.current;
    timeline.play();
  };

  const handleMouseLeave = () => {
    if (!tl.current) return;

    const timeline = tl.current;
    timeline.timeScale(1.5).reverse();
  };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-3xl overflow-hidden relative h-[340px] xl:h-[340px] group"
    >
      <div
        className={cn(
          "relative w-full h-[150px] lg:h-[200px] overflow-hidden",
          variantClasses[variant],
        )}
      >
        <div ref={imageRef} className="absolute inset-0">
          <video
            src={imagePath}
            className="w-full h-full object-cover rounded-lg"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-current transition-all duration-300 ease-in-out opacity-50"
          aria-hidden
        />
      </div>

      <div
        ref={contentRef}
        className="absolute inset-x-0 bottom-0 bg-neutral-100 py-8 px-6 xl:px-10 flex flex-col items-start gap-y-6 overflow-hidden xl:h-[140px]"
      >
        <div ref={headingRef} className="flex items-start gap-x-4">
          <Image
            src={iconPath}
            alt={title}
            width="40"
            height="40"
            className="shrink-0 xl:hidden"
          />
          <h4
            className={cn(
              "text-[17px] font-semibold text-neutral-900 leading-[1.25] ",
            )}
          >
            {title}
          </h4>
        </div>

        <Button variant="primary" size="md" disabled={isDisabled}>
          {t(`${id}.button`)}
          {!isDisabled && <ArrowRight aria-hidden="true" />}
        </Button>

        <div className="mt-2 xl:flex items-start gap-x-6 hidden">
          <Image
            src={iconPath}
            alt={title}
            width="40"
            height="40"
            className="shrink-0"
          />

          <p className="font-medium">{description}</p>
        </div>
      </div>

      {!isDisabled && <Link href={href} className="absolute inset-0" />}
    </article>
  );
};

export default ServiceCard;
