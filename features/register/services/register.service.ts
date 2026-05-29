import { api } from "@/api/api";
import {
  DEFAULT_REGISTRATION_EMAIL_VALIDATION,
  RegistrationEmailValidationOptions,
} from "@/features/register/schemas/register.schema";

interface RegisterUserPayload {
  email: string;
  name: string;
  surname: string;
  fullName?: string;
  companyName: string;
  companyIdentification: string;
  jobTitle: string;
  industry: string;
  country: string;
  phoneCode: string;
  phone: string;
  language: string;
}

interface CompleteRegistrationPayload {
  email: string;
  productInterests: Record<string, object>;
  acceptedTerms: {
    termId: string;
    updatedAt: string;
  };
}

const RegisterService = {
  getRegistrationSettings: async (): Promise<RegistrationEmailValidationOptions> => {
    const { data: body } = await api.get<{
      data: RegistrationEmailValidationOptions;
    }>("/api/v1/commercial/registration-settings");

    const settings = body?.data;
    if (!settings) {
      return DEFAULT_REGISTRATION_EMAIL_VALIDATION;
    }

    return {
      requireCorporateEmail: settings.requireCorporateEmail !== false,
      enforceUniqueOrganizationDomain:
        settings.enforceUniqueOrganizationDomain !== false,
    };
  },

  checkEmail: async (email: string): Promise<void> => {
    await api.post("/api/v1/commercial/check-email", { email });
  },

  registerUser: async (payload: RegisterUserPayload): Promise<void> => {
    await api.post("/api/v1/auth/register", payload);
  },

  verifyEmail: async (email: string, otp: string): Promise<void> => {
    await api.post("/api/v1/auth/verify-email", { email, otp });
  },

  resendOtp: async (email: string): Promise<void> => {
    await api.post("/api/v1/auth/resend-otp", {
      email_type: "new_register",
      email,
    });
  },

  completeRegistration: async (
    payload: CompleteRegistrationPayload,
  ): Promise<void> => {
    await api.post("/api/v1/auth/complete-registration", payload);
  },
};

export default RegisterService;
