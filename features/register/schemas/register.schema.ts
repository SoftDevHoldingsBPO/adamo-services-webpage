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

export type RegistrationEmailValidationOptions = {
  requireCorporateEmail: boolean;
  enforceUniqueOrganizationDomain: boolean;
};

export const DEFAULT_REGISTRATION_EMAIL_VALIDATION: RegistrationEmailValidationOptions =
  {
    requireCorporateEmail: true,
    enforceUniqueOrganizationDomain: true,
  };

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
function isPlausibleDomain(email: string): boolean {
  const sld = email.split("@")[1]?.split(".")[0]?.toLowerCase() ?? "";
  if (!sld) return false;
  if (new Set(sld).size < 2) return false;
  if (sld.length >= 5 && !/[aeiou]/.test(sld)) return false;
  if (!sld.includes("-") && sld.length >= 5 && /^[^aeiou]{4,}/.test(sld))
    return false;
  return true;
}

export function createRegisterPersonalInfoSchema(
  options: RegistrationEmailValidationOptions = DEFAULT_REGISTRATION_EMAIL_VALIDATION,
) {
  const baseEmailSchema = z.string().email("errors.emailInvalid");

  const emailSchema = options.requireCorporateEmail
    ? baseEmailSchema
        .refine((val) => {
          const domain = val.split("@")[1]?.split(".")[0]?.toLowerCase() ?? "";
          return !FREE_EMAIL_DOMAINS.includes(domain);
        }, "errors.emailPersonal")
        .refine(isPlausibleDomain, "errors.emailDomainInvalid")
    : baseEmailSchema;

  return z.object({
    email: emailSchema,
    name: z
      .string()
      .min(2, "errors.nameTooShort")
      .refine(
        (val) => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(val.trim()),
        "errors.nameInvalid",
      ),
    surname: z
      .string()
      .min(2, "errors.nameTooShort")
      .refine(
        (val) => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(val.trim()),
        "errors.nameInvalid",
      ),
    companyName: z
      .string()
      .min(3, "errors.companyTooShort")
      .refine(isPlausibleName, "errors.companyInvalid"),
    companyIdentification: z
      .string()
      .min(1, "errors.required")
      .regex(/^[a-zA-Z0-9]+$/, "errors.companyIdentificationInvalid"),
    position: z.string().min(1, "errors.required"),
    industry: z.string().min(1, "errors.required"),
    country: z.string().min(1, "errors.required"),
    phoneCode: z.string().optional(),
    phone: z
      .string()
      .min(1, "errors.phoneRequired")
      .regex(/^\d{6,15}$/, "errors.phoneInvalid"),
  });
}

/** @deprecated Use createRegisterPersonalInfoSchema() — kept for type inference */
export const RegisterPersonalInfoSchema = createRegisterPersonalInfoSchema();

export type RegisterPersonalInfoValues = z.infer<
  ReturnType<typeof createRegisterPersonalInfoSchema>
>;
