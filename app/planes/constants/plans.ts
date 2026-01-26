export type PlanId = "free" | "pro" | "enterprise";

export interface PlanService {
  adamoSign: boolean;
  adamoId: boolean;
  adamoPay: boolean;
  initialCredit?: string;
}

export interface Plan {
  id: PlanId;
  translationKey: string;
  recommended: boolean;
  colorScheme: "neutral" | "pay" | "id";
  maxSubaccounts?: number;
  services: PlanService;
}

export const plans: Plan[] = [
  {
    id: "free",
    translationKey: "free",
    recommended: false,
    colorScheme: "neutral",
    services: {
      adamoSign: true,
      adamoId: true,
      adamoPay: false,
      initialCredit: "$3",
    },
  },
  {
    id: "pro",
    translationKey: "pro",
    recommended: true,
    colorScheme: "pay",
    services: {
      adamoSign: true,
      adamoId: true,
      adamoPay: true,
    },
  },
  {
    id: "enterprise",
    translationKey: "enterprise",
    recommended: false,
    colorScheme: "id",
    maxSubaccounts: 3,
    services: {
      adamoSign: true,
      adamoId: true,
      adamoPay: true,
    },
  },
];
