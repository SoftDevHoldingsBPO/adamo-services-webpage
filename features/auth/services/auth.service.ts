import { api } from "@/api/api";
import { RefreshTokenResponse } from "@/features/auth/dtos/refresh-token.dto";
import { Setup2FAResponse } from "@/features/auth/dtos/setup-2fa.dto";
import { SignInResponse } from "@/features/auth/dtos/sign-in.dto";
import { VerifyEmailForPasswordRecoveryResponse } from "@/features/auth/dtos/verify-email-for-password-recovery.dto";
import { AxiosHeaders } from "axios";

class AuthService {
  public static async signIn(args: {
    email: string;
    password: string;
    totp?: string;
  }) {
    const response = await api.post<SignInResponse>("/api/v1/auth/login", args);
    return response.data;
  }

  public static async signUp(args: {
    name: string;
    surname: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    await api.post<void>("/api/v1/auth/register", args);
  }

  public static async verifyEmail(args: { email: string; otp: string }) {
    await api.post<void>("/api/v1/auth/verify-email", args);
  }

  public static async setup2FA(args?: { accessToken?: string }) {
    const headers = new AxiosHeaders();

    if (args?.accessToken) {
      headers.set("Authorization", `Bearer ${args.accessToken}`);
    }

    const response = await api.post<Setup2FAResponse>(
      "/api/v1/auth/setup-2fa",
      {},
      { headers },
    );

    return response.data;
  }

  public static async verify2FA(args: { accessToken: string; code: string }) {
    const response = await api.post<void>(
      "/api/v1/auth/verify-2fa",
      { totp: args.code },
      { headers: { Authorization: `Bearer ${args.accessToken}` } },
    );

    return response.data;
  }

  public static async recoverPassword(args: { email: string }) {
    const response = await api.post<void>("/api/v1/auth/forgot-password", args);
    return response.data;
  }

  public static async verifyEmailForPasswordRecovery(args: {
    email: string;
    otp: string;
  }) {
    const response = await api.post<VerifyEmailForPasswordRecoveryResponse>(
      "/api/v1/auth/verify-otp",
      args,
    );

    return response.data;
  }

  public static async resetPassword(args: {
    email: string;
    temporaryPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    await api.post<void>("/api/v1/auth/reset-password", args);
  }

  public static async resendCode(args: { email: string }) {
    await api.post<void>("/api/v1/auth/resend-otp", args);
  }

  public static async refreshToken() {
    const response = await api.post<RefreshTokenResponse>(
      "/api/v1/auth/refresh",
      {},
    );

    return response.data;
  }

  public static async authorize() {
    const response = await api.get<void>("/api/v1/auth/authorize");
    return response.data;
  }

  public static async signOut() {
    const response = await api.post<void>("/api/v1/auth/logout");
    return response.data;
  }

  public static async verifyPassword(args: { password: string }) {
    const response = await api.post<void>("/api/v1/auth/verify-password", args);
    return response.data;
  }

  public static async updatePassword(args: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    const response = await api.post<void>("/api/v1/auth/update-password", args);
    return response.data;
  }
}

export default AuthService;
