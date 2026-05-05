export function getPolicyByLocale(locale: string) {
  return locale === "es"
    ? "/documents/politica-de-tratamiento-de-datos-personales-300925-139-SCJJLVG-VF.pdf"
    : "/documents/personal-data-processing-policy.pdf";
}

export function getTermsByLocale(locale: string) {
  return locale === "es"
    ? "/documents/autorizacion-de-tratamiento-de-datos.pdf"
    : "/documents/authorization-for-the-processing-personal-data-of-adamo.pdf";
}
