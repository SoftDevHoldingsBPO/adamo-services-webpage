import { APISuccessResponse } from "@/api/types";

export type RefreshTokenDTO = {
  token: string;
  expiredAt: string;
};

export type RefreshTokenResponse = APISuccessResponse<RefreshTokenDTO>;
