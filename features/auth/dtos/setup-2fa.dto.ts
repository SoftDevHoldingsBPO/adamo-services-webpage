import { APISuccessResponse } from "@/api/types";

export type Setup2FADTO = {
  base32: string;
  otpauth_url: string;
  qr: string;
};

export type Setup2FAResponse = APISuccessResponse<Setup2FADTO>;
