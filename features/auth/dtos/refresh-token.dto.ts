import { APISuccessResponse } from "@/api/types";

export type RefreshToken = {
  token: string;
  expiredAt: string;
};

export type RefreshTokenResponse = APISuccessResponse<RefreshToken>;
