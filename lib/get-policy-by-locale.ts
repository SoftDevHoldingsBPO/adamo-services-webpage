export function getPolicyByLocale(locale: string) {
  return locale === "es"
    ? "/documents/politica-de-tratamiento-de-datos-personales-300925-139-SCJJLVG-VF.pdf"
    : "/documents/personal-data-processing-policy.pdf";
}
