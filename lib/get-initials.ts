export function getInitials(name: string | undefined | null): string {
  if (!name) return "N/A";

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2) // Take up to first two words
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return initials;
}
