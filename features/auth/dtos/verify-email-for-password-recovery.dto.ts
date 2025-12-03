import { APISuccessResponse } from "@/api/types";

export type VerifyEmailForPasswordRecovery = {
  temporaryPassword: string;
};

export type VerifyEmailForPasswordRecoveryResponse =
  APISuccessResponse<VerifyEmailForPasswordRecovery>;
