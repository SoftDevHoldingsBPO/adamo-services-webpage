import { api } from "@/api/api";
import { OrgUser, User } from "@/features/auth/entities/user.entity";
import { GetProfileResponse } from "@/features/profile/dtos/get-profile.dto";
import {
  UpdateProfilePhotoRequest,
  UpdateProfilePhotoResponse,
} from "@/features/profile/dtos/update-profile-photo.dto";
import {
  UpdateProfileRequest,
  UpdateProfileResponse,
} from "@/features/profile/dtos/update-profile.dto";

export class ProfileService {
  public static GET_PROFILE_QUERY_KEY = "get-profile";
  public static UPDATE_PROFILE_MUTATION_KEY = "update-profile";

  public static async get(options?: { isInitialAuthCheck?: boolean }): Promise<User> {
    const response = await api.get<GetProfileResponse>("/api/v1/user/profile", {
      ...(options?.isInitialAuthCheck && { _isInitialAuthCheck: true }),
    });

    const { data } = response.data;

    return {
      name: data.name,
      email: data.email,
      lastName: data.surname,
      avatar: data.photo || undefined,
      isTwoFactorEnabled: data.twoFactorAuthEnabled,
      isAdminUser: data.roles.some((r) => r.role === "admin"),
      isPrimaryUser: data.roles.some((r) => r.role === "primary_user"),
<<<<<<< Updated upstream
      organizationSubscriptions: data.organizationSubscriptions,
=======
      allowedProducts: data.allowedProducts ?? data.organization?.allowedProducts ?? [],
      availableProducts: data.availableProducts ?? [],
>>>>>>> Stashed changes
    };
  }

  public static async update(
    args: UpdateProfileRequest,
  ): Promise<UpdateProfileResponse> {
    const response = await api.put<UpdateProfileResponse>(
      "/api/v1/user/profile",
      args,
    );

    return response.data;
  }

  public static async updatePhoto({
    photo,
  }: UpdateProfilePhotoRequest): Promise<UpdateProfilePhotoResponse> {
    const body = new FormData();

    body.append("photo", photo);

    const response = await api.put<UpdateProfilePhotoResponse>(
      "/api/v1/user/profile/photo",
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  }

  public static async deletePhoto(): Promise<void> {
    await api.delete<void>("/api/v1/user/profile/photo");
  }

  public static async registerOrgUser(args: {
    name: string;
    surname: string;
    email: string;
    products: Array<{ product: string; role: string }>;
  }): Promise<void> {
    await api.post("/api/v1/user/organization/users", args);
  }

  public static async updateOrgUser(
    uuid: string,
    args: {
      name: string;
      surname: string;
      products: Array<{ product: string; role: string }>;
    },
  ): Promise<void> {
    await api.patch(`/api/v1/user/organization/users/${uuid}`, args);
  }

  public static async deleteOrgUser(uuid: string): Promise<void> {
    await api.delete(`/api/v1/user/organization/users/${uuid}`);
  }

  public static async toggleOrgUserStatus(
    uuid: string,
    isActive: boolean,
  ): Promise<void> {
    await api.patch(`/api/v1/user/organization/users/${uuid}/status`, {
      isActive,
    });
  }

  public static async getOrgUsers(loggedInEmail: string): Promise<OrgUser[]> {
    const response = await api.get<{
      data: {
        users: Array<{
          uuid: string;
          fullName: string;
          email: string;
          isActive: boolean;
          roles: Array<{
            role: string;
            product?: string;
            organizationId: string;
            isActive: boolean;
            assignedAt: string;
          }>;
        }>;
      };
    }>("/api/v1/user/organization/users?limit=100&page=1");

    return response.data.data.users
      .filter((u) => u.email !== loggedInEmail)
      .map((u) => ({
        uuid: u.uuid,
        fullName: u.fullName,
        email: u.email,
        isActive: u.isActive,
        roles: u.roles.map((r) => ({ product: r.product, role: r.role })),
      }));
  }
}
