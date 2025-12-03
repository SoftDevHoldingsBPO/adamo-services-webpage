import { APISuccessResponse } from "@/api/types";

export type UpdateProfilePhotoRequest = {
  photo: File;
};

// Result returned after updating the profile photo
export type Profile = {
  uuid: string;
  name: string;
  surname: string;
  email: string;
  fullName: string;
  language: string;
  photo: string;
  updatedAt: Date;
};

export type SessionInfo = {
  sessionId: string;
  timestamp: Date;
};

export type UpdatedProfile = {
  profile: Profile;
  updated: string[];
  sessionInfo: SessionInfo;
};

export type UpdateProfilePhotoResponse = APISuccessResponse<UpdatedProfile>;
