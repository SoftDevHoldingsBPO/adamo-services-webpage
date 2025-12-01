"use client";

import { getFirstAxiosErrorMessage } from "@/api/get-axios-error-message";
import { ProfilePictureUpload } from "@/features/profile/components/profile-picture-upload";
import { UpdateProfileRequest } from "@/features/profile/dtos/update-profile.dto";
import { ProfileService } from "@/features/profile/services/profile.service";
import { ToastManager } from "@adamosuiteservices/ui/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
              message: "Photo must be less than 50MB",
            });
          }

          if (!["image/png", "image/jpeg", "image/jpg"].includes(value.type)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Photo must be a PNG or JPEG image",
            });
          }
        }
      }),
    name: z.string().min(1, "El nombre requerido"),
    lastName: z.string().min(1, "El apellido requerido"),
    email: z.string().email("Correo electrónico inválido"),
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
  const t = useTranslations();

  const FormSchema = PersonalInformationFormSchema(t);

  const queryClient = useQueryClient();

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
      mutationFn: ProfileService.update,
      onSuccess: (_, { name, surname, photo }) => {
        ToastManager.show({
          variant: "success",
          message: "Profile updated successfully",
        });

        form.reset({
          name,
          lastName: surname,
          email: form.getValues("email"),
          profilePhoto: photo ?? null,
        });

        queryClient.invalidateQueries({
          queryKey: [ProfileService.GET_PROFILE_QUERY_KEY],
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

    if (values.profilePhoto instanceof File) {
      newProfileInfo.photo = values.profilePhoto;
    }

    await updateProfile(newProfileInfo);
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
            Actualizar información personal
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
                      <FormLabel>Nombre/s</FormLabel>
                      <Input {...field} />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Apellido/s</FormLabel>
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
                      <FormLabel className="invisible">
                        Correo electrónico
                      </FormLabel>
                      <Input {...field} type="email" disabled />
                    </FormItem>
                  )}
                />
                <p className="text-sm text-neutral-700 flex-1">
                  Si necesitas cambiar tu correo electrónico, ponte en contacto
                  con el{" "}
                  <Link href="/contact" className="underline">
                    Servicio de Atención al Cliente
                  </Link>
                </p>
              </div>
            </div>
          </fieldset>
          {form.formState.isDirty && (
            <div className="flex gap-6 mt-10">
              <Button type="button" variant="muted" onClick={handleReset}>
                Cancelar
              </Button>
              <Button
                type="submit"
                form="personal-information-form"
                loading={isUpdateProfilePending}
              >
                Guardar cambios
              </Button>
            </div>
          )}
        </form>
      </Form>
    </article>
  );
}
