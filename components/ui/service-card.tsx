"use client";

import { Service } from "@/constants/services";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ArrowRight } from "../icon";
import { Button } from "./button";

interface ServiceCardProps extends Service {
  className?: string;
}

const ServiceCard = ({
  id,
  href,
  imagePath,
  soon,
  className,
}: ServiceCardProps) => {
  const t = useTranslations("services");
  const title = t(`${id}.title`);

  const CardContent = () => (
    <>
      <div className="relative h-[132px] w-full">
        <Image
          fill
          src={imagePath}
          alt={title}
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="bg-neutral-100 flex flex-col gap-6 pt-6 px-4 pb-8">
        <h4 className="text-[17px] font-semibold text-neutral-900 leading-[1.25]">
          {title}
        </h4>
        <Button variant="primary" size="md" className="w-fit" disabled={soon}>
          {t(`${id}.button`)}
          {!soon && <ArrowRight />}
        </Button>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden duration-300",
        soon && "cursor-not-allowed",
        className,
      )}
    >
      {soon ? (
        <CardContent />
      ) : (
        <Link href={href} className="block">
          <CardContent />
        </Link>
      )}
    </div>
  );
};

export default ServiceCard;
