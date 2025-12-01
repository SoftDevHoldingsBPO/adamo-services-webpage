"use client";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ArrowRight } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type VideoDemoDialogProps = Readonly<{
  product: "adamo-id" | "adamo-pay" | "adamo-risk" | "adamo-sign";
}>;

export function VideoDemoDialog({ product }: VideoDemoDialogProps) {
  const locale = useLocale();
  const t = useTranslations("my-services");

  const src = {
    "adamo-id": {
      es: "/video/AdamoId-ES.mp4",
      en: "/video/AdamoId-EN.mp4",
    },
    "adamo-pay": {
      es: "/video/Promo-ES.mp4",
      en: "/video/Promo-EN.mp4",
    },
    "adamo-risk": {
      es: "/video/AdamoId-ES.mp4",
      en: "/video/AdamoId-EN.mp4",
    },
    "adamo-sign": {
      es: "/video/AdamoId-ES.mp4",
      en: "/video/AdamoId-EN.mp4",
    },
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="md" variant="muted">
          {t("videoDemo.button")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl">
        <VisuallyHidden>
          <DialogHeader>
            <DialogTitle>{t("videoDemo.title")}</DialogTitle>
            <DialogDescription>{t("videoDemo.description")}</DialogDescription>
          </DialogHeader>
        </VisuallyHidden>
        <video
          className="rounded-2xl"
          autoPlay
          loop
          muted
          playsInline
          controls
          title="Background video"
        >
          <source
            type="video/mp4"
            src={locale === "es" ? src[product].es : src[product].en}
          />
          Your browser does not support the video tag.
        </video>
        <DialogFooter>
          <p className="text-sm text-neutral-500">{t("videoDemo.footer")}</p>
          <Link
            href={`/contact?product=${product}`}
            className="flex gap-2 items-center text-sm"
          >
            {t("videoDemo.contactLink")}
            <ArrowRight className="size-4" />
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
