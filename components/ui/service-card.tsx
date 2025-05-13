"use client";

import { Service } from "@/constants/services";
import { cva } from "class-variance-authority";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "../icon";
import { Button } from "./button";

interface ServiceCardProps extends Service {
  className?: string;
  size?: "compact" | "default";
}

const cardHeroVariants = cva(
  "relative w-full overflow-hidden transition-colors",
  {
    variants: {
      variant: {
        adamoId: "bg-adamo-id-700 text-adamo-id-900",
        adamoPay: "bg-adamo-pay-700 text-adamo-pay-900",
        disabled: "bg-neutral-200 text-neutral-400",
      },
      size: {
        compact: "h-[132px]",
        default: "h-[132px] lg:h-[200px]",
      },
    },
    compoundVariants: [
      {
        variant: "disabled",
        size: "default",
        className: "!h-[132px]",
      },
    ],
  },
);

const ServiceCard = ({
  id,
  href,
  imagePath,
  iconPath,
  className,
  size = "default",
  variant = "disabled",
}: ServiceCardProps) => {
  const t = useTranslations("services");
  const title = t(`${id}.title`);

  const isDisabled = variant === "disabled";

  const CardContent = () => (
    <>
      <div className={cn(cardHeroVariants({ size, variant }))}>
        <div
          className={cn(
            "absolute z-10 left-1/2 top-7 -translate-x-1/2 w-[250px] h-[178px] transition-all duration-300 ease-in-out group-hover:rotate-2",
            isDisabled
              ? "lg:top-10 lg:group-hover:top-6"
              : "shadow-2xl lg:top-24 lg:group-hover:top-12",
            size === "default" &&
              "lg:w-[386px] lg:h-[274px] lg:group-hover:w-[420px] lg:group-hover:h-[298px]",
            size === "compact" && "!top-7 lg:group-hover:!top-6",
          )}
        >
          <Image
            src={imagePath}
            alt={title}
            priority={false}
            quality={100}
            fill
          />
        </div>

        {!isDisabled && (
          <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-current transition-all duration-300 ease-in-out" />
        )}
      </div>

      <div
        className={cn(
          "bg-neutral-100 pb-8 transition-all relative flex-auto flex flex-col",
          size === "default" &&
            "lg:group-hover:pl-24 duration-300 ease-in-out p-6 lg:px-10",
          size === "compact" && "px-4 pt-6",
        )}
      >
        {size === "default" && (
          <Image
            src={iconPath}
            alt={title}
            width="40"
            height="40"
            className="transition-all duration-300 ease-in-out lg:opacity-0 group-hover:opacity-100 mb-3 lg:mb-0 lg:absolute left-6 top-6"
          />
        )}
        <h4
          className={cn(
            "text-[17px] font-semibold text-neutral-900 leading-[1.25] mb-6 flex-auto",
            isDisabled && "text-neutral-400",
          )}
        >
          {title}
        </h4>

        <Button
          variant="primary"
          size="md"
          className="w-fit"
          disabled={isDisabled}
          aria-label={
            isDisabled
              ? `${title} - Coming soon`
              : `${title} - ${t(`${id}.button`)}`
          }
        >
          {t(`${id}.button`)}
          {!isDisabled && <ArrowRight aria-hidden="true" />}
        </Button>
      </div>
    </>
  );

  return (
    <article
      className={cn(
        "relative rounded-2xl lg:rounded-3xl overflow-hidden group",
        isDisabled && "cursor-not-allowed",
        className,
      )}
      aria-labelledby={`service-${id}-title`}
    >
      {isDisabled ? (
        <div
          role="article"
          aria-label={`${title} - Coming soon`}
          className="flex flex-col h-full"
        >
          <CardContent />
        </div>
      ) : (
        <Link href={href} className="flex flex-col h-full" aria-label={title}>
          <CardContent />
        </Link>
      )}
    </article>
  );
};

export default ServiceCard;
