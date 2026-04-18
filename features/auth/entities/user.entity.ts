export type OrgUser = {
  uuid: string;
  fullName: string;
  email: string;
  isActive: boolean;
  roles: Array<{ product?: string; role: string }>;
};

export type User = {
  name: string;
  role: string;
  lastName: string;
  email: string;
  avatar?: string;
  isTwoFactorEnabled: boolean;
  orgUsers?: OrgUser[];
};
