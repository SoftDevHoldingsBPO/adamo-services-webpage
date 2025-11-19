import { APISuccessResponse } from "@/api/types";

export type VerifyEmailForPasswordRecoveryDTO = {
  temporaryPassword: string;
};

export type VerifyEmailForPasswordRecoveryResponse =
  APISuccessResponse<VerifyEmailForPasswordRecoveryDTO>;
