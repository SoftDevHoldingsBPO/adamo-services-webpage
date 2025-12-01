import { api } from "@/api/api";
import { User } from "@/features/auth/entities/user.entity";
import { GetProfileResponse } from "@/features/profile/dtos/get-profile.dto";
import { UpdateProfileRequest } from "@/features/profile/dtos/update-profile.dto";

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
      avatar: data.photo,
    };
  }

  public static async update(args: UpdateProfileRequest): Promise<void> {
    const body = new FormData();

    const keys: (keyof UpdateProfileRequest)[] = ["name", "surname", "photo"];

    for (const key of keys) {
      const value = args[key];

      if (value) {
        body.append(key, value);
      }
    }

    await api.put<void>("/api/v1/user/profile", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}
