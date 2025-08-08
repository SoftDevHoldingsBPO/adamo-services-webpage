export interface Service {
  id: "adamoId" | "adamoPay" | "adamoSign" | "disabled" | "adamoRisk";
  href: string;
  imagePath: string;
  iconPath: string;
  variant: "adamoId" | "adamoPay" | "adamoSign" | "disabled" | "adamoRisk";
}

export const services: Service[] = [
  {
    id: "adamoId",
    href: "/adamo-id",
    imagePath: "/images/services/adamo-id.webm",
    iconPath: "/images/services/adamo-id-icon.svg",
    variant: "adamoId",
  },
  {
    id: "adamoPay",
    href: "/adamo-pay",
    imagePath: "/images/services/adamo-pay.webm",
    iconPath: "/images/services/adamo-pay-icon.svg",
    variant: "adamoPay",
  },
  {
    id: "adamoSign",
    href: "/adamo-sign",
    imagePath: "/images/services/adamo-sign.webm",
    iconPath: "/images/services/adamo-sign-icon.svg",
    variant: "adamoSign",
  },
  {
    id: "adamoRisk",
    href: "/adamo-risk",
    imagePath: "/images/services/adamo-risk.webm",
    iconPath: "/images/services/adamo-risk-icon.svg",
    variant: "disabled",
  },
];
