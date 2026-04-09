import z from "zod";

const FREE_EMAIL_DOMAINS = [
  "gmail",
  "googlemail",
  "yahoo",
  "ymail",
  "rocketmail",
  "outlook",
  "hotmail",
  "live",
  "msn",
  "windowslive",
  "icloud",
  "me",
  "mac",
  "aol",
  "protonmail",
  "proton",
  "tutanota",
  "zoho",
  "mail",
  "inbox",
  "gmx",
  "web",
  "yandex",
  "rambler",
  "qq",
  "163",
  "126",
];

// Heuristic: checks that the name contains at least 2 alphabetic "runs" of 2+
// characters each, preventing repetitions like "kkkkk" or random strings.
const NAME_RE = /[a-záéíóúüñ]{2,}/gi;
function isPlausibleName(value: string): boolean {
  const matches = value.trim().match(NAME_RE) ?? [];
  // Require at least one run of 3+ distinct chars (no single-char repetition filling)
  return matches.some((m) => new Set(m.toLowerCase()).size >= 3);
}

// Heuristic: catches obviously fake/gibberish email domains like "jjjj.co" or
// "kjfdewofjwero.co" without relying on a domain whitelist.
//  1. SLD must have ≥ 2 distinct characters (rejects "jjjjj", "aaaaa", etc.)
//  2. SLD of 5+ characters must contain at least one vowel (rejects "kjfde", "bgrths")
//  3. SLD of 5+ characters cannot start with 4+ consecutive consonants (rejects "kjfdewofjwero")
function isPlausibleDomain(email: string): boolean {
  const sld = email.split("@")[1]?.split(".")[0]?.toLowerCase() ?? "";
  if (!sld) return false;
  if (new Set(sld).size < 2) return false;
  if (sld.length >= 5 && !/[aeiou]/.test(sld)) return false;
  if (sld.length >= 5 && /^[^aeiou]{4,}/.test(sld)) return false;
  return true;
}

export const RegisterPersonalInfoSchema = z.object({
  email: z
    .string()
    .email("errors.emailInvalid")
    .refine((val) => {
      const domain = val.split("@")[1]?.split(".")[0]?.toLowerCase() ?? "";
      return !FREE_EMAIL_DOMAINS.includes(domain);
    }, "errors.emailPersonal")
    .refine(isPlausibleDomain, "errors.emailDomainInvalid"),
  fullName: z
    .string()
    .min(3, "errors.nameTooShort")
    .refine(isPlausibleName, "errors.nameInvalid"),
  companyName: z
    .string()
    .min(3, "errors.companyTooShort")
    .refine(isPlausibleName, "errors.companyInvalid"),
  position: z.string().min(1, "errors.required"),
  industry: z.string().min(1, "errors.required"),
  country: z.string().min(1, "errors.required"),
  phoneCode: z.string().optional(),
  phone: z
    .string()
    .min(1, "errors.phoneRequired")
    .regex(/^\d{6,15}$/, "errors.phoneInvalid"),
});

export type RegisterPersonalInfoValues = z.infer<
  typeof RegisterPersonalInfoSchema
>;
