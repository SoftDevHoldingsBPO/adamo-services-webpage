"use client";

import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { useAuth } from "@/features/auth/contexts/auth.context";
import { ProfilePictureUpload } from "@/features/profile/components/profile-picture-upload";
import { UpdateProfilePhotoRequest } from "@/features/profile/dtos/update-profile-photo.dto";
import {
  Profile,
  UpdateProfileRequest,
} from "@/features/profile/dtos/update-profile.dto";
import { ProfileService } from "@/features/profile/services/profile.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import z from "zod";

import { ComponentProps } from "react";
import { useForm } from "react-hook-form";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useValidateFileWithRHFAndZod } from "@/hooks/use-validate-file-with-rhf-and-zod";

const PersonalInformationFormSchema = (
  t: ReturnType<typeof useTranslations>,
) => {
  return z.object({
    profilePhoto: z
      .union([z.string(), z.instanceof(File)])
      .nullable()
      .superRefine((value, ctx) => {
        if (value instanceof File) {
          if (value.size > 50 * 1024 * 1024) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("photoTooLarge"),
            });
          }

          if (!["image/png", "image/jpeg", "image/jpg"].includes(value.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: t("photoInvalidFormat"),
            });
          }
        }
      }),
    name: z.string().min(1, t("nameRequired")),
    lastName: z.string().min(1, t("lastNameRequired")),
    email: z.string().email(t("emailInvalid")),
  });
};

type PersonalInformationFormValues = z.infer<
  ReturnType<typeof PersonalInformationFormSchema>
>;

export type PersonalInformationFormProps = ComponentProps<"article"> &
  Readonly<{
    initialValues?: Partial<PersonalInformationFormValues>;
  }>;

export function PersonalInformationForm({
  initialValues,
  className,
  ...props
}: PersonalInformationFormProps) {
  const { setUser } = useAuth();

  const t = useTranslations("profile-form");

  const FormSchema = PersonalInformationFormSchema(t);

  const form = useForm<PersonalInformationFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      profilePhoto: initialValues?.profilePhoto ?? null,
      name: initialValues?.name ?? "",
      lastName: initialValues?.lastName ?? "",
      email: initialValues?.email ?? "",
    },
  });

  const { mutateAsync: updateProfile, isPending: isUpdateProfilePending } =
    useMutation({
      mutationKey: [ProfileService.UPDATE_PROFILE_MUTATION_KEY],
      mutationFn: async ({
        name,
        surname,
        photo,
        deletePhoto,
      }: UpdateProfileRequest &
        Partial<UpdateProfilePhotoRequest> & { deletePhoto?: boolean }) => {
        let latestProfile: Profile;

        const updateResponse = await ProfileService.update({
          name,
          surname,
        });

        latestProfile = updateResponse.data.profile;

        if (photo) {
          const photoResponse = await ProfileService.updatePhoto({ photo });
          latestProfile = photoResponse.data.profile;
        }

        if (deletePhoto) {
          await ProfileService.deletePhoto();
          latestProfile = { ...latestProfile, photo: "" };
        }

        return latestProfile;
      },
      onSuccess: (latestProfile, { name, surname, photo }) => {
        ToastManager.show({
          variant: "success",
          message: t("successMessage"),
        });

        // Update user state with latest profile data
        setUser({
          name: latestProfile.name,
          lastName: latestProfile.surname,
          email: latestProfile.email,
          avatar: latestProfile.photo || undefined,
        });

        form.reset({
          name,
          lastName: surname,
          email: form.getValues("email"),
          profilePhoto: latestProfile.photo || null,
        });
      },
      onError: (error) => {
        ToastManager.show({
          variant: "destructive",
          message: getFirstAxiosErrorMessage(error),
        });
      },
    });

  const { validate: validateFile } = useValidateFileWithRHFAndZod({
    schema: FormSchema,
    form: form,
    field: "profilePhoto",
  });

  const handleOnFileChange = (file: File | null) => {
    validateFile(file);
  };

  const handleReset = () => {
    form.reset();
  };

  const handleSubmit = async (values: PersonalInformationFormValues) => {
    const newProfileInfo: UpdateProfileRequest = {
      name: values.name,
      surname: values.lastName,
    };

    const newProfilePhoto =
      values.profilePhoto instanceof File ? values.profilePhoto : undefined;

    /**
     * Determine if the photo should be deleted
     * - if there was an initial photo and now there isn't one
     */
    const deletePhoto = !!initialValues?.profilePhoto && !values.profilePhoto;

    await updateProfile({
      name: newProfileInfo.name,
      surname: newProfileInfo.surname,
      photo: newProfilePhoto,
      deletePhoto,
    });
  };

  return (
    <article
      data-inview
      className={cn(
        "relative mt-[92px] mx-4 xl:-mt-56 max-w-5xl xl:mx-auto rounded-3xl bg-background p-6 pb-12 md:p-10 drop-shadow-parallax",
        className,
      )}
      {...props}
    >
      <Form {...form}>
        <form
          id="personal-information-form"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <h2 className="font-semibold text-base text-neutral-900 mb-10">
            {t("title")}
          </h2>
          <fieldset
            disabled={isUpdateProfilePending}
            className="flex flex-col lg:flex-row gap-16"
          >
            <FormField
              control={form.control}
              name="profilePhoto"
              render={({ field }) => (
                <FormItem>
                  <ProfilePictureUpload
                    file={field.value}
                    onFileChange={handleOnFileChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <div className="flex flex-col gap-4 lg:flex-row lg:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("firstName")}</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>{t("lastName")}</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="invisible">{t("email")}</FormLabel>
                      <Input {...field} type="email" disabled />
                    </FormItem>
                  )}
                />
                <p className="text-sm text-neutral-700 flex-1">
                  {t.rich("emailHelp", {
                    link: (chunks) => (
                      <Link href="/contact" className="underline">
                        {chunks}
                      </Link>
                    ),
                  })}
                </p>
              </div>
            </div>
          </fieldset>
          {form.formState.isDirty && (
            <div className="flex gap-6 mt-10">
              <Button type="button" variant="muted" onClick={handleReset}>
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                form="personal-information-form"
                loading={isUpdateProfilePending}
              >
                {t("save")}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </article>
  );
}
