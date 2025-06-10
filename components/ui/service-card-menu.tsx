import { Service } from "@/constants/services";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "../icon";
import { Button } from "./button";

interface ServiceCardMenuProps {
  service: Service;
  variant: "adamoId" | "adamoPay" | "disabled";
  className?: string;
  onClick?: (link: string) => void;
}

const variantClasses = {
  adamoId: "bg-adamo-id-700 text-adamo-id-900",
  adamoPay: "bg-adamo-pay-700 text-adamo-pay-900",
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

  const isDisabled = variant === "disabled";

  return (
    <article
      className={cn(
        "relative rounded-2xl lg:rounded-3xl overflow-hidden group",
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
        <div className="absolute z-10 left-1/2 top-7 -translate-x-1/2 w-[250px] h-[178px] transition-all duration-300 ease-in-out group-hover:rotate-2 lg:group-hover:top-5">
          <Image
            src={imagePath}
            alt={title}
            priority={false}
            quality={100}
            fill
          />
        </div>
      </div>
      <div className="px-4 pt-6 pb-8 bg-neutral-100">
        <h4
          className={cn(
            "text-[17px] font-semibold text-neutral-900 leading-[1.25] mb-6",
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
