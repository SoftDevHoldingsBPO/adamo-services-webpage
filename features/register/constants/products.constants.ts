import { AdamoCheckIcon } from "@/components/icon/AdamoCheckIcon";
import { AdamoIDIcon } from "@/components/icon/AdamoIdIcon";
import { AdamoPayIcon } from "@/components/icon/AdamoPayIcon";
import { AdamoRiskIcon } from "@/components/icon/AdamoRiskIcon";
import { AdamoSignIcon } from "@/components/icon/AdamoSignIcon";
import { DropdownOption } from "@/components/ui/options-dropdown";

export type ProductId =
  | "adamo-id"
  | "adamo-sign"
  | "adamo-pay"
  | "adamo-risk"
  | "adamo-check";

export interface ProductConfig {
  id: ProductId;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
  hasBadge: boolean;
}

export const TERM_ID = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

export const ID_VOLUME_OPTIONS: DropdownOption[] = [
  { value: "1-100", label: "1 – 100" },
  { value: "101-500", label: "101 – 500" },
  { value: "501-1000", label: "501 – 1,000" },
  { value: "1001+", label: "1,001+" },
];

export const SIGN_VOLUME_OPTIONS: DropdownOption[] = [
  { value: "1-50", label: "1 – 50" },
  { value: "51-200", label: "51 – 200" },
  { value: "201-1000", label: "201 – 1,000" },
  { value: "1001+", label: "1,001+" },
];

export const PAY_VOLUME_OPTIONS: DropdownOption[] = [
  { value: "1-10000", label: "1 – 10,000" },
  { value: "10001-50000", label: "10,001 – 50,000" },
  { value: "50001-200000", label: "50,001 – 200,000" },
  { value: "200001+", label: "200,001+" },
];

export const PAY_COUNT_OPTIONS: DropdownOption[] = [
  { value: "1-100", label: "1 – 100" },
  { value: "101-1000", label: "101 – 1,000" },
  { value: "1001-10000", label: "1,001 – 10,000" },
  { value: "10001+", label: "10,001+" },
];

export const PAY_COUNTRIES_OPTIONS: DropdownOption[] = [
  { value: "LATAM", label: "Latin America" },
  { value: "NORTH_AMERICA", label: "North America" },
  { value: "EUROPE", label: "Europe" },
  { value: "GLOBAL", label: "Global" },
];

export const RISK_VOLUME_OPTIONS: DropdownOption[] = [
  { value: "1-1000", label: "1 – 1,000" },
  { value: "1001-5000", label: "1,001 – 5,000" },
  { value: "5001-10000", label: "5,001 – 10,000" },
  { value: "10001+", label: "10,001+" },
];

export const CHECK_EMPLOYEES_OPTIONS: DropdownOption[] = [
  { value: "1-5", label: "1 – 5" },
  { value: "6-20", label: "6 – 20" },
  { value: "21-50", label: "21 – 50" },
  { value: "51+", label: "51+" },
];

export const PRODUCTS: ProductConfig[] = [
  { id: "adamo-id", color: "#0086C9", Icon: AdamoIDIcon, hasBadge: true },
  { id: "adamo-sign", color: "#3E4784", Icon: AdamoSignIcon, hasBadge: true },
  { id: "adamo-pay", color: "#0E9384", Icon: AdamoPayIcon, hasBadge: false },
  { id: "adamo-risk", color: "#7839EE", Icon: AdamoRiskIcon, hasBadge: true },
  { id: "adamo-check", color: "#6366F1", Icon: AdamoCheckIcon, hasBadge: true },
];

export const PRODUCT_FIELDS: Record<ProductId, string[]> = {
  "adamo-id": ["adamo-id"],
  "adamo-sign": ["adamo-sign"],
  "adamo-pay": [
    "adamo-pay-volume",
    "adamo-pay-currency",
    "adamo-pay-count",
    "adamo-pay-countries",
  ],
  "adamo-risk": ["adamo-risk"],
  "adamo-check": ["adamo-check"],
};

export const PAY_RESTRICTED_COUNTRIES = new Set([
  "Afghanistan",
  "Bangladesh",
  "Burundi",
  "Cambodia",
  "Central African Republic",
  "Chad",
  "Congo (Brazzaville)",
  "Gaza Strip",
  "Guinea",
  "Guinea-Bissau",
  "Iran",
  "Iraq",
  "Myanmar",
  "Niger",
  "North Korea",
  "Somalia",
  "South Sudan",
  "Sudan",
  "Suriname",
  "Syria",
  "Venezuela",
  "West Bank (Palestinian Territory)",
  "Yemen",
  "Zimbabwe",
]);
