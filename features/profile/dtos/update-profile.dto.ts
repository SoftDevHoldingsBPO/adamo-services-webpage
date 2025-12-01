export type UpdateProfileRequest = Partial<{
  name: string;
  surname: string;
  language: string;
  photo: File;
}>;
