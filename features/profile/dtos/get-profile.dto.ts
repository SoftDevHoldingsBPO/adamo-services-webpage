import { APISuccessResponse } from "@/api/types";

export type OrganizationSubscriptionFeature = {
  key: string;
  limit: number;
  product: string;
  description: string;
  unit: string;
  resetPeriod: string;
  requiresContact: boolean;
};

export type OrganizationSubscription = {
  uuid: string;
  planSlug: string;
  planName: string;
  planVersion: number;
  status: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  features: OrganizationSubscriptionFeature[];
};

export type Profile = {
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
  organizationSubscriptions: OrganizationSubscription[];
  lastLoginAt: Date;
  lastLoginIP: string;
  createdAt: Date;
  updatedAt: Date;
  acceptedTerms: any[];
  sessionInfo: Session;
};

export type Session = {
  sessionId: string;
  timestamp: Date;
};

export type GetProfileResponse = APISuccessResponse<Profile>;
