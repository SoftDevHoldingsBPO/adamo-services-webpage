import { APISuccessResponse } from "@/api/types";

<<<<<<< Updated upstream
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
=======
export type OrganizationSubscriptionSummary = {
>>>>>>> Stashed changes
  uuid: string;
  planSlug: string;
  planName: string;
  planVersion: number;
  status: string;
<<<<<<< Updated upstream
  currentPeriodStart: string;
  currentPeriodEnd: string;
  features: OrganizationSubscriptionFeature[];
=======
  productScope?: string;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  trialEndsAt?: string;
  endDate?: string;
  lastPaymentStatus?: string;
  features: Array<{
    key: string;
    limit: number;
    product?: string;
    description?: string;
    unit?: string;
    requiresContact?: boolean;
  }>;
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  organizationSubscriptions: OrganizationSubscription[];
=======
  organizationId?: string;
  allowedProducts: string[];
  availableProducts: string[];
  organization?: {
    uuid: string;
    name: string;
    type: string;
    plan?: string;
    allowedProducts: string[];
  };
  organizationSubscriptions?: OrganizationSubscriptionSummary[];
>>>>>>> Stashed changes
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
