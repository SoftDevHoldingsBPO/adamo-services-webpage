import { COMPANY_SUFFIXES } from "@/features/register/constants/personal-information.constants";

export function capitalizeFullName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function capitalizeCompanyName(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((word) => {
      const stripped = word.replace(/[.,]+$/, "");
      const trailing = word.slice(stripped.length);
      const normalized = stripped.replace(/\./g, "").toUpperCase();
      if (COMPANY_SUFFIXES.has(normalized)) {
        return stripped.toUpperCase() + trailing;
      }
      return (
        stripped.charAt(0).toUpperCase() +
        stripped.slice(1).toLowerCase() +
        trailing
      );
    })
    .join(" ");
}
