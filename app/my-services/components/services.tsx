import { ArrowRight, Calendar } from "lucide-react";

import React, { ComponentType } from "react";

import { cn } from "@/lib/utils";

import { AdamoIDIcon } from "@/components/icon/AdamoIdIcon";
import { AdamoPayIcon } from "@/components/icon/AdamoPayIcon";
import { AdamoRiskIcon } from "@/components/icon/AdamoRiskIcon";
import { AdamoSignIcon } from "@/components/icon/AdamoSignIcon";
import { CrownIcon } from "@/components/icon/CrownIcon";
import { Button } from "@/components/ui/button";

export function Services() {
  const services: {
    name: string;
    description: string;
    plan: string;
    subscriptionUntil: string;
    isHired: boolean;
    icon: ComponentType;
    color: string;
  }[] = [
    {
      name: "Adamo ID",
      description: "Servicio de identidad",
      plan: "Starter Plan",
      subscriptionUntil: "2023-12-31",
      isHired: true,
      icon: AdamoIDIcon,
      color: "bg-adamo-id-700",
    },
    {
      name: "Adamo Pay",
      description: "Servicio de pagos",
      plan: "Professional Plan",
      subscriptionUntil: "2023-12-31",
      isHired: true,
      icon: AdamoPayIcon,
      color: "bg-adamo-pay-700",
    },
    {
      name: "Adamo Risk",
      description: "Servicio de riesgo",
      plan: "Starter Plan",
      subscriptionUntil: "2023-12-31",
      isHired: false,
      icon: AdamoRiskIcon,
      color: "bg-adamo-risk-700",
    },
    {
      name: "Adamo Sign",
      description: "Servicio de firma",
      plan: "Starter Plan",
      subscriptionUntil: "2023-12-31",
      isHired: false,
      icon: AdamoSignIcon,
      color: "bg-adamo-sign-700",
    },
  ];

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4">
      {services.map((service) => (
        <ServiceCard key={service.name} {...service} />
      ))}
      <div className="xl:row-start-1 xl:col-start-5 xl:col-span-2 text-sm p-8">
        <p className="text-left mb-8 text-neutral-500">Links de interés</p>
        <ul className="flex flex-col items-start gap-6 font-medium">
          <li>Nosotros</li>
          <li>Políticas de privacidad</li>
          <li>Mi perfil</li>
        </ul>
      </div>
    </ul>
  );
}

type ServiceCardProps = {
  name: string;
  plan: string;
  description: string;
  subscriptionUntil: string;
  isHired: boolean;
  icon: ComponentType;
  color: string;
};

function ServiceCard({
  name,
  plan,
  description,
  subscriptionUntil,
  isHired,
  icon,
  color,
}: ServiceCardProps) {
  const Icon = icon;

  return (
    <article
      className={cn(
        "xl:nth-1:col-span-2 xl:nth-2:col-span-2 xl:nth-3:col-span-3 xl:nth-4:col-span-3 border-8 border-white/20 rounded-4xl",
      )}
    >
      <header
        className={cn(
          "flex gap-8 items-center rounded-t-3xl p-8",
          isHired ? color : "bg-neutral-300",
        )}
      >
        <Icon />
        <div
          className={cn(
            "flex items-center gap-2 p-4 rounded-4xl",
            isHired ? "bg-white/20" : "bg-white/50",
          )}
        >
          {isHired && <CrownIcon />}
          <p
            className={cn("font-semibold text-sm", {
              "text-white": isHired,
              "text-neutral-400": !isHired,
            })}
          >
            {isHired ? plan : "Sin suscribir"}
          </p>
        </div>
      </header>
      <div className="rounded-b-3xl bg-white p-8">
        <p
          className={cn("text-left text-neutral-900 font-semibold mb-4", {
            "text-neutral-400": !isHired,
          })}
        >
          {name}
        </p>
        <div className="flex items-center gap-2 text-neutral-500 mb-6">
          {isHired && <Calendar />}
          <p
            className={cn("text-sm", {
              "text-neutral-400": !isHired,
            })}
          >
            {isHired ? `Suscripción hasta: ${subscriptionUntil}` : description}
          </p>
        </div>
        <div className="flex items-center gap-6 flex-wrap">
          <Button size="md">
            <span>{isHired ? "Ingresar" : "Contratar servicio"}</span>
            <ArrowRight />
          </Button>
          <Button size="md" variant="muted">
            {isHired ? "Mejorar plan" : "Ver demo"}
          </Button>
        </div>
      </div>
    </article>
  );
}
