/** Convierte slug API (adamo_sign) al id de UI (adamo-sign). */
export function apiProductToUiId(slug: string): string {
  return slug.replace(/_/g, "-");
}

/** Convierte id de UI (adamo-sign) al slug API (adamo_sign). */
export function uiProductToApiSlug(id: string): string {
  return id.replace(/-/g, "_");
}

export function isProductAllowed(
  allowedProducts: string[] | undefined,
  uiProductId: string,
): boolean {
  if (!allowedProducts?.length) return false;
  const apiSlug = uiProductToApiSlug(uiProductId);
  return allowedProducts.includes(apiSlug);
}
