import { api } from "@/api/api";
import { User } from "@/features/auth/entities/user.entity";
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

  public static async get(): Promise<User> {
    const response = await api.get<GetProfileResponse>("/api/v1/user/profile");

    const { data } = response.data;

    return {
      name: data.name,
      lastName: data.surname,
      email: data.email,
      avatar: data.photo || undefined,
      isTwoFactorEnabled: data.twoFactorAuthEnabled,
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
}
