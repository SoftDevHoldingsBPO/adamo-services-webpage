export const POSITION_KEYS = [
  "CEO_FOUNDER",
  "CTO_CPO",
  "CFO_FINANCE_DIRECTOR",
  "CISO_COMPLIANCE",
  "DIRECTOR_VP",
  "AREA_MANAGER",
  "ANALYST_SPECIALIST",
  "EXTERNAL_CONSULTANT",
] as const;

export const INDUSTRY_KEYS = [
  "FINTECH_PAYMENTS",
  "BANKING_INSURANCE",
  "LEGAL",
  "HEALTH_PHARMA",
  "TECH_SAAS",
  "ECOMMERCE",
  "GOVERNMENT",
  "REAL_ESTATE",
  "CRYPTO_WEB3",
  "EDUCATION",
  "OTHER",
] as const;

export const COUNTRY_PHONE_MAP: Record<string, string> = {
  CO: "+57",
  US: "+1",
  MX: "+52",
  AR: "+54",
  CL: "+56",
  PE: "+51",
  BR: "+55",
  EC: "+593",
  VE: "+58",
  ES: "+34",
  GB: "+44",
};

export const PHONE_COUNTRY_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(COUNTRY_PHONE_MAP).map(([iso, code]) => [code, iso]),
);

export const COMPANY_SUFFIXES = new Set([
  // Latin America
  "SA",
  "SAS",
  "LTDA",
  "SRL",
  "SC",
  "EIRL",
  "SPA",
  "SAPI",
  "SAB",
  // USA / Canada / UK
  "INC",
  "LLC",
  "LLP",
  "PLLC",
  "PC",
  "LP",
  "CORP",
  "LTD",
  "PLC",
  // Germany / Austria / Switzerland
  "GMBH",
  "AG",
  "KG",
  "KGAA",
  "OHG",
  "UG",
  // Netherlands
  "BV",
  "NV",
  "VOF",
  // Nordics
  "AB",
  "AS",
  "OY",
  "OYJ",
  // Australia / Asia
  "PTY",
  "SDN",
  "BHD",
  "PTE",
]);

export const PHONE_CODE_OPTIONS: {
  value: string;
  label: string;
  iso: string;
}[] = [
  { value: "+57", label: "+57", iso: "co" },
  { value: "+1", label: "+1", iso: "us" },
  { value: "+52", label: "+52", iso: "mx" },
  { value: "+54", label: "+54", iso: "ar" },
  { value: "+56", label: "+56", iso: "cl" },
  { value: "+51", label: "+51", iso: "pe" },
  { value: "+55", label: "+55", iso: "br" },
  { value: "+593", label: "+593", iso: "ec" },
  { value: "+58", label: "+58", iso: "ve" },
  { value: "+34", label: "+34", iso: "es" },
  { value: "+44", label: "+44", iso: "gb" },
];
