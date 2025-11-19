import { APISuccessResponse } from "@/api/types";

// User data from sign-in API response
export type SignInUserDTO = {
  _id: string;
  uuid: string;
  subjectId: string;
  name: string;
  surname: string;
  email: string;
  userType: string;
  firstLogin: boolean;
  language: string;
  photo: string;
  isActive: boolean;
  twoFactorAuthEnabled: boolean;
  loginAttempts: number;
  emailVerified: boolean;
  emailVerifiedAt: Date;
  lastLoginAt: Date;
  lastLoginIP: string;
  createdAt: Date;
  updatedAt: Date;
};

// Sign-in scenario when 2FA setup is required
export type SignInTwoFactorSetupRequired = {
  twoFactorSetupRequired: true;
  temporaryToken: string;
};

// Sign-in scenario when 2FA verification is required
export type SignInTwoFactorRequired = {
  twoFactorRequired: true;
};

// Sign-in scenario when email verification is required
export type SignInVerificationRequired = {
  verification: {
    required: true;
    method: "email";
  };
};

// Sign-in scenario when user is successfully logged in
export type SignInSuccess = {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: SignInUserDTO;
};

// Discriminated union type for all sign-in scenarios
export type SignInDTO =
  | SignInTwoFactorSetupRequired
  | SignInTwoFactorRequired
  | SignInVerificationRequired
  | SignInSuccess;

export type SignInResponse = APISuccessResponse<SignInDTO>;
