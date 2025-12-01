import { APISuccessResponse } from "@/api/types";

export type ProfileDTO = {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  fullName: string;
  userType: string;
  language: string;
  photo: string;
  isActive: boolean;
  twoFactorAuthEnabled: boolean;
  roles: any[];
  permissions: any[];
  lastLoginAt: Date;
  lastLoginIP: string;
  createdAt: Date;
  updatedAt: Date;
  acceptedTerms: any[];
  sessionInfo: SessionInfo;
};

export type SessionInfo = {
  sessionId: string;
  timestamp: Date;
};

export type GetProfileResponse = APISuccessResponse<ProfileDTO>;
