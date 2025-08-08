import { Service } from "@/constants/services";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "../icon";
import { Button } from "./button";

interface ServiceCardMenuProps {
  service: Service;
  variant: "adamoId" | "adamoPay" | "adamoSign" | "adamoRisk" | "disabled";
  className?: string;
  onClick?: (link: string) => void;
}

const variantClasses = {
  adamoId: "bg-adamo-id-600 text-adamo-id-900",
  adamoPay: "bg-adamo-pay-600 text-adamo-pay-900",
  adamoSign: "bg-adamo-sign-600 text-adamo-sign-800",
  adamoRisk: "bg-adamo-risk-600 text-adamo-risk-800",
  disabled: "bg-neutral-200 text-neutral-400",
};

const ServiceCardMenu = ({
  service,
  variant = "disabled",
  className,
  onClick,
}: ServiceCardMenuProps) => {
  const { id, imagePath, href } = service;

  const t = useTranslations("services");
  const title = t(`${id}.title`);

  const isDisabled = service.variant === "disabled";

  return (
    <article
      className={cn(
        "relative rounded-2xl lg:rounded-3xl overflow-hidden group h-full flex flex-col",
        isDisabled && "cursor-not-allowed",
        className,
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden transition-colors h-[132px]",
          variantClasses[variant],
        )}
      >
        <div className="absolute inset-0">
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
      <div className="px-4 pt-6 pb-8 bg-neutral-100 flex-auto flex flex-col">
        <h4
          className={cn(
            "text-[17px] font-semibold text-neutral-900 leading-[1.25] mb-6 flex-auto",
          )}
        >
          {title}
        </h4>

        <Button
          variant="primary"
          size="md"
          className="w-fit"
          disabled={isDisabled}
        >
          {t(`${id}.button`)}
          {!isDisabled && <ArrowRight aria-hidden="true" />}
        </Button>
      </div>

      {!isDisabled && (
        <Link
          href={href}
          className="absolute inset-0 focus:outline-none z-20"
          onClick={(e) => {
            if (onClick) {
              e.preventDefault();
              onClick(href);
            }
          }}
        />
      )}
    </article>
  );
};

export default ServiceCardMenu;
