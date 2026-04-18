import type { AddUserInitialData } from "../add-user/add-user-form";

export type UserStatus = "active" | "disabled";

export type User = {
  id: string;
  name: string;
  email: string;
  serviceRole: string;
  status: UserStatus;
  services: AddUserInitialData["services"];
  createdAt: Date;
};
