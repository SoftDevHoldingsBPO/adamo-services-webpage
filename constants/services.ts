export interface Service {
  id: string;
  href: string;
  imagePath: string;
  soon?: boolean;
}

export const services: Service[] = [
  {
    id: "adamoId",
    href: "/adamo-id",
    imagePath: "/images/services/adamo-id.png",
    soon: false,
  },
  {
    id: "adamoPay",
    href: "/adamo-pay",
    imagePath: "/images/services/adamo-pay.png",
    soon: false,
  },
  {
    id: "adamoRisk",
    href: "/adamo-risk",
    imagePath: "/images/services/adamo-soon.png",
    soon: true,
  },
  {
    id: "adamoSign",
    href: "/adamo-sign",
    imagePath: "/images/services/adamo-soon.png",
    soon: true,
  },
];
