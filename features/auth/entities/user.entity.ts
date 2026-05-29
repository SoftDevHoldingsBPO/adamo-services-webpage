import type { OrganizationSubscription } from "@/features/profile/dtos/get-profile.dto";

export type { OrganizationSubscription };

export type OrgUser = {
  uuid: string;
  fullName: string;
  email: string;
  isActive: boolean;
  roles: Array<{ product?: string; role: string }>;
};

export type User = {
  name: string;
  role?: string;
  lastName: string;
  email: string;
  avatar?: string;
  isTwoFactorEnabled: boolean;
  isAdminUser?: boolean;
  isPrimaryUser?: boolean;
  orgUsers?: OrgUser[];
  organizationSubscriptions?: OrganizationSubscription[];
};
