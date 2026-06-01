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
  /** Productos habilitados para la organización (adamo_sign, adamo_pay, …) */
  allowedProducts?: string[];
  /** Productos a los que el usuario puede acceder según roles */
  availableProducts?: string[];
  orgUsers?: OrgUser[];
  organizationSubscriptions?: OrganizationSubscription[];
};
